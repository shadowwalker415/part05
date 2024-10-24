const { describe, test, expect, beforeEach } = require("@playwright/test");
const { loginWith, createBlogWith } = require("./helper");

describe("Blog App", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    beforeEach(async ({ page, request }) => {
      // Reseting database
      await request.post("/api/test/reset");

      // Creating a new user
      await request.post("/api/users", {
        data: {
          userName: "johndoe",
          name: "John Freeman",
          password: "food123",
        },
      });

      await page.goto("/");
    });
    test("succeed with correct credentials", async ({ page }) => {
      await loginWith(page, "johndoe", "food123");
      await expect(page.getByText("John Freeman logged in")).toBeVisible();
    });
    test("fail with wrong credentials", async ({ page }) => {
      await loginWith(page, "johnday", "food123");
      await expect(page.getByText("John Freeman logged in")).toBeHidden();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page, request }) => {
      // Reseting database
      await request.post("/api/test/reset");

      // Creating a new user
      await request.post("/api/users", {
        data: {
          userName: "johndoe",
          name: "John Freeman",
          password: "food123",
        },
      });
      await loginWith(page, "johndoe", "food123");
    });

    test("A new blog can be created", async ({ page }) => {
      //Clicking Creat new blog button
      await page.getByRole("button", { name: "Create new blog" }).click();

      // Filling blog form and clicking create button
      await createBlogWith(
        page,
        "Love for coding",
        "Jenni Ulkonen",
        "http://lovecoding.dev"
      );
      await expect(
        page.getByText("Love for coding Jenni Ulkonen")
      ).toBeVisible();
    });
    test("Created blog can be liked", async ({ page }) => {
      //Clicking Creat new blog button
      await page.getByRole("button", { name: "Create new blog" }).click();

      // Filling blog form and clicking create button
      await createBlogWith(
        page,
        "Love for coding",
        "Jenni Ulkonen",
        "http://lovecoding.dev"
      );

      // Clicking view button to view blog content
      await page.getByRole("button", { name: "view" }).click();
      // Clicking like button to like blog
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("Blog added by user can be deleted", async ({ page }) => {
      //Clicking Creat new blog button
      await page.getByRole("button", { name: "Create new blog" }).click();

      // Filling blog form and clicking create button
      await createBlogWith(
        page,
        "Love for coding",
        "Jenni Ulkonen",
        "http://lovecoding.dev"
      );

      // Clicking view button to view blog content
      await page.getByRole("button", { name: "view" }).click();
      // Registering a dialog event and accepting when event occurs
      page.on("dialog", (dialog) => dialog.accept());
      // Clicking the remove button to remove a blog
      await page.getByRole("button", { name: "remove" }).click();
      await expect(
        page.getByText("Love for coding Jenni Ulkonen")
      ).toBeHidden();
    });
    test.only("Remove button is visible to user", async ({ page, request }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();

      // Filling blog form and clicking create button
      await createBlogWith(
        page,
        "Love for coding",
        "Jenni Ulkonen",
        "http://lovecoding.dev"
      );

      // Clicking view button to view blog content
      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByText("remove")).toBeVisible();

      // Signing out current user
      await page.getByRole("button", { name: "Sign out" }).click();

      //Creating a new user
      await request.post("/api/users", {
        data: {
          userName: "janedoe",
          name: "Jane Freeman",
          password: "drink1234",
        },
      });
      //Singing in new user
      await loginWith(page, "janedoe", "drink1234");
      // Clicking view button to view blog content
      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByText("remove")).toBeHidden();
    });
  });
});
