import React, { useEffect, useState } from "react";
import api from "../app/api";
import { IMovieDetails } from "../app/types";

interface Props {
  imdbID: string;
  goBackToMain: () => void;
}

const Detail = ({ imdbID, goBackToMain }: Props) => {
  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);

  useEffect(() => {
    if (imdbID) {
      api.getDetails(imdbID).then((data) => {
        setMovieDetails(data);
      });
    }
  }, [imdbID]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <div onClick={goBackToMain}>Back</div>
      </header>
      <img src={movieDetails.Poster} alt={movieDetails.Title} width="300px" />
      <div>{movieDetails.Title}</div>
      <div>{movieDetails.Year}</div>
      <div>{movieDetails.Actors}</div>
      <div>{movieDetails.Language}</div>
      <div>{movieDetails.Released}</div>
    </div>
  );
};

export default Detail;
