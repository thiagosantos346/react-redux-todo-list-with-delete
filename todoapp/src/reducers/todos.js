const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('ADD_TODO')
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      console.log('TOGGLE_TODO')
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    case 'DELETE_TODO':    
      let newState = []
      
      state.forEach(todo => {
        if (todo.id !== action.id){
          newState.push(todo)
        }
      });
      return newState
    default:
      return state
  }
}

export default todos