import { Skeleton, TableCell, TableRow } from "@mui/material";
import { Fragment } from "react";


export const SkeletonInventario = () => {
  return (
    <Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell component="th" scope="row">
        <Skeleton
              variant="text"
              sx={{ fontSize: ".9rem", width: "50px" }}
            />
        </TableCell>
        <TableCell>
        <Skeleton
              variant="text"
              sx={{ fontSize: ".9rem", width: "30px" }}
            />
        </TableCell>
        <TableCell>
          <Skeleton
              variant="text"
              sx={{ fontSize: ".9rem", width: "30px" }}
            />
        </TableCell>
        <TableCell>
          <Skeleton
              variant="text"
              sx={{ fontSize: ".9rem", width: "30px" }}
            />
        </TableCell>
        <TableCell>
          <Skeleton
              variant="text"
              sx={{ fontSize: ".9rem", width: "30px" }}
            />
        </TableCell>
      </TableRow>
    </Fragment>
  )
}
