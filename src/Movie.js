import React, {Component} from 'react'
import {connect} from 'react-redux'
import {API_KEY} from './utils/constants'
import axios from 'axios'
import './styles/Movie.css'
import {addToFav, removeFav} from './redux/actions'

class Movie extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  componentWillMount(){
    // console.log(this.props);
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    .then(res => {
      let genres = []
      res.data.genres.map(genre => (genres[genre.id] = genre.name))
      this.setState({genres},() => {
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${API_KEY}`)
        .then((res) => {
          this.setState({movie: res.data})
        })
      })
    })
  }

  render() {
    const {movie} = this.state
    const { fav, addToFav, removeFav } = this.props
    // console.log(this.props);
    return(
      <div>
        <span onClick={() => this.props.history.goBack()}><i className="fas fa-arrow-left arrow-back" ></i></span>
        {
          movie ?
          <div className="movie-container" >
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
            <div className="movie-description">
              <p className="movie-title">{movie ? movie.title :''}
                <span onClick={() => fav.includes(movie.id) ? removeFav(movie.id) : addToFav(movie.id)}
                  style={{color: fav.includes(movie.id) ? 'yellow' : 'white'}}>
                  <i
                    className="fas fa-star cursor"
                  />
                </span>
              </p>
              <p>{movie.overview}</p>
              <p><span>Duration:</span> {movie.runtime} mins</p>
              <p><span>Release Date:</span> {movie.release_date}</p>
              <p></p>
            </div>
          </div>
           :''
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { fav: state.Favourite }
}

const mapDispatchToProps = {
  addToFav,
  removeFav
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
