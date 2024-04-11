import React from "react";
import Modal from "./Modal";

function MovieCard({
  movie,
  watchlist,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  expandedModal,
  setExpandedModal,
}) {
  function isMovieInWatchList(movie) {
    return watchlist.some((item) => item.id === movie.id);
  }

  const handleModalOnClick = () => {
    setExpandedModal(movie.id === expandedModal ? "" : movie.id);
  };

  const handleAddHeartClick = (e) => {
    e.stopPropagation()
    handleAddToWatchList(movie)
  }

  const handleRemoveHeartClick = (e) => {
    e.stopPropagation()
    handleRemoveFromWatchList(movie)
  }

  return (
    <div
      id={movie.id}
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      onClick={handleModalOnClick}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
      }}
    >
      {expandedModal === movie.id && (
        <Modal>
          <div className="flex flex-col gap-2 bg-white px-4 pb-4 rounded-lg">
            <h1 className="text-lg text-black mt-2 pr-48">Summary</h1>
            <hr />
            <div className="flex flex-col gap-2">{movie.overview}</div>
            <hr />
          </div>
        </Modal>
      )}
      {isMovieInWatchList(movie) ? (
        <div
          onClick={handleRemoveHeartClick}
          className="m-4 flex flex-col justify-center h-7 w-7 item-center bg-gray-900/60"
        >
          <i className="fa-solid fa-heart-circle-minus custom-color fa-xl"></i>
        </div>
      ) : (
        <div
          onClick={handleAddHeartClick}
          className="m-4 flex flex-col justify-center h-7 w-7 item-center bg-gray-900/60"
        >
          <i className="fa-solid fa-heart-circle-plus fa-inverse fa-xl"></i>
        </div>
      )}
      <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60">
        {movie.original_title}
      </div>
    </div>
  );
}

export default MovieCard;
