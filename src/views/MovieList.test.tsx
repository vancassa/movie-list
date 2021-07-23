import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockMovieList } from "../mockData";
import MovieList from "./MovieList";

describe("Movie list", () => {
  it("should call loadMore function when user scroll to bottom", () => {
    // Cannot test this because of jsdom limitation
    // Refer to https://github.com/testing-library/react-testing-library/issues/671
  });

  it("should go to details on click", () => {
    const moveToDetailPage = jest.fn();

    const { container } = render(
      <MovieList
        movieList={mockMovieList}
        moveToDetails={moveToDetailPage}
        loadMoreData={jest.fn()}
        hasMoreData={true}
      />
    );

    act(() => {
      // click the first child
      const element = container.querySelector(".movie-list__item");
      if (element) {
        fireEvent.click(element);
      }
    });

    expect(moveToDetailPage).toBeCalledTimes(1);
    expect(moveToDetailPage).toBeCalledWith(mockMovieList[0].imdbID);
  });
});
