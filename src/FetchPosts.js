import { useEffect, useState } from "react";
import axios from "axios";
export default function useFetchPosts(start, limit) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`,
    })
      .then((res) => {
        setPosts((prevPosts) => {
          return [...prevPosts, res.data];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [start, limit]);
  return { loading, error, posts, hasMore };
}
