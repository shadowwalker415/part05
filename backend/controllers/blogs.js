const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async function (request, response, next) {
  try {
    const blogs = await Blog.find({}).populate("user", {
      userName: 1,
      name: 1,
    });
    if (!blogs) {
      response.status(400).send({ message: "Error occured" });
    }
    response.status(200).send(blogs);
  } catch (err) {
    next(err);
  }
});

blogRouter.post(
  "/",
  middleware.extractUser,
  async function (request, response, next) {
    try {
      if (!request.body) {
        return response.status(400).send({ error: "Request body missing" });
      }
      if (!request.body.title || !request.body.url) {
        return response
          .status(400)
          .send({ message: "Request body missing title or url" });
      }

      const user = request.user;

      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user._id,
      });

      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    } catch (err) {
      next(err);
    }
  }
);

blogRouter.delete(
  "/:id",
  middleware.extractUser,
  async function (request, response, next) {
    try {
      const blog = await Blog.findById(request.params.id);
      if (!blog) return response.status(400).send({ error: "Blog not found" });
      if (!(blog.user.toString() === request.user._id.toString())) {
        return response.status(401).send({ error: "Unauthorized request" });
      }
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

blogRouter.put(
  "/:id",
  middleware.extractUser,
  async function (request, response) {
    try {
      const blog = await Blog.findById(request.params.id);
      if (!blog) {
        return response.status(400).send({ error: "Blog not found" });
      }

      if (!(blog.user.toString() === request.user._id.toString())) {
        return response.status(401).send({ error: "Unauthorized access" });
      }
      const updatedBlog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
      };
      const updatedResource = await Blog.findByIdAndUpdate(
        request.params.id,
        updatedBlog,
        {
          new: true,
          runValidators: true,
        }
      );
      response.status(201).json(updatedResource);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = blogRouter;
