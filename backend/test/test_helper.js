const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Helsinki Times",
    author: "Henni Avoinen",
    url: "https://www.helsinkitimes.fi/",
    likes: 4,
  },
  {
    title: "This is Finland",
    author: "Jenni Iltanen",
    url: "https://finland.fi/",
    likes: 1,
  },
  {
    title: "Finland Today",
    author: "Sivu Ulkonen",
    url: "https://finlandtoday.fi/",
    likes: 6,
  },
];

const nonExistingId = async function () {
  const blog = new Blog({
    title: "Helinksi Our Home",
    author: "Jarvi Turvallinen",
    url: "https://helsinkiourhome.fi/",
    likes: 2,
  });

  await blog.save();
  await blog.deleteOne();

  return note.id.toString();
};

const blogsInDb = async function () {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
};
