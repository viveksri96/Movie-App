import {API_KEY} from './../utils/constants'
import axios from 'axios'

export const addToFav = data =>{
  return{
    type: 'ADD_FAV',
    data
  }
}

export const removeFav = data => {
  return{
    type: 'REMOVE_FAV',
    data
  }
}
