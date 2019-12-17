

# Todo List - React-Redux
****
## Criando a aplicação ReactJs

###### Primeiro certifique-se que você tenha o Node.js instalado em sua máquina, abra um terminal e execute o comando:
```node --version```
###### Se o node estiver instaldo, algo como ```v13.3.0```, para instalar [node](https://nodejs.org/) .
 
- Primeiro vamos criar uma aplicação React npx create-react-app [Nome-Aplicação]:
    - npx create-react-app todoapp
- Agora usando o terminal entre na pasta que contém o nome da aplicação feita no passo anterior.

    linux 
    ```cd todoapp``` 
    Windows 
    ```dir todoapp``` 
    
- Agora vamos iniciar a aplicação para testar se ocorreu tudo bem.     

```npm start```
ou
```yarn start```

## Instalando a biblioteca Redux
```npm install --save redux```
    
***
[todoapp](https://github.com/thiagosantos346/react-redux-todo-list-with-delete/tree/master/todoapp)

├── [README.md](https://github.com/thiagosantos346/react-redux-todo-list-with-delete/blob/master/README.md)

├── [package.json](https://github.com/thiagosantos346/react-redux-todo-list-with-delete/blob/master/todoapp/package.json)

├── [public](https://github.com/thiagosantos346/react-redux-todo-list-with-delete/tree/master/todoapp/public)

│   ├── [index.html](https://github.com/thiagosantos346/react-redux-todo-list-with-delete/blob/master/todoapp/public/index.html)

│   └── [manifest.json](https://github.com/thiagosantos346/react-redux-todo-list-with-delete/blob/master/todoapp/public/manifest.json)

└── src

    ├── actions
    
    │   └── index.js
    
    └─ components
    
    │   ├── [App.js][5]
    
    │   ├── Todo.js
    
    │   └── TodoList.js
    
    ├── containers
    
    │    └── AddTodo.js
    
    ├── reducers
    
    │    ├── index.js
    
    │    └── todo.js
    
    └── index.js
    
***

## Agora vamos criar o nosso ponto de entrada da aplicação:

### Nesse ponto vamos, criar a nossa loja central, que contém todos os estados da aplicação.
### O exemplo abaixo é uma adaptação de : <https://github.com/reduxjs/redux/tree/master/examples/todos>
###### src/index.js

- [Introduz três princípios básicos:](https://redux.js.org/introduction/three-principles#three-principles)

    - Fonte única da verdade:
    
```javascript
import React from 'react'
import { render } from 'react-dom'
// Note que é necesssario importar o createStrore do redux
import { createStore } from 'redux'
// Note que é nessario importa o Provider do react-redux
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

/*
* Para garantir esse princípio, no app de entrada do react 
* construimos esse objeto store, que será responsavel por
* centralizar os estados da aplicação.
*/

const store = createStore(rootReducer)

render(
    // Para que os componentes do react, tenha acesso aos estados
    // devemos passar o objeto store para o componente <Provider> </Provider> 
    // e adicionarmos o componente <App/>.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
    
    - Estado é somente leitura:
    - Alterações são feitas com funções puras:




## Vamos criar os nossos componentes:
[1]: src/components/App.js


```javascript
import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
```

###### src/components/Footer.js


```javascript
import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'

const Footer = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>
      All
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
      Active
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
      Completed
    </FilterLink>
    <FilterLink filter={VisibilityFilters.SORT_ITENS}>
      Sort
    </FilterLink>
  </div>
)

export default Footer
```

###### src/components/Link.js


```javascript
import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onClick }) => (
    <button
       onClick={onClick}
       disabled={active}
       style={{
           marginLeft: '4px',
       }}
    >
      {children}
    </button>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
```

###### src/components/Todo.js


```javascript
import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
```

###### src/components/TodoDeleteButton.js


```javascript
import React from 'react'
import PropTypes from 'prop-types'

const TodoDeleteButton = ({onChange, id}) => (
    <div>
        <input
            type="checkbox"
            id={id}
            onChange={onChange}
        />
    </div>
)

TodoDeleteButton.prototype = {
    onChange: PropTypes.func.isRequired,
    id : PropTypes.number.isRequired
}

export default TodoDeleteButton
```

###### src/components/TodoList.js


```javascript
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
```

## Vamos criar as nossas actions:

### As actions são objetos, que representam uma mensagem, que deve ser enviada a um despachador, os nossos reducer, que serão descritos adiante.

###### src/actions/index.js


```javascript
let nextTodoId = 0

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  id
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SORT_ITENS: 'SORT_ITENS',
}

```

###### Note que esses objetos carregam uma mensagem: [type], essa mensagem é o identificador do objeto, para quem esse deve ser destinado no reducer. 

## Vamos criar os nossos reducers:

### Reducers são funções puras, que calculam o novo estado de um objeto, com base no estado anterior desse objeto.

###### src/actions/index.js

###### Como vamos usar mais de um redutor, então usamos o método contido em {combineReducers}, para juntar os redutores, e garantir que tenhamos uma única fonte de dados, e ainda assim podermos modularizar a aplicação.


```javascript
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  todos,
  visibilityFilter
})
```

##### Observações: 
 - Note que temos como parâmetro dessa função: 
     - Estado:
         -  Esse que deve conter o estado atual da aplicação.
     - Action: 
         - Essa que contém uma string, que identifica uma ação que deve ser executada pelo redutor, caso essa ação exista.
         
- E em cada caso temos a transformação para o novo estado da aplicação, que é retornado para a **store**, criada anteriormente.

###### src/actions/todos.js


```javascript
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
```

###### src/actions/visibilityFilter.js


```javascript
import { VisibilityFilters } from '../actions'

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
```

## Vamos criar os nossos containers:

### Containers são o elo de ligação entre um componente e um estado, usamos o { connect }, para conectar uma estado a uma propriedade.
### O componente **addTodo** é um componente que mistura tanto componente, quanto container, funciona muito bem e é apenas uma decisão de projeto.


###### src/containers/addTodo.js


```javascript
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
```

###### src/containers/FilterLink.js


```javascript
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

```

###### src/containers/FilterLink.js


```javascript
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    case VisibilityFilters.SORT_ITENS:
      return todos.sort( (a , b) =>{
        if( a.text < b.text ){
          return -1
        }else{
          return 1
        }
      })
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

```

### Experimente executar aplicação 
    - npm start
##### Nesse ponto é possível notar que em momento algum os métodos são invocados diretamente.

***

# Refências:

   [1]: https://facebook.github.io/flux/docs/overview
   
   Acesso em: 14, dez. 2019.
   
   [2]: https://redux.js.org/introduction/getting-started
   
   Acesso em: 14, dez. 2019.
   
   [1](https://react-redux.js.org/introduction/quick-start)
   
   Acesso em: 14, dez. 2019.
   
   [4]: https://github.com/reduxjs/redux/tree/master/examples/todos
   
   Acesso em: 14, dez. 2019
