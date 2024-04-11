import { useEffect, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddToWatchList = (movie) => {
    let newWatchList = [...watchlist, movie]
    localStorage.setItem('favMovies',JSON.stringify(newWatchList))
    setWatchList(newWatchList)
  }
  let handleRemoveFromWatchList = (movie) => {
    let newWatchList = watchlist.filter((m) => m.id != movie.id)
    localStorage.setItem('favMovies',JSON.stringify(newWatchList))
    setWatchList(newWatchList)
  }

  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('favMovies')
    if(!moviesFromLocalStorage){
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))
  },[])


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner></Banner>
                <Movies
                  watchlist={watchlist}
                  handleAddToWatchList={handleAddToWatchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                />
              </>
            }
          ></Route>
          <Route path="/watchlist" element={<Watchlist watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>}></Route>
        </Routes>
      </BrowserRouter>
      <footer className="bg-gray-900 text-white ">
        <div className="mx-auto flex justify-between py-4 px-6 italic">This product uses the TMDB API but is not endorsed or certified by TMDB.</div>
      </footer>
    </>
  );
}

export default App;
