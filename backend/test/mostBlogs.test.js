const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("author with most blogs", () => {
  test("with empty list", () => {
    const result = listHelper.getMostBlogs([]);

    assert.deepStrictEqual(result, undefined);
  });

  test("author with most blogs is expected with multiple blogs", () => {
    const result = listHelper.getMostBlogs(listHelper.blogsList);

    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
