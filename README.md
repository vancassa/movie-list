## About

A ReactJS based web app that allows the user to search for any movie title, view the list of search results and details of the selected movie. Data is fetched from OMDb API.

## Views

Movie list screen:

- Enter movie title to search from
- When user reaches the bottom of the page, it should fetch the next set of results if there is any
- Clicking the movie should take the user to Details screen

Details screen:

- User can navigate back to the Movies list screen

## Generate mock data

`node ./node_modules/intermock/build/src/cli/index.js --files ./src/app/types.ts --interfaces "IMovieDetails"`
