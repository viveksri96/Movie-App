import { combineReducers } from 'redux'
import Favourite from './FavouriteReducers'
// import visibilityFilter from './visibilityFilter'

const MovieApp = combineReducers({
  Favourite,
})

export default MovieApp
