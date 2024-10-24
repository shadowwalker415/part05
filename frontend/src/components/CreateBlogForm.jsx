import Button from "./Button";
import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ onSateUpdate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const clearBlogInput = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleCreateBlog = async (event) => {
    try {
      event.preventDefault();

      const blog = {
        title,
        author,
        url,
      };

      const response = await blogService.createBlog(blog);
      if (response) {
        onSateUpdate({
          operationSuccessful: true,
          successMessage: `a new blog ${title}! by ${author} added`,
        });
        setTimeout(() => {
          clearBlogInput();
        }, 1000);
        setTimeout(() => {
          onSateUpdate({
            operationSuccessful: false,
            successMessage: null,
            displayBlogForm: false,
          });
        }, 1000);
      }
    } catch (err) {
      clearBlogInput();
      onSateUpdate({ errorMessage: err.reponse.data.message });
      setTimeout(() => {
        onSateUpdate({ errorMessage: null });
      }, 2000);
    }
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            data-testid="title"
            value={title}
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            value={author}
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button label={"Create"} type={"submit"} />
      </form>
    </>
  );
};

export default BlogForm;
