import React, { useState, useEffect } from "react";
import LeftSidebar from "./leftSidebar";
import Navbar from "./navbar";
import BlogPost from "./blogPost";
import { getPosts } from "./../services/blogPostService";

const FoodBlog = ({ user }) => {
  const [active] = useState(1);
  const [blogPosts, setBlogPosts] = useState([]);
  const [array, setArray] = useState([]);
  const [sub, setSub] = useState([]);

  useEffect(() => {
    const outerWrapper =
      blogPosts.length / 3 !== 1
        ? Math.ceil(blogPosts.length / 3)
        : blogPosts.length / 3;
    const array = [];
    const subitems = [];
    for (let i = 0; i < outerWrapper; i++) {
      array.push(i);
    }
    for (let i = 0; i < blogPosts.length; i += 3) {
      subitems.push(blogPosts.slice(i, i + 3));
    }
    setArray(array);
    setSub(subitems);
  }, [blogPosts]);

  useEffect(() => {
    async function getData() {
      const { data: posts } = await getPosts();
      setBlogPosts(posts);
    }
    getData();
  }, []);

  return (
    <React.Fragment>
      <Navbar user={user} />
      <div className="container my-3">
        <div className="row">
          <div className="col-3">
            <LeftSidebar active={active} />
          </div>
          <div className="col-9">
            {array.map((a, i) => (
              <div key={i} className="card-deck mb-3">
                {sub[i].map((s) => (
                  <BlogPost key={s._id} post={s} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FoodBlog;
