import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Detail from "./Detail";
import { mockMovieDetails } from "../mockData";

/**
 * This test file is mocking fetch and checking if fetch is called
 */

describe("Movie details", () => {
  let originFetch: any;
  beforeEach(() => {
    originFetch = (global as any).fetch;
  });
  afterEach(() => {
    (global as any).fetch = originFetch;
  });

  it("fetch movie details when imdb id is present", async () => {
    const mRes = { json: jest.fn().mockResolvedValueOnce(mockMovieDetails) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetch = mockedFetch;

    render(<Detail imdbID={"id"} goBackToMain={() => {}} />);

    await waitFor(() => {
      expect(mockedFetch).toBeCalledTimes(1);
    });
  });

  it("show loading indicator when movie is not available", () => {
    render(<Detail imdbID={"id"} goBackToMain={() => {}} />);
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it("trigger back function on Back button click", async () => {
    const mRes = { json: jest.fn().mockResolvedValueOnce(mockMovieDetails) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetch = mockedFetch;
    const goBack = jest.fn();
    const { getByTestId } = render(<Detail imdbID={"id"} goBackToMain={goBack} />);
    await waitFor(() => {
      expect(getByTestId("test-back-button")).toBeInTheDocument();
    });
    act(() => {
      fireEvent.click(getByTestId("test-back-button"));
    });
    await waitFor(() => {
      expect(goBack).toBeCalledTimes(1);
    });
  });
});
