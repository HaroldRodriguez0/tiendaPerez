import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Skeleton,
} from "@mui/material";
import placeholder from '../../assets/placeholder.svg';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const SkeletonProduct = () => {
  return (
    <>
      <Card elevation={3}>
        <CardActionArea>
          <LazyLoadImage 
          width='100%'
                alt="produucts"
                src={placeholder}
                effect="blur"
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
