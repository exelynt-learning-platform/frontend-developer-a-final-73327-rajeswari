import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField
} from "@mui/material";
import { validateEmployee } from "../../utils/validation";
import { getCountryId, getCountryName } from "../../utils/country";

const emptyForm = {
  name: "",
  email: "",
  mobile: "",
  country: "",
  state: "",
  district: ""
};

export default function EmployeeForm({
  open,
  employee,
  countries,
  saving,
  operationError,
  onClose,
  onSubmit
}) {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    if (employee) {
      setValues({
        name: employee.name ?? "",
        email: employee.email ?? "",
        mobile: employee.mobile ?? employee.phone ?? "",
        country:
          typeof employee.country === "object"
            ? getCountryId(employee.country)
            : employee.country ?? "",
        state: employee.state ?? "",
        district: employee.district ?? ""
      });
    } else {
      setValues(emptyForm);
    }
    setErrors({});
  }, [employee, open]);

  const handleChange = (field) => (event) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (errors[field]) {
      setErrors(validateEmployee(next));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateEmployee(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    await onSubmit(values);
  };

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogTitle>{employee ? "Edit Employee" : "Add Employee"}</DialogTitle>
        <DialogContent dividers>
          {operationError && <Alert severity="error" sx={{ mb: 2 }}>{operationError}</Alert>}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField label="Name" value={values.name} onChange={handleChange("name")} error={!!errors.name} helperText={errors.name} fullWidth required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Email" type="email" value={values.email} onChange={handleChange("email")} error={!!errors.email} helperText={errors.email} fullWidth required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Mobile" value={values.mobile} onChange={handleChange("mobile")} error={!!errors.mobile} helperText={errors.mobile || "7–15 characters"} fullWidth required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                label="Country"
                value={values.country}
                onChange={handleChange("country")}
                error={!!errors.country}
                helperText={errors.country}
                fullWidth
                required
              >
                {countries.map((country) => {
                  const id = getCountryId(country);
                  const name = getCountryName(country);
                  return <MenuItem key={String(id)} value={id}>{name}</MenuItem>;
                })}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="State" value={values.state} onChange={handleChange("state")} error={!!errors.state} helperText={errors.state} fullWidth required />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField label="District" value={values.district} onChange={handleChange("district")} error={!!errors.district} helperText={errors.district} fullWidth required />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} disabled={saving}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? <><CircularProgress size={18} sx={{ mr: 1 }} /> Saving...</> : employee ? "Update Employee" : "Add Employee"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export { emptyForm };