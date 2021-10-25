import React, { useContext } from "react";
import { Box, Grid } from "@mui/material";
import { Button, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PostsContext } from "../../PostsContext";
import Cards from "../Cards";

const Home = () => {
  const { syncing } = useContext(PostsContext);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container alignItems="center" justifyContent="center" spacing={0}>
          <Grid item xs={3} />
          <Grid item align="center" xs={6}>
            <h1>The World's Best Social Media Platform</h1>
            <h5>
              Brought to you by{" "}
              <a href="https://aarsh.io" target="_blank" rel="noreferrer">
                aarsh.io
              </a>
            </h5>
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <Grid container alignItems="center" justifyContent="center" spacing={3}>
          <Grid item>
            <Link
              style={{ textDecoration: "none" }}
              push
              to={{
                pathname: "/create",
              }}
            >
              <Button variant="contained" color="primary">
                Create Post
              </Button>
            </Link>
          </Grid>
        </Grid>

        <br />
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            {syncing ? (
              <>
                <div style={{ textAlign: "center" }}>
                  <CircularProgress color="secondary" />{" "}
                  <p>
                    Syncing... note data takes while to load from{" "}
                    <a
                      href="https://workers.aarsh.workers.dev/posts"
                      target="_blank"
                    >
                      api
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
            <br />
            <Cards />
            <br />
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Box>
    </>
  );
};

export default Home;
