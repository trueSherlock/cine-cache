import React, { useEffect, useState } from "react";
import genres from "../utility/genre";

function Watchlist({ watchlist, handleRemoveFromWatchList, setWatchList }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [curGenre, setCurGenre] = useState("All Genres");

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...sortedIncreasing]);
  };
  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortedDecreasing]);
  };

  useEffect(() => {
    let allCurrentGenres = watchlist.map((movie) => genres[movie.genre_ids[0]]);
    allCurrentGenres = new Set(allCurrentGenres);
    setGenreList(["All Genres", ...allCurrentGenres]);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => setCurGenre(genre)}
              className={
                genre == curGenre
                  ? "bg-blue-400 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center m-4"
                  : "bg-gray-400/50 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center m-4"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-4">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
          placeholder="Search Movies"
          type="text"
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2">
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movie) => {
                if (curGenre == "All Genres") {
                  return true;
                } else {
                  return genres[movie.genre_ids[0]] == curGenre;
                }
              })
              .filter((movie) => {
                return movie.title.toLowerCase().includes(search.toLocaleLowerCase());
              })
              .map((movie) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      ></img>
                      <div className="mx-10">{movie.title}</div>
                    </td>
                    <td>{movie.vote_average}</td>
                    <td>{movie.popularity}</td>
                    <td>{genres[movie.genre_ids[0]]}</td>
                    <td
                      className="text-red-800"
                      onClick={() => handleRemoveFromWatchList(movie)}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
