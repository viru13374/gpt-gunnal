import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export default function AttendancePage() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ravi", present: false },
    { id: 2, name: "Arjun", present: false },
    { id: 3, name: "Kiran", present: false }
  ]);

  const toggleAttendance = (id) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, present: !s.present } : s
      )
    );
  };

  return (
    <>
      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>
                {student.present ? "Present" : "Absent"}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color={student.present ? "success" : "warning"}
                  onClick={() => toggleAttendance(student.id)}
                >
                  Toggle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}