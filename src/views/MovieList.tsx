import { IMovieSearchResult } from "../app/types";
import InfiniteScroll from "../utils/InfiniteScroll";

interface Props {
  searchQuery: string;
  movieList: IMovieSearchResult[];
  moveToDetails: (imdbID: string) => void;
  loadMoreNumbers: () => void;
  hasMoreData: boolean;
}

const MovieList = (props: Props) => {
  const { hasMoreData, loadMoreNumbers, movieList, moveToDetails } = props;

  return (
    <InfiniteScroll
      hasMoreData={hasMoreData}
      isLoading={false}
      onBottomHit={loadMoreNumbers}
      loadOnMount={false}
    >
      {movieList?.map((movie) => (
        <div
          key={movie.imdbID}
          className="movie-list-item"
          onClick={() => moveToDetails(movie.imdbID)}
        >
          <div>
            <img src={movie.Poster} alt={movie.Title} width="100px" />
          </div>
          <div style={{ marginLeft: 8 }}>
            {movie.Title} ({movie.Year})
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default MovieList;
