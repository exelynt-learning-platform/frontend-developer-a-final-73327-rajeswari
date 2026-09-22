import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingState({ label = "Loading..." }) {
  return (
    <Box role="status" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, py: 5 }}>
      <CircularProgress size={24} />
      <Typography color="text.secondary">{label}</Typography>
    </Box>
  );
}