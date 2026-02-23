  import React from "react";
  import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
  } from "@mui/material";

  export default function DataTable({
    data = [],
    columns = [],
    actionColumn // optional action column
  }) {
    return (
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col}>{col.toUpperCase()}</TableCell>
              ))}
              {actionColumn && <TableCell>{actionColumn.label}</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actionColumn ? 1 : 0)} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col}>{row[col]}</TableCell>
                  ))}
                  {actionColumn && (
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => actionColumn.onClick(row.username)}
                      >
                        {actionColumn.label}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }