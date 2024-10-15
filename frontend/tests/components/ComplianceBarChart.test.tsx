// src/components/tests/ComplianceBarChart.test.tsx

import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useComplianceMetrics } from '../../src/hooks/useComplianceMetrics';
import { useDateRange } from '../../src/context/DateRangeContext';
import ComplianceBarChart from '../../src/components/dashboard/ComplianceBarChart';

// Mock the hooks
jest.mock('../../src/hooks/useComplianceMetrics');
jest.mock('../../src/context/DateRangeContext');

// Helper function to wrap components with QueryClientProvider
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('ComplianceBarChart Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('renders loading state', () => {
    // Mock useComplianceMetrics to return loading state
    (useComplianceMetrics as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    // Mock useDateRange to return default values
    (useDateRange as jest.Mock).mockReturnValue({ startDate: '', endDate: '' });

    renderWithClient(<ComplianceBarChart />);

    // Assert that CircularProgress is rendered during loading
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders error state when data fetching fails', () => {
    // Mock useComplianceMetrics to return an error
    (useComplianceMetrics as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    (useDateRange as jest.Mock).mockReturnValue({ startDate: '', endDate: '' });

    renderWithClient(<ComplianceBarChart />);

    // Assert that error message is displayed
    expect(screen.getByText(/error loading data/i)).toBeInTheDocument();
  });

  test('renders the bar chart with compliance metrics data', () => {
    // Mock useComplianceMetrics to return successful data
    const mockData = {
      complianceScore: 90,
      controlsImplemented: 85,
      pendingTasks: 10,
      metricsHistory: [
        { date: '2024-10-01', score: 90, control: 85, pending: 10 },
      ],
    };

    (useComplianceMetrics as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
    });

    (useDateRange as jest.Mock).mockReturnValue({ startDate: '', endDate: '' });

    renderWithClient(<ComplianceBarChart />);

    // Assert that the chart and compliance metrics are rendered
    expect(screen.getByText(/Compliance Metrics Bar Chart/i)).toBeInTheDocument();
  });
});
