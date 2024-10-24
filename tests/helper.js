const loginWith = async (page, userName, password, name) => {
  await page.getByTestId("username").fill(userName);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlogWith = async (page, title, author, url) => {
  await page.getByTestId("title").fill(title);
  await page.getByTestId("author").fill(author);
  await page.getByTestId("url").fill(url);
  await page.getByRole("button", { name: "Create" }).click();
};

export { loginWith, createBlogWith };
