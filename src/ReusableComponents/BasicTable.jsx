import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BasicTable = ({ header, body }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((column) => (
              <>
                {console.log(column, "column")}
                <TableCell
                  key={column.key}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((row) => (
            <>
              {console.log(row, "row")}
              <TableRow key={row}>
                {header.map((column) => (
                  <TableCell key={column.id} align="left">
                    {row[column.key] ? row[column.key] : "-"}
                    {/* {console.log(row[column.key], "row[column.id]")} */}
                  </TableCell>
                ))}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
