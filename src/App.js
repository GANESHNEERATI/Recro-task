import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState, useRef, useCallback } from "react";
import useFetchPosts from "./FetchPosts";

function App() {
  const [start, setStart] = useState(0);

  const [limit, setLimit] = useState(10);

  const observer = useRef();
  /*used custom hook for fetching posts from api */
  const { loading, error, posts, hasMore } = useFetchPosts(start, limit);

  /* used callback function to observe the last post and change pagination  details */
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setStart((prevSetStart) => prevSetStart + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return (
    <div className="App">
      <h1>Recro Scroll Pagination Example</h1>
      <div className="cards">
        {posts.map((post) => {
          return post.map((p, index) => {
            if (post.length === index + 1) {
              return (
                <div ref={lastPostElementRef} className="cards_container">
                  {" "}
                  <p>
                    <h3>title</h3>
                    {p.title}
                  </p>
                  <p>
                    <h3>body</h3>
                    {p.body}
                  </p>
                </div>
              );
            } else {
              return (
                <div className="cards_container">
                  {" "}
                  <p>
                    <h3>title</h3>
                    {p.title}
                  </p>
                  <p>
                    <h3>body</h3>
                    {p.body}
                  </p>
                </div>
              );
            }
          });
        })}
      </div>
      <div>{loading && "...loading"}</div>
      <div>{error && "...error"}</div>
    </div>
  );
}

export default App;
