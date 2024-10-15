import { useQuery } from 'react-query';
import axios from 'axios';
import { metricApiBaseUrl } from '../config';

export interface ComplianceMetrics {
    complianceScore: number;
    controlsImplemented: number;
    pendingTasks: number;
    metricsHistory: MetricsHistory[];
}
export interface MetricsHistory {
    date: string;
    score: number;
    control: number;
    pending: number;
}

const fetchComplianceMetrics = async (startDate?: string, endDate?: string): Promise<ComplianceMetrics> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const response = await axios.get(`${metricApiBaseUrl}/api/v1/compliance-metrics`, { params });
    return response.data;
};

export const useComplianceMetrics = (startDate?: string, endDate?: string) => {
    return useQuery<ComplianceMetrics>(['complianceMetrics', startDate, endDate], () => fetchComplianceMetrics(startDate, endDate));
};
