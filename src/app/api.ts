const api = {
  search: (query: string, page: number) =>
    fetch(`https://www.omdbapi.com/?apikey=b9bd48a6&s=${query}&page=${page}&type=movie`).then((res) =>
      res.json()
    ),
  getDetails: (imdbID: string) =>
    fetch(`https://www.omdbapi.com/?apikey=b9bd48a6&i=${imdbID}`).then((res) => res.json()),
};

export default api;