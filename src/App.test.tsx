import React from "react";
import { act, fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { mockSearchResult } from "./mockData";
import api from "./app/api";

jest.mock("./app/api", () => {
  return {
    search: jest.fn(),
  };
});

describe("Main app", () => {
  it("renders input label", () => {
    render(<App />);
    const linkElement = screen.getByText(/Enter movie title/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("search for movies upon input", async () => {
    (api.search as jest.Mock).mockImplementation(
      jest.fn().mockResolvedValue({
        data: [],
      })
    );

    const { getByTestId } = render(<App />);

    act(() => {
      fireEvent.change(getByTestId("test-input-title"), { target: { value: "test" } });
    });
    await waitFor(() => {
      expect(api.search).toBeCalledTimes(1);
      expect(api.search).toBeCalledWith("test", 1);
    });
  });
});
