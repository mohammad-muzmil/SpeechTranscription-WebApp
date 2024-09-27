import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Icon } from "@iconify/react";
const BasicTable = ({ header, body, actions, metaData }) => {
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
            {metaData.requiredSerialNumber && (
              <TableCell align="left" style={headerStyles}>
                S.No
              </TableCell>
            )}
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
          {body.map((row, index) => (
            <TableRow key={row[header[0].key]}>
              {metaData.requiredSerialNumber && (
                <TableCell align="left" style={bodyStyles}>

                  {metaData?.paginatedSerialNumber && metaData?.paginationMetaData ?

                    (metaData.paginationMetaData.page - 1) * metaData.paginationMetaData.count + (index + 1)

                    : index + 1}

                </TableCell>
              )}
              {" "}
              {/* Use a unique identifier */}
              {header.map((column) => (
                <TableCell key={column.key} align="left" sx={bodyStyles}>
                  {row[column.key] ? row[column.key] : "-"}
                </TableCell>
              ))}
              {actions && actions.length > 0 && (
                <TableCell align="left">
                  {actions.map((action) => (
                    <Icon
                      icon={action?.icon}
                      width="24"
                      height="24"
                      color={action.color}
                    />
                  ))}
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
