import { Box, Typography } from "@mui/material";

export default function EmptyState({ title = "No employees found", message = "There are no records to display." }) {
  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h6" fontWeight={700}>{title}</Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5 }}>{message}</Typography>
    </Box>
  );
}