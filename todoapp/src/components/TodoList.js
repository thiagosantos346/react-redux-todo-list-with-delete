import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { deleteTodo } from '../actions'
import { connect } from 'react-redux'
import TodoDeleteButton from './TodoDeleteButton'


const TodoList = ({ todos, toggleTodo,  dispatch  }) => (
  <ul>
    {todos.map(todo =>
      <div key={todo.id}>
        <Todo
          {...todo}
          onClick={() => toggleTodo(todo.id)}
        />
        <TodoDeleteButton
          onChange={() => dispatch(deleteTodo(todo.id))}
        />
      </div>
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default connect(deleteTodo)(TodoList)