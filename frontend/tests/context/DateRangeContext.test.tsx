import { render, fireEvent, screen } from '@testing-library/react';
import { DateRangeProvider, useDateRange } from '../../src/context/DateRangeContext';

const TestComponent = () => {
  const { startDate, setStartDate } = useDateRange();
  return (
    <>
      <span data-testid="startDate">{startDate}</span>
      <button onClick={() => setStartDate('2023-01-01')}>Set Start Date</button>
    </>
  );
};

describe('DateRangeContext', () => {
  test('provides startDate and setStartDate', () => {
    render(
      <DateRangeProvider>
        <TestComponent />
      </DateRangeProvider>
    );
    expect(screen.getByTestId('startDate').textContent).toBe('');
    fireEvent.click(screen.getByText('Set Start Date'));
    expect(screen.getByTestId('startDate').textContent).toBe('2023-01-01');
  });
});