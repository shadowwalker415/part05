const blogsList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

const dummy = function (blogs) {
  if (!blogs) return undefined;
  return 1;
};

const convertFavorite = function (blog) {
  if (!blog) return undefined;
  const favorite = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
  return favorite;
};

const convertMostLikes = function (blog) {
  if (!blog) return undefined;

  const mostLikes = {
    author: blog.author,
    likes: blog.likes,
  };
  return mostLikes;
};

const generateAuthorSet = function (blogsArray) {
  let authorSet;
  let i;

  if (!blogsArray) return undefined;
  authorSet = new Set();
  i = 0;
  while (i < blogsArray.length) {
    authorSet.add(blogsArray[i].author);
    i++;
  }
  return authorSet;
};

const countAuthorOccurrence = function (blogsArray, author) {
  if (!blogsArray || !author) return undefined;

  return blogsArray.filter((blog) => blog.author === author).length;
};

const generateBlogCount = function (authorSet, authorArray) {
  const authors = [...authorSet];
  const mostBlogsList = [];
  let i;
  let blogCount;
  if (!authorSet || !authorArray) return undefined;
  i = 0;
  while (i < authors.length) {
    blogCount = {
      author: authors[i],
      blogs: countAuthorOccurrence(authorArray, authors[i]),
    };
    mostBlogsList.push(blogCount);
    i++;
  }
  return mostBlogsList;
};

const getMostBlogs = function (blogs) {
  if (!blogs) return undefined;

  const authorSet = generateAuthorSet(blogs);

  const blogCount = generateBlogCount(authorSet, blogs);

  const maxBlogs = blogCount.filter(
    (blog) => blog.blogs === Math.max(...blogCount.map((blog) => blog.blogs))
  );
  return maxBlogs[0];
};

const getMostLikes = function (blogs) {
  if (!blogs) return undefined;

  const maxLikes = blogs.filter(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  );
  const blogWithMostLikes = convertMostLikes(maxLikes[0]);
  return blogWithMostLikes;
};

const totalLikes = function (blogs) {
  if (blogs.length === 0) return 0;

  if (blogs.length === 1) {
    const [blog] = blogs;
    return blog.likes;
  }
  const totalLikes = blogs.reduce((acc, blog) => {
    return { total: acc.likes + blog.likes };
  });
  return totalLikes.total;
};

const favoriteBlog = function (blogs) {
  if (!blogs) return undefined;

  const [blog] = blogs.filter(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  );

  return convertFavorite(blog);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  getMostBlogs,
  getMostLikes,
  blogsList,
};
