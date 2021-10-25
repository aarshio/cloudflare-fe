import React, { useState, useEffect } from "react";
import Router from "./routes";
import { PostsContext } from "./PostsContext";
import moment from "moment";

import { getPosts } from "./api";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [syncing, setSyncing] = useState(false);

  const fetchPosts = () => {
    getPosts().then((res) => {
      let arr = [];
      for (let item of res.data) {
        item.posted = moment(new Date(item.timestamp)).fromNow();
        arr.push(item);
      }
      let currentPosts = res.data;
      currentPosts.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setPosts(currentPosts);
    });
  };

  const triggerSync = () => {
    setSyncing(true);
    setTimeout(() => {
      fetchPosts();
      setSyncing(false);
    }, 20000);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{ posts, setPosts, syncing, setSyncing, triggerSync }}
    >
      <Router />
    </PostsContext.Provider>
  );
};

export default App;
