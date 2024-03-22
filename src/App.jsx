import { useState } from 'react'
import Gallery from './Components/Gallery';
import './App.css'

const ACCESS_KEY = import.meta.env.MOVIE_API_ACCESS_KEY;

function App() {
  const [currentMovie, setCurrentMovie] = useState({});
  const [prevMovies, setPrevMovies] = useState([]);
  const [inputs, setInputs] = useState({
    language: 'en-US',
    page: '1',
    genre: '28',
    release: '',
  });

  const genres = {
    'Action' : 28,
    'Adventure' : 12,
    'Animation' : 16,
    'Comedy' : 35,
    'Crime' : 80,
    'Documentary' : 99,
    'Fantasy' : 14,
    'Family' : 10751,
    'Drama' : 18,
    'Mystery' : 9648,
    'Music' : 10402,
    'Horror' : 27,
    'History' : 36,
    'Thriller' : 53,
    'TV Movie' : 10770,
    'Science Fiction' : 878,
    'Romance' : 10749,
    'War' : 10752,
    'Western' : 37
  }

  const makeQuery = () => {
    let query = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${inputs.language}&page=${inputs.page}&with_genres=28&append_to_response=credits`;

    callAPI(query).catch(console.error);
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTAxODZhNzFjOTE2YzUyNGFiNzFmMzc1OGE4NTUwZiIsInN1YiI6IjY1ZmJiNjZiMDQ3MzNmMDE3ZGU3OWE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5YIcE5WrEuQMi3dluAir37OnJeBksdbu1q7ov7h2zzA'
    }
  };

  const randomNum = (max) => {
    return Math.floor(Math.random() * max);
  }

  const callAPI = async (query) => {
    let num = randomNum(500);
    setInputs({page: num})

    const response = await fetch(query, options)
    const json = await response.json();
    console.log(json);

    

    const index = randomNum(20);
    setCurrentMovie(json.results[index]);
    setPrevMovies((movies) => [...prevMovies, currentMovie]);
  }

  const getImage = (movie) => {
    let path = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    return path;
  }

  return (
    <>
    <div className='leftContainer'>
      <Gallery movies={prevMovies}/>
    </div>
    <div className='middleContainer'>
      <h2>Random Movie</h2>
      <br/>
      <div className='movieInfoContainer'>
        <h3>Title: {currentMovie.title}</h3>
        <br/>
        <h3>Release Date: {currentMovie.release_date}</h3>
        <img className='currImage' src={getImage(currentMovie)}/>
      </div>
      <button className='discoverButton' onClick={makeQuery}>New Movie</button>
    </div>
    <div className='rightContainer'>
      <h2>Ban List</h2>
    </div>
    </>
  )
}

export default App
