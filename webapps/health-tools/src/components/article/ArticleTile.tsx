import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Box, Button, Link, Typography } from "@mui/material";
import { ArticleType, IArticle } from "../../configs/ArticleConfig";
import { READ_MORE_BUTTON_LABEL } from "../../configs/TextConstants";

function ArticleTile({ title, type = ArticleType.article, link }: IArticle) {
  return (
    <Link href={link} target="_blank" sx={{ textDecoration: "none" }}>
      <Box
        bgcolor="background.paper"
        borderRadius={5}
        padding={2}
        sx={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "space-between",
          boxShadow: 3,
          width: { xs: 200, sm: 370, md: 290, lg: 380, xl: 370 },
          height: { xs: 270, sm: 220, md: 210, lg: 220, xl: 220 },
        }}
      >
        <Box sx={{ alignItems: "flex-start" }}>
          <Typography
            variant="h6"
            bgcolor="black"
            color="white"
            width={70}
            borderRadius={1}
            paddingLeft={1}
            paddingRight={1}
          >
            {type}
          </Typography>
        </Box>

        <Box sx={{ alignItems: "flex-start" }}>
          <Typography variant="h5">{title}</Typography>
        </Box>

        <Box sx={{ alignItems: "flex-end" }}>
          <Button
            variant="text"
            size="large"
            sx={{ color: "info.main", fontSize: "1rem" }}
            endIcon={<ArrowForwardOutlinedIcon />}
          >
            {READ_MORE_BUTTON_LABEL}
          </Button>
        </Box>
      </Box>
    </Link>
  );
}

export default ArticleTile;
