import React, {Component} from 'react'
import {connect} from 'react-redux'
import { addToFav, removeFav} from './redux/actions'
import axios from 'axios';
import {
  Pager,
  Modal
} from 'react-bootstrap'
import './styles/List.css'
import { Card } from './Card'
import {Loader} from './Loader'
import { API_KEY } from './utils/constants'


class List extends Component{
  constructor(props){
    super(props)
    this.state = {
      movieList: null,
      activePage: 1,
      totalPages: null
    }
  }

  componentWillMount() {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    .then(res => {
      let genres = []
      res.data.genres.map(genre => (genres[genre.id] = genre.name))
      this.setState({genres},() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`)
        .then((res) => {
          this.setState({movieList: res.data.results, totalPages: res.data.total_pages})
        })
      })
    })
  }

  getData(type){
    this.setState({movieList: null})
    const {activePage, totalPages} = this.state
    switch(type){
      case 'prev':
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${activePage-1}`)
        .then((res) => {
          this.setState({movieList: res.data.results, totalPages: res.data.total_pages, activePage: activePage-1})
        })
        break;
      case 'next':
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${activePage+1}`)
        .then((res) => {
          this.setState({movieList: res.data.results, totalPages: res.data.total_pages, activePage: activePage+1})
        })
        break;
    }

  }

  handleChange = (e) => {
    if(e.target.value){
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${e.target.value}&page=1`)
      .then(res => this.setState({movieList: res.data.results, totalPages: res.data.total_pages, activePage: 1}))
    }
    else{
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`).then((res) => {
        this.setState({movieList: res.data.results, totalPages: res.data.total_pages})
      })
    }

  }

  render(){
    const { movieList, activePage, totalPages, genres, showModal } = this.state;
    const { fav, addToFav, removeFav } = this.props
    console.log(this.props);
    return(
      <div>
        <div className='search-box'>
          <p>Search</p>
          <input onChange={(e) => this.handleChange(e)}/>
          <p className="float-right" onClick={() => this.setState({showModal: true})}>Show Favourite Movies</p>
        </div>
        <div style={{padding: '30px', display: 'flex', flexWrap: 'wrap'}}>
          {
            movieList ? movieList.map(movie => (
              <Card {...movie} genreList={genres} favList={fav} addToFav={addToFav} removeFav={removeFav}/>
            ))
             :
             <Loader loading={movieList}/>
          }
        </div>
        <Pager>
          <Pager.Item disabled={activePage === 1} onClick={() => this.getData('prev')}>Previous</Pager.Item>{' '}
          <Pager.Item disabled={activePage === totalPages} onClick={() => this.getData('next')}>Next</Pager.Item>
        </Pager>
        <Modal show={showModal} onHide={() => this.setState({showModal: false})}>
          <Modal.Header closeButton>
            <Modal.Title><p style={{color: 'black'}}>Favourite Movies</p></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              fav.length > 0 ? fav.map(movie => {
                return(
                  <div className="movie-card">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                    <h5>{movie.title}</h5>
                    <p className="remove-btn" onClick={() => removeFav(movie)}>Click to remove from Favourite</p>
                  </div>
                )
              })
              : 'No favourite movie yet'
            }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { fav: state.Favourite }
}
const mapDispatchToProps = {
  addToFav,
  removeFav
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
