import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({handleAddToWatchList, handleRemoveFromWatchList, watchlist}) {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [expandedModal,setExpandedModal] = useState(null)

  const handlePrev = ()=>{
    if(pageNum!=1)
      setPageNum(pageNum-1)
  }

  const handleNext = ()=>{
    setPageNum(pageNum+1)
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=462d8e9952cb7aba7ab856043b920716&language=en-US&page=${pageNum}`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [pageNum]);

  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>

      <div className="flex flex-row flex-wrap justify-around gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            handleAddToWatchList={handleAddToWatchList}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
            watchlist={watchlist}
            expandedModal={expandedModal}
            setExpandedModal={setExpandedModal}
          />
        ))}
      </div>
      <Pagination page={pageNum} handleNext={handleNext} handlePrev={handlePrev}/>
    </div>
  );
}
//https://api.themoviedb.org/3/movie/popular?api_key=462d8e9952cb7aba7ab856043b920716&language=en-US&page=2
export default Movies;
