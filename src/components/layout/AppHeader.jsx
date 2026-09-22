import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

export default function AppHeader() {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ width: "min(1400px, calc(100% - 32px))", mx: "auto", px: "0 !important" }}>
        <PeopleAltOutlinedIcon sx={{ mr: 1.2 }} />
        <Box>
          <Typography fontWeight={800} lineHeight={1.1}>EmployeeHub</Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>Employee Management</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}