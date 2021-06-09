import React, { useState, useEffect, useCallback } from 'react'
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList'
import './App.css'

function App () {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetchMoviesHandler()
  }, [])
  const fetchMoviesHandler = useCallback(async() => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://swapi.dev/api/films')
      const data = await response.json()
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const transformedData = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_date
        }
      }
      )
      setMovies(transformedData)
    } catch {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (isLoading) {
    content = <p>Loading ...</p>
  }
  if (error) {
    content = <p>{error}</p>
  }

  return (
    <p>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        {content}
      </section>
    </p>
  )
}

export default App
