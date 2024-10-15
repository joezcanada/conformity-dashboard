import { render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import { useComplianceMetrics } from '../../src/hooks/useComplianceMetrics';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useComplianceMetrics', () => {
    const createQueryClient = () => new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // Disable retries to make testing easier
            },
        },
    });

    const renderHook = (hook: Function) => {
        const result: any = {};

        const TestComponent = () => {
            Object.assign(result, hook());
            return null;
        };

        render(
            <QueryClientProvider client={createQueryClient()}>
                <TestComponent />
            </QueryClientProvider>
        );

        return result;
    };

    it('should fetch compliance metrics successfully', async () => {
        const mockData = {
            complianceScore: 85,
            controlsImplemented: 10,
            pendingTasks: 2,
            metricsHistory: [
                { date: '2024-01-01', score: 80, control: 8, pending: 3 },
            ],
        };

        // Mock the axios GET request to return the mock data
        mockedAxios.get.mockResolvedValueOnce({ data: mockData });

        const result = renderHook(() => useComplianceMetrics('2024-01-01', '2024-12-31'));

        // Wait for the query to be successful
        await waitFor(() => expect(result.isSuccess).toBe(true));

        // Test if the data matches the mock data
        expect(result.data).toEqual(mockData);
        expect(result.isLoading).toBe(false);
    });

    it('should handle errors', async () => {
        const errorMessage = 'Network Error';

        // Mock axios to throw an error
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

        const result = renderHook(() => useComplianceMetrics('2024-01-01', '2024-12-31'));

        // Wait for the query to error out
        await waitFor(() => expect(result.isError).toBe(true));

        // Test if the error is handled
        expect(result.error).toEqual(new Error(errorMessage));
    });
});
