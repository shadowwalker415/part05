import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { beforeEach, describe, expect } from "vitest";

describe("<Blog />", () => {
  let container;
  let blog;
  let onSateUpdate;
  let user;

  beforeEach(() => {
    blog = {
      title: "Writing Clean Code",
      author: "Sherry Baston",
      url: "http://sherrywick.com",
      likes: 1,
      user: {
        name: "James Miller",
        username: "james07",
      },
    };

    onSateUpdate = vi.fn();

    container = render(
      <Blog blog={blog} OnSateUpdate={onSateUpdate} />
    ).container;

    user = userEvent.setup();
  });

  test("Renders only title, and author", () => {
    const blogElement = screen.getByText("Writing Clean Code Sherry Baston");

    expect(blogElement).toBeDefined();
  });

  test("Renders url, and likes", async () => {
    const displayButton = screen.getByText("view");
    await user.click(displayButton);
    const urlElement = container.querySelector(".url");
    const likesElement = container.querySelector(".likes");
    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();
  });
});

// describe("<BlogForm />", () => {
//   beforeEach(() => {});
// });
