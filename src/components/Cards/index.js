import React, { useContext } from "react";
import CustomCard from "../CustomCard";
import { PostsContext } from "../../PostsContext";
import { Link } from "react-router-dom";

import { Box, Grid } from "@mui/material";
import CircularProgress from "@material-ui/core/CircularProgress";

const Cards = () => {
  const { posts } = useContext(PostsContext);

  return (
    <>
      {posts === [] || posts === undefined ? (
        <CircularProgress />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            {posts ? (
              <>
                {posts.map((post) => (
                  <Grid key={post.id} item xs={7}>
                    <Link
                      style={{ textDecoration: "none" }}
                      push
                      to={{
                        pathname: `post/${post.id}`,
                      }}
                    >
                      <CustomCard post={post} />
                    </Link>
                  </Grid>
                ))}
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Cards;
