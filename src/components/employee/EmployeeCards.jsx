import { Button, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";
import { getCountryName } from "../../utils/country";

export default function EmployeeCards({ employees, onEdit, onDelete }) {
  return (
    <Stack spacing={1.5}>
      {employees.map((employee) => (
        <Card key={employee.id} variant="outlined">
          <CardContent>
            <Typography variant="h6" fontWeight={750}>{employee.name || "Unnamed Employee"}</Typography>
            <Typography variant="caption" color="text.secondary">ID: {employee.id}</Typography>
            <Divider sx={{ my: 1.5 }} />
            <Stack spacing={0.5}>
              <Typography variant="body2"><strong>Email:</strong> {employee.email || "—"}</Typography>
              <Typography variant="body2"><strong>Mobile:</strong> {employee.mobile || employee.phone || "—"}</Typography>
              <Typography variant="body2"><strong>Country:</strong> {getCountryName(employee.country)}</Typography>
            </Stack>
          </CardContent>
          <CardActions sx={{ px: 2, pb: 2 }}>
            <Button size="small" variant="outlined" onClick={() => onEdit(employee)}>Edit</Button>
            <Button size="small" color="error" onClick={() => onDelete(employee)}>Delete</Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
}