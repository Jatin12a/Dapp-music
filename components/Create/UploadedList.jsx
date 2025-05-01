import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlaylistCard } from "../../components/index";
import { Create2 } from "../SVG/index";

const UploadedList = () => {
  const [allUserPosts, setAllUserPosts] = useState([]);
  const [allUserPostsCopy, setAllUserPostsCopy] = useState([]);
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const CHECK_AUTH = async () => {
    try {
      const res = await axios.get("/api/auth/refetch", { withCredentials: true });
      return res.status === 200 ? res.data : null;
    } catch (err) {
      console.error(err);
    }
  };

  const GET_ALL_POSTS = async () => {
    try {
      const currentUser = await CHECK_AUTH();
      const res = await axios.get(`/api/post/user/${currentUser._id}`, { withCredentials: true });
      if (res.status === 200) {
        setAllUserPosts(res.data.posts);
        setAllUserPostsCopy(res.data.posts);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    GET_ALL_POSTS();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      const filtered = allUserPostsCopy.filter(({ title }) =>
        title.toLowerCase().includes(search.toLowerCase())
      );
      setAllUserPosts(filtered.length ? filtered : allUserPostsCopy);
    } else {
      setAllUserPosts(allUserPostsCopy);
    }
  }, [search]);

  return (
    <div className="flex h-full max-h-[calc(100vh-64px)] flex-col overflow-hidden">
      <h3 className="c-ddfucX">Select</h3>
      <div className="c-gYAfAA">
        <Create2 />
        <input
          type="text"
          placeholder="Search songs by title"
          className="c-gmlcKr"
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
      <div className="c-gwhzgO max-h-[calc(100vh-341px)] overflow-auto">
        {allUserPosts.map((post) => (
          <PlaylistCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UploadedList;
