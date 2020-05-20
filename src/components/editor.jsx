import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import Navbar from "./navbar";
import YourBlogPosts from "./common/yourBlogPosts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { submitPost } from "../services/blogPostService";
import { toast } from "react-toastify";
import { storage } from "../firebase";
import { getBlogPosts } from "./../services/userService";
import Spinner from "./common/spinner";

const EditorPage = ({ user }) => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [urls, setUrls] = useState([]);
  const [fakeUrls, setFakeUrls] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [img, setImg] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const [disablePost, setDisablePost] = useState(true);
  const imgBtn = useRef(null);
  const [modules] = useState({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        // handlers object will be merged with default handlers object
        image: function (val) {
          if (val) {
            imgBtn.current.click();
          } else {
            this.quill.format("image", false);
          }
        },
      },
    },
  });

  const formats = [
    "header",
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
    "color",
    "background",
  ];

  useEffect(() => {
    if (title.length === 0) setDisablePost(true);
    else setDisablePost(false);
  }, [title]);

  useEffect(() => {
    async function getData() {
      if (!_.isEmpty(user)) {
        const { data: posts } = await getBlogPosts(user._id);
        setBlogPosts(posts);
      }
    }
    getData();
  }, [user]);

  useEffect(() => {
    if (value.length === 0) setDisableBtn(true);
    else setDisableBtn(false);
  }, [value]);

  const handleSubmit = async () => {
    let newVal = value;
    fakeUrls.forEach((fakeUrl, i) => {
      newVal = newVal.replace(fakeUrl, urls[i]);
    });
    const response = await submitPost({
      postedBy: user._id,
      title,
      img,
      value: newVal,
    });
    if (response) {
      window.location.reload();
      toast("Blog post added successfully");
    } else {
      toast.error("Error adding blog post");
    }
  };

  const handleUpload = ({ target }) => {
    if (target.files[0]) {
      const image = target.files[0];
      let reader = new FileReader();
      let file = image;
      reader.onloadend = () => {
        setValue(value + `<p><img src="${reader.result}"/></p>`);
        setFakeUrls([...fakeUrls, reader.result]);
      };
      reader.readAsDataURL(file);
      const imageName = Date.now() + image.name;
      const uploadTask = storage.ref(`images/${imageName}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast.error("Error uploading picture");
        },
        async () => {
          const url = await storage
            .ref("images")
            .child(imageName)
            .getDownloadURL();
          if (!img.length > 0) setImg(url);
          setUrls([...urls, url]);
        }
      );
    }
  };

  return !_.isEmpty(user) ? (
    <React.Fragment>
      <Navbar user={user} />
      <div className="container mt-4">
        <input
          type="file"
          className="d-none"
          ref={imgBtn}
          onChange={handleUpload}
          multiple
        />
        <div className="row">
          <div className="col-3">
            <div className="fixed bg-white rounded-lg p-3 blog-posts-side">
              <h6 className="text-center mb-4">
                <span
                  className="px-3 pb-2"
                  style={{ borderBottom: "1px solid black" }}
                >
                  Your Blog Posts
                </span>
              </h6>
              <div className="blog-posts-div">
                {blogPosts.length > 0 ? (
                  blogPosts.map((post) => <YourBlogPosts post={post} />)
                ) : (
                  <p className="text-muted label-2 text-center">
                    <em>No posts</em>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-9">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
              placeholder="Start writing..."
              className="editor-box"
            />
            <button
              className="pull-right btn foodux-btn mt-2"
              data-toggle="modal"
              data-target="#addTitle"
              disabled={disableBtn}
            >
              Proceed<i className="fa fa-long-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="addTitle"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addTitleTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title w-100 text-center text-uppercase add-spacing ml-5">
                add post title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input
                placeholder="Add title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                className="form-control text-box"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                onClick={handleSubmit}
                class="btn foodux-btn"
                disabled={disablePost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Spinner />
  );
};

export default EditorPage;
