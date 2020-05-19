import React from "react";
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { testData } from "./data";
import { fetchShow } from "./api/fetchShow";
import App from "./App";

jest.mock("./api/fetchShow");

test("renders data after api call", async () => {
  fetchShow.mockResolvedValueOnce(testData);
  const { getByText, queryAllByText } = render(<App />);
  const fetch = getByText(/fetching data.../i);
  expect(fetch).toBeInTheDocument();
  waitForElementToBeRemoved(fetch).then(() => {
    const dropdown = getByText(/select a season/i);
    expect(dropdown).toBeInTheDocument();
    userEvent.click(dropdown);
    expect(queryAllByText(/season [1234]/i)).toHaveLength(4);
    expect(fetchShow).toHaveBeenCalledTimes(1);
  });
});
