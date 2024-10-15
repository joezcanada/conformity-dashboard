
export const getRandomMetrics = (startDate: Date, endDate: Date) => {
    const generateRandomScore = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateMetricsHistory = (startDate: Date, endDate: Date) => {
        const history = [];
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            history.push({
                date: new Date(d).toISOString().split('T')[0],
                score: generateRandomScore(70, 100),
                control: generateRandomScore(50, 100),
                pending: generateRandomScore(0, 20),
            });
        }
        return history;
    };

    return {
        complianceScore: generateRandomScore(70, 100),
        controlsImplemented: generateRandomScore(50, 100),
        pendingTasks: generateRandomScore(10, 40),
        metricsHistory: generateMetricsHistory(startDate, endDate),
    };
}