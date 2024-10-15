import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  ComplianceMetrics,
  MetricsHistory,
  useComplianceMetrics,
} from "../../hooks/useComplianceMetrics";
import { Box, CircularProgress } from "@mui/material";
import { LineSeriesType } from "@mui/x-charts";
import { useDateRange } from "../../context/DateRangeContext";

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export function toDate(data?: ComplianceMetrics) {
  return data?.metricsHistory?.map((entry) => formatDate(entry.date));
}

function toSeries(data?: ComplianceMetrics): LineSeriesType[] {
  const keys: (keyof MetricsHistory)[] = ["score", "control", "pending"];

  const cumulativeData = keys.map((key) => ({
    key: key,
    data: data?.metricsHistory?.map((entry) => entry[key]),
  }));

  return cumulativeData.map((metric) => ({
    id: metric.key,
    label: metric.key.charAt(0).toUpperCase() + metric.key.slice(1),
    type: "line",
    showMark: false,
    curve: "linear",
    stack: "total",
    area: true,
    stackOrder: "ascending",
    data: metric.data as number[],
  }));
}

export default function ComplianceChart() {
  const theme = useTheme();
  const { startDate, endDate } = useDateRange();

  const {
    data: metrics,
    isLoading,
    isError,
  } = useComplianceMetrics(startDate, endDate);

  const data = metrics && toDate(metrics);

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
          Compliance Metrics Chart
        </Typography>
        <Stack
          direction="row"
          sx={{
            alignContent: { xs: "center", sm: "flex-start" },
            alignItems: "center",
            gap: 5,
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6" component="p">
              Compliance Score
            </Typography>
            <Chip
              size="small"
              color="primary"
              label={metrics.complianceScore}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6" component="p">
              Controls Implemented
            </Typography>
            <Chip
              size="small"
              color="success"
              label={metrics.controlsImplemented}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6" component="p">
              Pending Tasks
            </Typography>
            <Chip size="small" color="secondary" label={metrics.pendingTasks} />
          </Stack>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "point",
              data,
              tickInterval: "auto",
            },
          ]}
          series={toSeries(metrics)}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-organic": {
              fill: "url('#organic')",
            },
            "& .MuiAreaElement-series-referral": {
              fill: "url('#referral')",
            },
            "& .MuiAreaElement-series-direct": {
              fill: "url('#direct')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="organic" />
          <AreaGradient color={theme.palette.primary.main} id="referral" />
          <AreaGradient color={theme.palette.primary.light} id="direct" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
