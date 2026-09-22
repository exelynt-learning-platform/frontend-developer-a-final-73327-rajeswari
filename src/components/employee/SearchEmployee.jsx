import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchEmployee({
  value,
  onChange,
  onSearch,
  onClear,
  loading,
  result,
  error
}) {
  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <TextField
          label="Search by Employee ID"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && onSearch()}
          placeholder="e.g. 12"
          fullWidth
          inputProps={{ "aria-label": "Search by employee ID" }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={onSearch}
          disabled={loading || !value.trim()}
          sx={{ minWidth: { sm: 130 } }}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
        <Button variant="outlined" onClick={onClear} disabled={loading}>
          Clear
        </Button>
      </Stack>

      {error && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          No employee found for ID <strong>{value}</strong>. Please check the ID and try again.
        </Alert>
      )}

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Found: <strong>{result.name || "Employee"}</strong> — {result.email || "No email"}
        </Alert>
      )}
    </Box>
  );
}