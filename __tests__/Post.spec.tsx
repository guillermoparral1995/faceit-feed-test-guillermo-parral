import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Post from "@/components/Post";

const mockPost: Post = {
  id: 1,
  author: {
    name: "John Doe",
    avatar: {
      thumbnail: "https://example.com/avatar.jpg",
      picture: "https://example.com/avatar.jpg",
    },
  },
  post: {
    created_at: new Date("2024-03-03").toISOString(),
    body: "Hello, world!",
  },
};

describe("Post", () => {
  it("should render correctly - normal", () => {
    const component = render(<Post post={mockPost} withHighlight={false} />);

    expect(component).toMatchSnapshot();
  });

  it("should render correctly - with highlight", () => {
    const component = render(<Post post={mockPost} withHighlight />);

    expect(component).toMatchSnapshot();
  });
});
