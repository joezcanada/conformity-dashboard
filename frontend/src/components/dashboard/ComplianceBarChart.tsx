import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { useDateRange } from "../../context/DateRangeContext";
import {
  ComplianceMetrics,
  MetricsHistory,
  useComplianceMetrics,
} from "../../hooks/useComplianceMetrics";
import { Box, CircularProgress } from "@mui/material";
import { toDate } from "./ComplianceChart";
import { AxisConfig, BarSeriesType, ChartsXAxisProps } from "@mui/x-charts";

function toSeries(data?: ComplianceMetrics): BarSeriesType[] {
  const keys: (keyof MetricsHistory)[] = ["score", "control", "pending"];

  const cumulativeData = keys.map((key) => ({
    key: key,
    data: data?.metricsHistory?.map((entry) => entry[key]),
  }));

  return cumulativeData.map((metric) => ({
    id: metric.key,
    type: 'bar',
    label: metric.key.charAt(0).toUpperCase() + metric.key.slice(1),
    stack: "A",
    data: metric.data as number[],
  }));
}

export default function ComplianceBarChart() {
  const theme = useTheme();
  const { startDate, endDate } = useDateRange();
  const {
    data: metrics,
    isLoading,
    isError,
  } = useComplianceMetrics(startDate, endDate);

  const dateRange = metrics && toDate(metrics);
  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !metrics) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h5">Error loading data...</Typography>
      </Box>
    );
  }
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Compliance Metrics Bar Chart
        </Typography>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "band",
              categoryGapRatio: 0.5,
              data: dateRange,
            } as AxisConfig<"band", number, ChartsXAxisProps>,
          ]}
          series={toSeries(metrics)}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
