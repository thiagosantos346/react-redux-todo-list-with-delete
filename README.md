

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
### O exemplo abaixo é uma adaptação de : <https://github.com/reduxjs/redux/tree/master/examples/todos>
***

#### [Três princípios básicos:](https://redux.js.org/introduction/three-principles#three-principles)
##### [Fonte única da verdade](https://redux.js.org/introduction/three-principles#single-source-of-truth)

###### src/index.js
```javascript
import React from 'react'
import { render } from 'react-dom'
```
*Note que é necesssario importar o createStrore do redux*

```javascript
import { createStore } from 'redux'
```
*Note que é nessario importa o Provider do react-redux*
```javascript
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
```

*Para garantir esse princípio, no app de entrada do react construimos esse objeto store, que será responsavel por centralizar os estados da aplicação.*

```javascript
const store = createStore(rootReducer)
```
*Para que os componentes do react, tenham acesso aos estados devemos passar o objeto store para o componente:* ```<Provider </Provider>``` *e adicionarmos o componente:* ```<App/>``` *, interno ao provider, veja o codigo abaixo.*

```javascript
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

    
    - Estado é somente leitura:
    - Alterações são feitas com funções puras:

#### Vamos criar os nossos componentes:
##### Componente prinipal da aplicação: ```<App/>```
Esse componente é responsavel por agrupar nosso componente:  ```<AddTodo/>```   e o ```<VisibleTodoList/>```.

###### src/components/App.js
https://github.com/thiagosantos346/react-redux-todo-list-with-delete/blob/master/todoapp/src/index.js

```javascript
import React from 'react'
import AddTodo from '../containers/AddTodo'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
  </div>
)

export default App
```
##### Componente: ```<Todo/>```
O componente ```<Todo/>``` é um item de uma lista de ```<TodoList/>```.
###### src/components/Todo.js

```javascript
import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text }) => (
<li
```
Em um evento de click, queremos disparar a nossas (actions)[]
```javascript
    onClick={onClick} 
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
##### O nosso: ```<TodoList/>```
Esse componente é uma simples lista de ```<Todo/>``` 
###### src/components/TodoList.js

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { deleteTodo } from '../actions'
import { connect } from 'react-redux'


const TodoList = ({ todos,  dispatch  }) => (
  <ul>
    {todos.map(todo =>
      <div key={todo.id}>
        <Todo
          {...todo}
```
*Ao clicar em um item, a acation* ```deleteTodo()``` *deve ser acionada e criar uma action.
```javascript

          onClick={() => dispatch(deleteTodo(todo.id))}
        />
      </div>
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
}

```
*Para isso funcionar temos que conectar o:* ```<TodoList>``` * a nossa action * ```deleteTodo```.
```javascript
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
  todos
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
