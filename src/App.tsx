import React, { useEffect, useState } from "react";
import "./App.css";
import api from "./app/api";
import { IMovieResponse, IMovieSearchResult } from "./app/types";
import useDebounce from "./utils/useDebounce";
import Detail from "./views/Detail";
import MovieList from "./views/MovieList";

const DEBOUNCE_DELAY = 500;
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);
  const [movieList, setMovieList] = useState<IMovieSearchResult[]>([]);
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [currentImdbID, setCurrentImdbID] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      return;
    }
    api.search(debouncedSearchQuery, 1).then((response: IMovieResponse) => {
      if (response.Search?.length > 0) {
        setMovieList(response.Search);
      } else {
        setMovieList([]);
      }
      setCurrentPage(1);
      setTotalResults(response.totalResults ? parseInt(response.totalResults) : 0);
      setErrorMessage(response.Error);
    });
  }, [debouncedSearchQuery]);

  const moveToDetails = (imdbID: string) => {
    setShowMovieDetails(true);
    setCurrentImdbID(imdbID);
  };

  const goBackToMain = () => {
    setShowMovieDetails(false);
    setCurrentImdbID("");
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const loadMoreData = () => {
    if (!debouncedSearchQuery) {
      return;
    }

    api.search(debouncedSearchQuery, currentPage + 1).then((response: IMovieResponse) => {
      if (response.Search?.length > 0) {
        setMovieList([...movieList, ...response.Search]);
        setCurrentPage(currentPage + 1);
      }
      setErrorMessage(response.Error);
    });
  };

  return (
    <div className="App">
      {showMovieDetails ? (
        <Detail imdbID={currentImdbID} goBackToMain={goBackToMain} />
      ) : (
        <div>
          <label htmlFor="title">Enter movie title: </label>
          <input id="title" name="title" value={searchQuery} onChange={handleSearchQueryChange} />
          <div>{errorMessage}</div>
          <MovieList
            loadMoreData={loadMoreData}
            hasMoreData={movieList.length < totalResults}
            searchQuery={debouncedSearchQuery}
            movieList={movieList}
            moveToDetails={moveToDetails}
          />
          {movieList?.length > 0 && (
            <div>
              {movieList.length} of {totalResults}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
