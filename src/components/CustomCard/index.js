import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CustomCard({ post }) {
  return (
    <Card
      style={{ width: "100%", background: "lightgray" }}
      sx={{ width: "100%", maxHeight: 600 }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography color="gray" sx={{ mb: 1.5 }}>
          {post.posted} by {post.username}
        </Typography>

        <div
          style={{ "max-height": "1000px", overflow: "hidden" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </CardContent>
    </Card>
  );
}
