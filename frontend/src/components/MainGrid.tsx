import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import ComplianceChart from "./dashboard/ComplianceChart";
import ComplianceBarChart from "./dashboard/ComplianceBarChart";

export default function MainGrid() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <ComplianceChart />
        <ComplianceBarChart />
      </Grid>
    </Box>
  );
}
