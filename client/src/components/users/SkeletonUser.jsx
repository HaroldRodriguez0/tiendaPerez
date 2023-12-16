import { Skeleton, TableCell, TableRow } from "@mui/material";
import { Fragment } from "react";


export const SkeletonUser = () => {
  return (
    <Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell sx={{ p: 0 }}>
        </TableCell>
        <TableCell component="th" scope="row">
        <Skeleton
              variant="text"
              sx={{ fontSize: ".9rem", width: "50px" }}
            />
        </TableCell>
        <TableCell>
        <Skeleton
              variant="text"
              sx={{ fontSize: ".9rem", width: "50px" }}
            />
        </TableCell>
        <TableCell>
          <Skeleton
              variant="text"
              sx={{ fontSize: ".9rem", width: "50px" }}
            />
        </TableCell>
      </TableRow>
    </Fragment>
  )
}
