import React, { useState, useEffect, useCallback } from 'react'
import AddMovie from './components/AddMovie'
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
      const response = await fetch('https://react-database-cc782-default-rtdb.firebaseio.com/')
      const data = await response.json()
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const loadedMovies = []
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseData
        })
      }
      setMovies(loadedMovies)
    } catch {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  function addMovieHandler(movie) {
    const response = await fetch('https://react-database-cc782-default-rtdb.firebaseio.com/', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
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
