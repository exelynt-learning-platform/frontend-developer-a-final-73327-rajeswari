import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import AppHeader from "../components/layout/AppHeader";
import SearchEmployee from "../components/employee/SearchEmployee";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeCards from "../components/employee/EmployeeCards";
import EmployeeForm from "../components/employee/EmployeeForm";
import ConfirmDialog from "../components/common/ConfirmDialog";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import {
  clearOperationError,
  clearSearch,
  createEmployee,
  deleteEmployee,
  fetchEmployeeById,
  fetchEmployees,
  updateEmployee
} from "../features/employees/employeesSlice";
import { fetchCountries } from "../features/countries/countriesSlice";

export default function EmployeeManagementPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const employeesState = useSelector((state) => state.employees);
  const countriesState = useSelector((state) => state.countries);

  const [searchId, setSearchId] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snackbar, setSnackbar] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchCountries());
  }, [dispatch]);

  const sortedEmployees = useMemo(
    () => [...employeesState.items].sort((a, b) => String(a.id).localeCompare(String(b.id), undefined, { numeric: true })),
    [employeesState.items]
  );

  const openAdd = () => {
    dispatch(clearOperationError());
    setEditingEmployee(null);
    setFormOpen(true);
  };

  const openEdit = (employee) => {
    dispatch(clearOperationError());
    setEditingEmployee(employee);
    setFormOpen(true);
  };

  const closeForm = () => {
    if (!employeesState.saving) setFormOpen(false);
  };

  const handleSave = async (values) => {
    try {
      if (editingEmployee) {
        await dispatch(updateEmployee({ id: editingEmployee.id, employee: values })).unwrap();
        setSnackbar("Employee updated successfully.");
      } else {
        await dispatch(createEmployee(values)).unwrap();
        setSnackbar("Employee added successfully.");
      }
      setFormOpen(false);
    } catch {
      // Error is already stored in Redux and shown by the form.
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dispatch(deleteEmployee(deleteTarget.id)).unwrap();
      setSnackbar("Employee deleted successfully.");
      setDeleteTarget(null);
    } catch {
      // Error is already stored in Redux.
    }
  };

  const handleSearch = () => {
    if (searchId.trim()) dispatch(fetchEmployeeById(searchId.trim()));
  };

  const handleClearSearch = () => {
    setSearchId("");
    dispatch(clearSearch());
  };

  return (
    <Box className="page-shell">
      <AppHeader />
      <Container className="page-content" maxWidth={false}>
        <Card className="hero-card" elevation={0} sx={{ mb: 2.5 }}>
          <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={2}
            >
              <Box>
                <Typography variant="h4">Employee Management</Typography>
                <Typography sx={{ mt: 1, opacity: 0.85 }}>
                  Manage employee records with a fast, responsive interface.
                </Typography>
              </Box>
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={openAdd}>
                Add Employee
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={2} sx={{ mb: 2.5 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className="stat-card">
              <CardContent>
                <Typography variant="body2" color="text.secondary">Total Employees</Typography>
                <Typography variant="h5" sx={{ mt: 0.5 }}>{employeesState.items.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className="stat-card">
              <CardContent>
                <Typography variant="body2" color="text.secondary">Countries Loaded</Typography>
                <Typography variant="h5" sx={{ mt: 0.5 }}>{countriesState.items.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card className="stat-card">
              <CardContent>
                <Typography variant="body2" color="text.secondary">API Status</Typography>
                <Chip
                  label={employeesState.error || countriesState.error ? "Needs attention" : "Connected"}
                  color={employeesState.error || countriesState.error ? "warning" : "success"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mb: 2.5 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1.5 }}>Find an Employee</Typography>
            <SearchEmployee
              value={searchId}
              onChange={setSearchId}
              onSearch={handleSearch}
              onClear={handleClearSearch}
              loading={employeesState.searchLoading}
              result={employeesState.searchResult}
              error={employeesState.searchError}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} spacing={1.5} sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h6">Employees</Typography>
                <Typography variant="body2" color="text.secondary">
                  {employeesState.items.length} record{employeesState.items.length === 1 ? "" : "s"} available
                </Typography>
              </Box>
              <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => dispatch(fetchEmployees())} disabled={employeesState.loading}>
                Refresh
              </Button>
            </Stack>

            {employeesState.operationError && !formOpen && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearOperationError())}>
                {employeesState.operationError}
              </Alert>
            )}

            {employeesState.loading ? (
              <LoadingState label="Loading employees..." />
            ) : employeesState.error ? (
              <ErrorState message={employeesState.error} onRetry={() => dispatch(fetchEmployees())} />
            ) : sortedEmployees.length === 0 ? (
              <Box sx={{ py: 2 }}><Typography color="text.secondary">No employee records are available.</Typography></Box>
            ) : isMobile ? (
              <EmployeeCards employees={sortedEmployees} onEdit={openEdit} onDelete={setDeleteTarget} />
            ) : (
              <EmployeeTable employees={sortedEmployees} onEdit={openEdit} onDelete={setDeleteTarget} deletingId={employeesState.deletingId} />
            )}
          </CardContent>
        </Card>
      </Container>

      <EmployeeForm
        open={formOpen}
        employee={editingEmployee}
        countries={countriesState.items}
        saving={employeesState.saving}
        operationError={employeesState.operationError}
        onClose={closeForm}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete employee?"
        message={deleteTarget ? `Are you sure you want to delete ${deleteTarget.name || "this employee"}? This action cannot be undone.` : ""}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={!!employeesState.deletingId}
      />

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar("")}
        message={snackbar}
      />
    </Box>
  );
}