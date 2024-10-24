const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");

describe("total likes", () => {
  test("Of empty list is zero", () => {
    const listWithZero = [];
    const result = listHelper.totalLikes(listWithZero);

    assert.strictEqual(result, 0);
  });

  test("When list has only one blog equals the likes of that", () => {
    const listWithOne = [
      {
        title: "Helsigin Opiskelija Bloggi",
        author: "Markko Hetkinen",
        url: "https://blogs.helsinki.fi/opiskelijan-digitaidot/1-tietokoneen-kayton-perusteet/",
        likes: 8,
        id: "665f86dee146557c484848fc",
      },
    ];
    const result = listHelper.totalLikes(listWithOne);

    assert.strictEqual(result, 8);
  });

  test("A bigger list is calculated right", () => {
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
    const result = listHelper.totalLikes(listWithMany);
    assert.strictEqual(result, 10);
  });
});
