import axios from "axios";
import React, { useEffect, useState } from "react";

function Banner() {
  const [latestMovie, setLatestMovie] = useState({})

  useEffect(()=>{
    axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=462d8e9952cb7aba7ab856043b920716')
         .then((res)=>{
          const randomIdx = Math.floor(Math.random() * res.data.results.length);
          setLatestMovie(res.data.results[randomIdx])
          })
  },[]
)
  return (
    <div
      className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage:
          `url(https://image.tmdb.org/t/p/original/${latestMovie.backdrop_path})`
      }}
    >
        <div className="text-white text-2xl text-center w-full bg-gray-900/60 p-4">{latestMovie.original_title}</div>
    </div>
  );
}

export default Banner;
