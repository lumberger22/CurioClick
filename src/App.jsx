import { useState } from 'react'
import axios from 'axios';
import './App.css'

const ACCESS_KEY = import.meta.env.MOVIE_API_ACCESS_KEY;

function App() {

  const [inputs, setInputs] = useState({
    language: 'en-US',
    page: '1',
    index: '1',
    genre: '',
    year: '',
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

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    params: {
      language: 'en-US',
      page: '1',
    },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTAxODZhNzFjOTE2YzUyNGFiNzFmMzc1OGE4NTUwZiIsInN1YiI6IjY1ZmJiNjZiMDQ3MzNmMDE3ZGU3OWE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5YIcE5WrEuQMi3dluAir37OnJeBksdbu1q7ov7h2zzA'
    }
  };

  fetch('https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_genres=28', options)

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";

    let query = `https://api.themoviedb.org/3/discover/movie?access_key=${ACCESS_KEY}&language=${inputs.language}&page=${inputs.page}&&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

    callAPI(query).catch(console.error);
  }

  return (
    <>
      <p>Hello</p>
    </>
  )
}

export default App
