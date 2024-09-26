import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Icon } from "@iconify/react";
import { Box } from "@mui/material";
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
            ))}
            {actions && actions.length > 0 && (
              <TableCell align="left" style={headerStyles}>
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((row) => (
            <TableRow key={row[header[0].key]}>
              {" "}
              {/* Use a unique identifier */}
              {header.map((column) => (
                <>
                  <TableCell key={column.key} align="left" sx={bodyStyles}>
                    {row[column.key] ? row[column.key] : "-"}
                  </TableCell>
                  {console.log(row[column.key], "row[column.key]")}
                </>
              ))}
              {actions && actions.length > 0 && (
                <TableCell align="left">
                  <Box display="flex" gap={1}>
                    {" "}
                    {/* You can adjust the gap value as needed */}
                    {actions.map((action) => (
                      <Icon
                        key={action.key} // Ensure each icon has a unique key
                        icon={action?.icon}
                        width="24"
                        height="24"
                        color={action.color}
                      />
                    ))}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
