import { useState } from 'react'
import './App.css'

const ACCESS_KEY = import.meta.env.MOVIE_API_ACCESS_KEY;

function App() {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [prevMovies, setPrevMovies] = useState([]);
  const [inputs, setInputs] = useState({
    language: 'en-US',
    page: '1',
    index: '1',
    genre: '',
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
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";

    let query = `https://api.themoviedb.org/3/discover/movie?`;
    //let query = `https://api.themoviedb.org/3/discover/movie?access_key=${ACCESS_KEY}&language=${inputs.language}&page=${inputs.page}&with_genre=${inputs.genre}&release_date=${inputs.release_date}&append_to_response=credits&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

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

    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${inputs.page}&sort_by=popularity.desc&with_genres=28`, options)
    const json = await response.json();
    console.log(json);

    const index = randomNum(20);
    setCurrentMovie(json.results[index].title);
  }

  return (
    <>
      <h2>Random Movie</h2>
      <h3>{currentMovie}</h3>
      <button onClick={makeQuery}>New Movie</button>
    </>
  )
}

export default App
