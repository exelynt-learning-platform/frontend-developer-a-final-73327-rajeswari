import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EmptyState from "../common/EmptyState";
import { getCountryName } from "../../utils/country";

export default function EmployeeTable({ employees, onEdit, onDelete, deletingId }) {
  if (!employees.length) {
    return <EmptyState title="No employees available" message="Add your first employee to get started." />;
  }

  return (
    <TableContainer component={Paper} className="table-container" elevation={0}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f7f7fb" }}>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Country</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} hover>
              <TableCell>
                <Typography variant="body2" fontWeight={700}>{employee.id}</Typography>
              </TableCell>
              <TableCell>{employee.name || "—"}</TableCell>
              <TableCell>{employee.email || "—"}</TableCell>
              <TableCell>{employee.mobile || employee.phone || "—"}</TableCell>
              <TableCell>{getCountryName(employee.country)}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit employee">
                  <IconButton aria-label={`Edit ${employee.name || employee.id}`} onClick={() => onEdit(employee)}>
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete employee">
                  <span>
                    <IconButton
                      aria-label={`Delete ${employee.name || employee.id}`}
                      color="error"
                      onClick={() => onDelete(employee)}
                      disabled={deletingId === employee.id}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}