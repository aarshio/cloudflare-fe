import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import { Redirect } from "react-router-dom";
import { getPosts, submitPost } from "../../api";
import { PostsContext } from "../../PostsContext";
import { v4 as uuidv4 } from "uuid";

import "react-quill/dist/quill.snow.css"; // ES6

import { Card, CardContent, Grid, TextField, Button } from "@mui/material";
import moment from "moment";

const Create = () => {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const { posts, setPosts, triggerSync } = useContext(PostsContext);

  const handleSubmit = () => {
    const creation = {
      id: uuidv4(),
      timestamp: new Date(),
      title: title,
      username: username,
      content: content,
      comments: [],
      posted: moment(new Date()).fromNow(),
    };
    submitPost(creation).then((res) => {
      const currentPosts = posts;
      currentPosts.push(creation);
      // sort current posts by timestamp
      currentPosts.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      setPosts(currentPosts);
      triggerSync();
      setSubmitted(true);
    });
  };
  return (
    <>
      {submitted ? (
        <Redirect to="/" />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Card style={{ margin: 40 }}>
              <CardContent>
                <h1>Write something good.</h1>
                <TextField
                  label="Title*"
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ marginBottom: 20, width: "100%" }}
                />
                <br />
                <TextField
                  label="Username*"
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ marginBottom: 20, width: "100%" }}
                />
                <ReactQuill
                  style={{ height: 400, marginBottom: 70 }}
                  value={content}
                  onChange={(val) => setContent(val)}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                    clipboard: {
                      // toggle to add extra line breaks when pasting HTML:
                      matchVisual: false,
                    },
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                />
                <Grid container spacing={3}>
                  <Grid item xs={10} />
                  <Grid item xs={2}>
                    <Button
                      disabled={username.trim() === "" || title.trim() === ""}
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      )}
    </>
  );
};

export default Create;
