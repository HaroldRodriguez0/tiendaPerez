import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Skeleton,
} from "@mui/material";

export const SkeletonLoading = () => {
  return (
    <>
      <Card elevation={3}>
        <CardActionArea>
          <Skeleton
            variant="rounded"
            width=''
            height=''
            sx={{width:'45vw', height: '20vh'}}
          />
          <CardContent sx={{ p: "16px 5px 0 5px" }}>
            <Skeleton
              variant="text"
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.2rem" } /* width:'50px', mr:1 */,
              }}
            />
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ mt: 1, p: 1, display: "flex", justifyContent: 'center' }}>
            <Skeleton
              variant="text"
              sx={{ fontSize: ".9rem", width: "50px", mr: 1 }}
            />
            <Skeleton
              variant="circular"
              sx={{ fontSize: "1.5rem", width: "30px" }}
            />
        </CardActions>
      </Card>
    </>
  );
};
