import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

describe("LoadingSkeleton", () => {
  it("should render correctly", () => {
    const component = render(<LoadingSkeleton />);

    expect(component).toMatchSnapshot();
  });
});
