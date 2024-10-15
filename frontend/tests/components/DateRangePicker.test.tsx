import { render, screen, waitFor } from '@testing-library/react';
import { DateRangeContextType, useDateRange } from '../../src/context/DateRangeContext';
import DateRangePicker from '../../src/components/dashboard/DateRangePicker';
import userEvent from '@testing-library/user-event';

jest.mock('../../src/context/DateRangeContext');

const mockedUseDateRange = useDateRange as jest.MockedFunction<typeof useDateRange>;

describe('DateRangePicker Component', () => {
  let mockDateRange: DateRangeContextType;

  beforeEach(() => {
    mockDateRange = {
      startDate: '2023-01-01',
      endDate: '2023-12-31',
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

  it('renders start and end date pickers', () => {
    render(<DateRangePicker />);

    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
  });

  it('calls setStartDate and handleSubmit when start date is changed', async () => {
    render(<DateRangePicker />);

    const startDateInput = screen.getByLabelText('Start Date') as HTMLInputElement;

    await userEvent.type(startDateInput, '01/15/2023');
    await waitFor(() => {
      expect(mockDateRange.setStartDate).toHaveBeenCalledWith('2023-01-15');
      expect(mockDateRange.handleSubmit).toHaveBeenCalled();
    });
  });

  it('calls setEndDate and handleSubmit when end date is changed', async () => {
    render(<DateRangePicker />);

    const endDateInput = screen.getByLabelText('End Date') as HTMLInputElement;
    await userEvent.type(endDateInput, '12/15/2023');

    // Wait for asynchronous updates
    await waitFor(() => {
      expect(mockDateRange.setEndDate).toHaveBeenCalledWith('2023-12-15');
      expect(mockDateRange.handleSubmit).toHaveBeenCalled();
    });
  });
});
