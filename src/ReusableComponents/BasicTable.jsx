import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BasicTable = ({ header, body, actions }) => {
  const headerStyles = {
    color: "#000000",
    fontWeight: 600,
    fontSize: "14px",
  };
  const bodyStyles = {
    color: "#494949",
    fontSize: "12px",
    fontWeight: 300,
  };
  const empty_space = "  ";

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
                  style={{
                    minWidth: column.minWidth,
                    ...headerStyles,
                  }}
                >
                  {column.label}
                </TableCell>
              </>
            ))}
            {actions && actions.length > 0 && (
              <>
                {console.log(actions, "action")}
                <TableCell
                  align="left"
                  style={{
                    // minWidth: action.minWidth,
                    ...headerStyles,
                  }}
                >
                  {/* {empty_space} */}
                  "Actions"
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((row) => (
            <>
              {console.log(row, "row")}
              <TableRow key={row}>
                {header.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    sx={{ ...bodyStyles }}
                  >
                    {row[column.key] ? row[column.key] : "-"}
                    {/* {console.log(row[column.key], "row[column.id]")} */}
                  </TableCell>
                ))}
              </TableRow>
            </>
          ))}
          {actions &&
            actions.length > 0 &&
            actions.map((action) => (
              <>
                {console.log(action, "action")}
                <TableCell
                  key={action.key}
                  align="left"
                  style={{
                    minWidth: action.minWidth,
                    ...headerStyles,
                  }}
                >
                  {action.label}
                </TableCell>
              </>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
