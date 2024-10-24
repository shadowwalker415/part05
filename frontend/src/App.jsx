import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Button from "./components/Button";
import Blog from "./components/Blog";
import Login from "./components/Login";
import BlogForm from "./components/CreateBlogForm";
import Notification from "./components/Nofitication";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [operationSuccessful, setOperationSuccessful] = useState(false);
  const [displayBlogForm, setDisplayBlogForm] = useState(false);

  const sortBlogs = (blogs) => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes);
    return sorted;
  };
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const existingBlogs = await blogService.getBlogs();
        const sortedBlogs = sortBlogs(existingBlogs);
        setBlogs(sortedBlogs);
      } catch (err) {
        setErrorMessage(err.response.data.message);
      }
    }
    fetchBlogs();
  }, [operationSuccessful]);

  useEffect(() => {
    const cachedUser = window.localStorage.getItem("blogLoggedUser");
    const parsedUser = JSON.parse(cachedUser);
    if (!parsedUser) {
      return setUser(null);
    }
    setUser(parsedUser);
    blogService.setToken(parsedUser.token);
  }, []);

  const handleSateUpdate = ({
    user,
    errorMessage,
    successMessage,
    operationSuccessful,
    displayBlogForm,
  }) => {
    if (user !== undefined) setUser(user);
    if (successMessage !== undefined) setSuccessMessage(successMessage);
    if (errorMessage !== undefined) setErrorMessage(errorMessage);
    if (operationSuccessful !== undefined)
      setOperationSuccessful(operationSuccessful);
    if (displayBlogForm !== undefined) setDisplayBlogForm(displayBlogForm);
  };

  const clearLoginInput = () => {
    setUserName("");
    setPassword("");
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const user = await loginService({ userName, password });
      setUser(user);
      clearLoginInput();
      window.localStorage.setItem("blogLoggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (err) {
      clearLoginInput();
      setErrorMessage(err.response.data.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  const handleSignOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("blogLoggedUser");
    blogService.setToken(null);
    setUser(null);
  };

  if (!user)
    return (
      <>
        <h1>Login to application</h1>
        <div>
          {errorMessage && <Notification notificationMessage={errorMessage} />}
        </div>
        <Login
          handleUserName={({ target }) => setUserName(target.value)}
          handlePassword={({ target }) => setPassword(target.value)}
          onHandleSubmit={handleLogin}
        />
      </>
    );

  return (
    <>
      <h1>Blogs</h1>
      {operationSuccessful && (
        <Notification
          operationSuccessful={operationSuccessful}
          notificationMessage={successMessage}
        />
      )}
      {errorMessage && <Notification notificationMessage={errorMessage} />}
      <div>
        {user.name} logged in
        <span>
          <Button label={"Sign out"} action={handleSignOut} />
        </span>
      </div>
      <div>
        {!displayBlogForm && (
          <Button
            label={"Create new blog"}
            action={() =>
              setDisplayBlogForm((displayBlogForm) => !displayBlogForm)
            }
          />
        )}
      </div>
      <div>
        {displayBlogForm && (
          <>
            <BlogForm onSateUpdate={handleSateUpdate} />
            <Button
              label={"Cancel"}
              action={() =>
                setDisplayBlogForm((displayBlogForm) => !displayBlogForm)
              }
            />
          </>
        )}
      </div>
      <div>
        {blogs.map((blogItem) => (
          <Blog
            blog={blogItem}
            key={blogItem.id}
            user={user}
            OnSateUpdate={handleSateUpdate}
          />
        ))}
      </div>
    </>
  );
};

export default App;
