import { CssBaseline } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DashboardTheme from "./theme/DashboardTheme";
import AppNavbar from "./components/layout/AppNavbar";
import SideMenu from "./components/layout/SideMenu";
import MainGrid from "./components/MainGrid";
import Header from "./components/layout/Header";
import { DateRangeProvider } from "./context/DateRangeContext";
import type {} from '@mui/material/themeCssVarsAugmentation';

const xThemeComponents = {};

const App: React.FC = (props: { disableCustomTheme?: boolean }) => {
  return (
    <DateRangeProvider>
      <DashboardTheme {...props} themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: "flex" }}>
          <SideMenu />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars  
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`  
                : alpha(theme.palette.background.default, 1),
              overflow: "auto",
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: "center",
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header />
              <MainGrid />
            </Stack>
          </Box>
        </Box>
      </DashboardTheme>
    </DateRangeProvider>
  );
};

export default App;
