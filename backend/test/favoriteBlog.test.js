const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("favorite blog", () => {
  test("undefined is expected on empty list", () => {
    const result = listHelper.favoriteBlog([]);

    assert.deepStrictEqual(result, undefined);
  });

  test("The only blog is expect on list with 1", () => {
    const listWithOne = [
      {
        title: "Turun Opiskelija Bloggi",
        author: "Saija Lukinen",
        url: "https://blogs.turku.fi/opiskelijan-digitaidot/1-tietokoneen-kayton-perusteet/",
        likes: 2,
        id: "665f86dee146557c484848yu",
      },
    ];

    const result = listHelper.favoriteBlog(listWithOne);

    assert.deepStrictEqual(result, {
      title: "Turun Opiskelija Bloggi",
      author: "Saija Lukinen",
      likes: 2,
    });
  });

  test("Blog with most likes is expected with list of many", () => {
    const listWithMany = [
      {
        title: "Helsigin Opiskelija Bloggi",
        author: "Markko Hetkinen",
        url: "https://blogs.helsinki.fi/opiskelijan-digitaidot/1-tietokoneen-kayton-perusteet/",
        likes: 8,
        id: "665f86dee146557c484848fc",
      },

      {
        title: "Turun Opiskelija Bloggi",
        author: "Saija Lukinen",
        url: "https://blogs.turku.fi/opiskelijan-digitaidot/1-tietokoneen-kayton-perusteet/",
        likes: 2,
        id: "665f86dee146557c484848yu",
      },
    ];

    const result = listHelper.favoriteBlog(listWithMany);

    assert.deepStrictEqual(result, {
      title: "Helsigin Opiskelija Bloggi",
      author: "Markko Hetkinen",
      likes: 8,
    });
  });
});
