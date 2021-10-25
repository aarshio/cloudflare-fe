import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { getPost, submitComment } from "../../api";
import Comment from "../Comment";

import moment from "moment";

const Post = () => {
  const [post, setPost] = useState({});
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  let { id } = useParams();

  const fetchPost = () => {
    getPost(id).then((res) => {
      let comments = res.data.comments;
      // sort comments by timestamp
      comments.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      res.data.comments = comments;

      setPost(res.data);
    });
  };

  const handleSubmit = () => {
    submitComment({ post_id: id, comment: comment, username: username }).then(
      (res) => {
        fetchPost();
      }
    );
    setUsername("");
    setComment("");
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <br />
          <Card>
            <CardContent>
              <h1>{post.title}</h1>
              <p>
                Posted by {post.username}{" "}
                {moment(new Date(post.timestamp)).fromNow()}
              </p>
              <div
                style={{ overflowX: "auto" }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          <br />

          <Card>
            <CardContent>
              <h1>Comments</h1>
              <TextField
                label="Your name"
                style={{ width: "100%" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <br />
              <TextField
                style={{ width: "100%" }}
                label="Comment"
                multiline
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <br />
              <br />
              <Grid container spacing={3}>
                <Grid item xs={9} />
                <Grid item xs={3}>
                  <Button
                    //   disable button if username or comment have any spaces or are empty
                    disabled={username.trim() === "" || comment.trim() === ""}
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
              {post.comments ? (
                <>
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </>
              ) : (
                <></>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </>
  );
};

export default Post;
