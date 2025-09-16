import { Box } from "@mui/material"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


export const Stars = ({ stars, canClick, setStars } : { stars: number, canClick?: boolean, setStars?: (stars: number) => void }) => {

    const handleClick = (stars: number) => {
        if(canClick && setStars) {
            setStars(stars)
        } else {
            return
        }
    }

  return (
    <Box>
        {stars >= 1 ? <StarIcon color="warning" onClick={() => handleClick(1)} /> : <StarBorderIcon color="warning" onClick={() => handleClick(1)} />}
        {stars >= 2 ? <StarIcon color="warning" /> : <StarBorderIcon color="warning" />}
        {stars >= 3 ? <StarIcon color="warning" /> : <StarBorderIcon color="warning" />}
        {stars >= 4 ? <StarIcon color="warning" /> : <StarBorderIcon color="warning" />}
        {stars >= 5 ? <StarIcon color="warning" /> : <StarBorderIcon color="warning" />}
    </Box>
  );
};