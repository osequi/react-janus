import React from "react";
import { render } from "@testing-library/react";
import Demo from "./Demo";

it("has a Demo component", () => {
  const { getByText } = render(<Demo />);
  expect(getByText("Demo")).toBeInTheDocument();
});
