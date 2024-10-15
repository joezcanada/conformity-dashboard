import { render, screen, waitFor } from '@testing-library/react';
import { useComplianceMetrics } from '../../src/hooks/useComplianceMetrics';
import { useDateRange, DateRangeContextType } from '../../src/context/DateRangeContext';
import { QueryClient, QueryClientProvider } from 'react-query';
// import '@testing-library/jest-dom/extend-expect';
import ComplianceChart from '../../src/components/dashboard/ComplianceChart';

jest.mock('../../src/hooks/useComplianceMetrics');
jest.mock('../../src/context/DateRangeContext');

const mockedUseComplianceMetrics = useComplianceMetrics as jest.MockedFunction<typeof useComplianceMetrics>;
const mockedUseDateRange = useDateRange as jest.MockedFunction<typeof useDateRange>;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('ComplianceChart Component', () => {
  const renderComponent = () => {
    const queryClient = createTestQueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <ComplianceChart />
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    const mockDateRange: DateRangeContextType = {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
      datesSubmitted: {}, 
      handleSubmit: jest.fn(),
    };

    mockedUseDateRange.mockReturnValue(mockDateRange);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading state initially', () => {
    mockedUseComplianceMetrics.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    renderComponent();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should display error message when there is an error', async () => {
    mockedUseComplianceMetrics.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Network Error'),
    } as any);

    renderComponent();

    expect(await screen.findByText(/Error loading data/i)).toBeInTheDocument();
  });

  it('should render data correctly when data is available', async () => {
    const mockData = {
      complianceScore: 85,
      controlsImplemented: 10,
      pendingTasks: 2,
      metricsHistory: [
        { date: '2024-01-01', score: 80, control: 8, pending: 3 },
        { date: '2024-02-01', score: 85, control: 9, pending: 2 },
      ],
    };

    mockedUseComplianceMetrics.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    renderComponent();

    // Wait for the component to finish rendering
    await waitFor(() =>
      expect(screen.getByText(/Compliance Metrics Chart/i)).toBeInTheDocument()
    );

    // Check if key metrics are displayed
    expect(screen.getByText(/Compliance Score/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.complianceScore.toString())).toBeInTheDocument();

    expect(screen.getByText(/Controls Implemented/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.controlsImplemented.toString())).toBeInTheDocument();

    expect(screen.getByText(/Pending Tasks/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.pendingTasks.toString())).toBeInTheDocument();
  });
});
