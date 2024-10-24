import { useState } from "react";
import Button from "./Button";
import blogServices from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user, OnSateUpdate }) => {
  const [onDisplay, setOnDisplay] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [liked, setLiked] = useState(false);

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object,
    OnSateUpdate: PropTypes.func.isRequired,
  };

  const toggleDisplay = () => {
    setOnDisplay((onDisplay) => !onDisplay);
  };

  const handleTokenExpirationError = (err) => {
    if (err.response.data.message === "Token is expired") {
      OnSateUpdate({
        errorMessage: err.reponse.data.message,
      });
      setTimeout(() => {
        OnSateUpdate({
          errorMessage: null,
          user: null,
        });
        blogServices.setToken(null);
      }, 1000);
    }
  };

  const renderRemoveButton = () => {
    if (user.userName === blog.user.userName) {
      return <Button label={"remove"} action={handleRemove} />;
    }
    return null;
  };

  const incrementLikes = async () => {
    try {
      if (liked) {
        return null;
      }
      setLikes((likes) => {
        const updatedLikes = likes + 1;

        const updateBlog = {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: updatedLikes,
        };
        blogServices.updateBlog(blog.id, updateBlog);
        return updatedLikes;
      });
      setLiked((liked) => !liked);
    } catch (err) {
      handleTokenExpirationError(err);
    }
  };

  const handleRemove = async () => {
    try {
      if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        return null;
      }
      await blogServices.deleteBlog(blog.id);
      OnSateUpdate({
        operationSuccessful: true,
        successMessage: "Blog removed",
      });
      setTimeout(() => {
        OnSateUpdate({
          operationSuccessful: false,
          successMessage: null,
        });
      }, 1000);
    } catch (err) {
      handleTokenExpirationError(err);
    }
  };

  return (
    <>
      <div
        style={{
          border: "2px solid black",
          padding: "8px 6px",
          marginBottom: "4px",
        }}
        className="blogsContainer"
      >
        <div className="blog">
          {blog.title} {blog.author}
          <span>
            <Button
              label={onDisplay ? "hide" : "view"}
              action={toggleDisplay}
            />
          </span>
        </div>
        {onDisplay && (
          <>
            <div className="url">{blog.url}</div>
            <div className="likes">
              likes {likes}
              <span>
                <Button label={"like"} action={incrementLikes} />
              </span>
            </div>
            <div>{blog.user.name}</div>
            {renderRemoveButton()}
          </>
        )}
      </div>
    </>
  );
};

export default Blog;
