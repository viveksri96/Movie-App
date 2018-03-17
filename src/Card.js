import React from 'react'
import {Link} from 'react-router-dom'
import './styles/Card.css'

export const Card = ({poster_path, title, genre_ids, genreList, id, favList, addToFav, removeFav}) => {
  // console.log(favList);
  favList = favList.map(fav => fav.id)
  return(
    <div className="movie-card">
      <Link to={`/movie/${id}`}>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`}/>
        <p>{title}</p>
      </Link>
      <div className="genres-list">
        {
          genre_ids.map((id, index) => (
            <p className="genre-name"> {genreList[id]}{index < genre_ids.length-1 ? ',' : ''} </p>
          ))
        }
        <span
          style={{color: favList.includes(id) ? 'yellow' : 'white'}}
          onClick={() => favList.includes(id) ? removeFav({id, poster_path, title}) : addToFav({id, poster_path, title})}>
          <i className="fas fa-star cursor"/>
        </span>
      </div>
    </div>
  )
}
