import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { ToolStatus } from "../../configs/LandingPageToolsConfig";

interface Props {
  title: string;
  description: string;
  image: string;
  link: string;
  status: ToolStatus;
}

function Toolcard({ title, description, image, link, status }: Props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Card
      sx={{
        maxWidth: { xs: 300, sm: 300, md: 350, lg: 350, xl: 350 },
        minWidth: 280,
        transform: isHover
          ? "scale3d(1.05, 1.05, 1.5)"
          : "scale3d(1.0, 1.0, 1.0)",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CardActionArea
        href={link}
        target="_"
        disabled={status == ToolStatus.maintenance}
      >
        <CardMedia
          component="img"
          alt="tool image"
          image={image}
          sx={{ height: { xs: 130, sm: 130, md: 150, lg: 150, xl: 150 } }}
        />
        <CardContent
          sx={{ height: { xs: 190, sm: 225, md: 195, lg: 220, xl: 195 } }}
        >
          <Typography
            gutterBottom
            variant="h5"
            fontWeight="500"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            lineHeight={{ xs: 1.4, sm: 1.8 }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            id={"btn-" + title.replace(/\s/g, "")}
            color={status == ToolStatus.maintenance ? "success" : "info"}
            size="medium"
            sx={{
              color: "#ffffff",
              fontWeight: 600,
            }}
            fullWidth
          >
            {status == ToolStatus.maintenance ? "Coming Soon" : "Try It Out"}
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default Toolcard;
