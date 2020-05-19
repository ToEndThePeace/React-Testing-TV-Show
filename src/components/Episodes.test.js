import React from "react";
import { render } from "@testing-library/react";
import Episodes from "./Episodes";
import { testData } from "../data";

test("renders without errors", () => {
  render(<Episodes episodes={[]} />);
});

test("renders episodes when passed an array", () => {
  const { rerender, queryByText } = render(<Episodes episodes={[]} />);
  expect(queryByText(testData.data._embedded.episodes[0].name)).toBeNull();
  rerender(<Episodes episodes={testData.data._embedded.episodes} />);
  expect(queryByText(testData.data._embedded.episodes[0].name)).toBeInTheDocument();
});
