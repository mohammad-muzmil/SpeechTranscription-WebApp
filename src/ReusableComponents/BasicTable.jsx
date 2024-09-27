import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Icon } from "@iconify/react";
import { Box, Tooltip } from "@mui/material";
<<<<<<< HEAD
=======

>>>>>>> b1e23b6e18fd9d4353286dc9b890169700ce06e4
const BasicTable = ({ header, body, actions, metaData }) => {
  const headerStyles = {
    color: "#000000",
    fontWeight: 600,
    fontSize: "14px",
  };
  const bodyStyles = {
    color: "#494949",
    fontSize: "14px",
    lineHeight: 'unset',
    padding: 1.5,
    fontWeight: 300,

  };
  const empty_space = "  ";

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ borderBottom: '1.5px solid #BCD4FF' }}>
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
            <TableRow key={row[header[0].key]} sx={{ borderBottom: '1.5px solid #BCD4FF' }}>
              {metaData.requiredSerialNumber && (
                <TableCell align="left" style={bodyStyles}>
                  {metaData?.paginatedSerialNumber &&
<<<<<<< HEAD
                  metaData?.paginationMetaData
                    ? (metaData.paginationMetaData.page - 1) *
                        metaData.paginationMetaData.count +
                      (index + 1)
=======
                    metaData?.paginationMetaData
                    ? (metaData.paginationMetaData.page - 1) *
                    metaData.paginationMetaData.count +
                    (index + 1)
>>>>>>> b1e23b6e18fd9d4353286dc9b890169700ce06e4
                    : index + 1}
                </TableCell>
              )}{" "}
              {/* Use a unique identifier */}
              {header.map((column) => (
                <>
<<<<<<< HEAD
                  <TableCell key={column.key} align="left" sx={bodyStyles}>
                    {row[column.key] ? row[column.key] : "-"}
                  </TableCell>
=======
                  <TableCell
                    key={column.key}
                    align="left"
                    sx={{
                      ...bodyStyles,
                      ...{ borderBottom: 0 },
                      // ...(column?.icon_key && row?.[column?.icon_key]?.icon_name && {

                      //   // justifyContent: 'start'
                      // })
                    }}
                  >
                    <div style={{

                      display: 'flex',
                      alignItems: 'end',
                      flexDirection: 'row'

                    }}>

                      {column?.icon_key && row?.[column?.icon_key]?.icon_name && (
                        <Icon
                          icon={row?.[column?.icon_key]?.icon_name}
                          style={{
                            marginRight: '10px',
                            ...(row?.[column?.icon_key]?.styles || {})
                          }}
                          cursor="pointer"
                        />
                      )}

                      {!column?.noText &&


                        (<p style={{ padding: 0, margin: 0 }}>                      {row[column.key] ? row[column.key] : "-"}
                        </p>)}      </div>

                  </TableCell>

>>>>>>> b1e23b6e18fd9d4353286dc9b890169700ce06e4
                  {console.log(row[column.key], "row[column.key]")}
                </>
              ))}
              {actions && actions.length > 0 && (
<<<<<<< HEAD
                <TableCell align="left">
=======
                <TableCell align="left" sx={{
                  ...bodyStyles,
                  ...{ borderBottom: 0 },
                  // ...(column?.icon_key && row?.[column?.icon_key]?.icon_name && {

                  //   // justifyContent: 'start'
                  // })
                }}>
>>>>>>> b1e23b6e18fd9d4353286dc9b890169700ce06e4
                  <Box display="flex" gap={1}>
                    {" "}
                    {/* You can adjust the gap value as needed */}
                    {actions.map((action) => (
                      <Tooltip key={action.key} title={action.label} arrow>
                        <span>
                          <Icon
                            icon={action?.icon}
                            width="24"
                            height="24"
                            color={action.color}
                            cursor="pointer"
                          />
                        </span>
                      </Tooltip>
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
