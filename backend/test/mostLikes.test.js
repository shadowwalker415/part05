const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("blog with most likes", () => {
  test("undefined is expected with empty list", () => {
    const result = listHelper.getMostLikes([]);

    assert.deepStrictEqual(result, undefined);
  });

  test("blog with most likes is expect with list of many", () => {
    const result = listHelper.getMostLikes(listHelper.blogsList);

    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
