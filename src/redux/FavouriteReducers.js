const Favourite = (state = [], action) => {
  console.log('action', action.type, 'state', state);
  switch (action.type) {
    case 'ADD_FAV':
      return [
        ...state,
        action.data
      ]
      break;
    case 'REMOVE_FAV':
        let newState = state.filter(item => action.data.id !== item.id)
        return newState
    default:
      return state
  }
}

export default Favourite
