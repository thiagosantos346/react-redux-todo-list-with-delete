# Comunicação indireta com React-Redux

- Estamos interessado em um paradigma de comunicação específico, comunicação indireta, que dá suporte para aplicativos e serviços.
A essência da comunicação indireta é se comunicar por meio de um intermediário e, assim, não ter qualquer acoplamento direto entre remetente e um ou mais destinatários.

- Acoplamento  diz respeito de interdependência, isto, é, para uma entidade existir, uma outra entidade também deve existir, e vice versa. Buscamos construir sistemas com o mínimo possível interdependências, para que esses possam funcionar independentemente da existência do outro.

- No livro “Padrões de Projeto, Soluções reutilizáveis de software orientado a objetos.” de Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides, é discutidos várias soluções para problemas de acoplamento de softwares orientados a objetos, um deles muito importante para o nosso contexto é o Padrão Observer (274), que trata dependências entre comportamentos e estados de um objeto, através da notificação de observadores de que o estado de um objeto, foi alterado.

- Baseado no conceitos de dependência um-para-muitos entre objetos, podemos pensar em uma interface gráfica com várias representações de um estado de um objetos, podemos pensar em um editor de texto, podemos pensar em um gráfico baseado em uma tabela de dados numéricos, poderíamos gerar n gráficos diferentes usando mesmo conjunto de dados, e que ao alterarmos essa tabela ambos os n gráficos  tivessem que ser atualizados.

- Assim para resolver esse problema poderíamos transformar os objetos que representam os gráficos em observadores do estado de um outro objeto concreto, assim teríamos n visões distintas de um único conjunto dados, mas para isso precisaríamos de um objeto intermediário, onde os observadores precisam estar inscritos para receberem as mudanças do objeto observado, esse objeto intermediário seria responsável por notificará a todos, toda vez que o estado do objeto observado fosse alterado.

- Aqui entra o conceito de indireção, ao invés de mandarmos diretamente as mudanças para os objetos que precisam refletir os estados de um objeto concreto, como uma uma tabela para geração de gráficos, para um objeto que aceita inscrições, e que notifica a todos os inscritos quando ocorre a mudança de um objeto observado por ele.
Uma das aplicações que mais fazem uso desse tipo de padrão, são interfaces gráficas, pois com essa técnica é possível separar a parte lógica de uma aplicação da sua parte de visualização, isto é, poder desconectar o back-end da aplicação do front-end, isso é excepcional, pois agora se por exemplo o back-end venha a falhar, ou se for remoto e ficar off-line, a aplicação não deve perder seus estado nem seu funcionamento.

- Frameworks de desenvolvimento front-end  Web, adotaram esse modelo diretamente na representação dos estados dos componentes da aplicação, muito embora seja possível fazer o mesmo sem o uso dessas ferramentas, implementando o pattern Observer (274), citado acima.
o Facebook criou uma arquitetura para o ReactJs, que é um framework desenvolvido e mantido pela empresa, e que é baseado em javascript, o Flux, introduz um conceito de fluxo unidirecional de dados, onde  um objeto é responsável por recuperar o dados de lojas, algo como repositório central de dados, e transmitir essa mudança aos seus filhos, algo como um intermediário aos observadores, o Padrão flux tem quatro elementos centrais, dos quais o expedidor, lojas e visualizações são nós independentes. 

- Ações:
    - São objetos simples que contém: 
    - Um identificador.
    - Novos dados.
    - Aciona um despacho específico no Expedidor, com uma nova carga útil de dados, como se fosse um destinatário e uma encomenda.

- Expedidor
    - Todos os dados fluem para o expedidor.
    - Centraliza todos os dados.
    - Gerencia o fluxo de dados da aplicação.
    - Recebe ações de um método criador de ações, que podem ou não originar de usuários.
    - Dispara funções de retornos de lojas registradas no expeditor.

 - Lojas:
    - Respondem a quaisquer ações que sejam relevantes para os estados que mantêm.
    - Emitem um eventos para que as visualizações mudem os seus estados.
    - Contém estados e lógica da aplicação.
    - Model do MVC.
    - Porém voltadas a um domínio específico de uma aplicação.

- Visualizações:
    - Podem fazer com que novas ações sejam propagadas, pela interação de usuários.
    - Escutam eventos de mudança de estados que vem de um manipulador de eventos(lojas).
    - Tem seus próprios definidor de estados, para alterar os dados que estão refletindo.
    - O React faz o papel de visão da aplicação com os seus métodos próprios, setState(), forceUpdate(), desencadeando o método render(), para atualizar os objetos renderizados pelo navegador.
    - Usa os métodos públicos nas lojas para obtenção dos novos dados.

- O redux é uma implementação desse padrão e não é exclusiva ao ReactJs, é aplicável a várias outras aplicações em JavaScript, como Veuex para Veu.js, NgRx Angula .js, dentre outros. E basicamente abstrai partes do processo do Flux, e carrega otimizações na implementação do Flux.

- Introduz três princípios básicos:
    - Fonte única da verdade:
        - O estado de todo o aplicativo é armazenado em uma árvore de objetos com um único armazenamento.
    - Estado é somente leitura:
        - A única maneira de mudar o estado é emitir uma ação, e um  objeto que descreve o que mudou.
    - Alterações são feitas com funções puras:
        - Para especificar como árvore de estados é transformada por ações, entenda isso como redutores puros.
        - Redutores calcula o novo estado com base no estado anterior, esse é um conceito fundamental de programação funcional.


# Todo List - React-Redux

## Criando a aplicação ReactJs

- Primeiro certifique-se que você tenha o Node.js instalado em sua máquina, abra um terminal e execute o comando:

    - node --version

- Se retornar um erro tente fazer a instalação seguindo as recomendações da página oficial do node em https://nodejs.org/.
 
- Primeiro vamos criar uma aplicação React npx create-react-app [Nome-Aplicação]:
    - npx create-react-app todoapp
- Agora usando o terminal entre na pasta que contém o nome da aplicação feita no passo anterior.
    - cd todoapp [Linux]
    - dir todoapp [Windows]
- Agora vamos iniciar a aplicação para testar se ocorreu tudo bem.
    - npm start

## Instalando a biblioteca Redux
    - npm install --save redux

# Cirando a nova estrutura:

#### Nesse momento deve existir essa estrutura de pastas:

```
todoapp
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```
    
#### Remova alguns arquivos para que chegue a essa é a nova estrutura:

```
todoapp
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── index.html
│   └── manifest.json
└── src
    ├── index.js
    └── serviceWorker.js
```


#### Adicione alguns arquivos, para que você tenha essa estrutura de arquivos.

```
todoapp
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── index.html
│   └── manifest.json
└── src
    ├── actions
    │   └── index.js
    └─ components
    │   ├──App.js
    │   ├── Footer.js
    │   ├── Link.js
    │   ├── Todo.js
    │   ├── TodoDeleteButton.js
    │   └── TodoList.js
    ├── containers
    │    ├── AddTodo.js
    │    ├── FilterLink.js
    │     └── VisibleTodo.js
    │    
    ├── reducers
    │    ├── index.js
    │    ├── todo.js
    │    └── visibilityFilter.js
    ├── index.js
    └── serviceWorker.js
```


## Agora vamos criar o nosso ponto de entrada da aplicação:

### Nesse ponto vamos, criar a nossa loja central, que contém todos os estados da aplicação.
### O exemplo abaixo é uma adaptação de : <https://github.com/reduxjs/redux/tree/master/examples/todos>
###### src/index.js


```javascript
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

//Todos os objetos vão ter como origem esse objeto.
const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

## Vamos criar os nossos componentes:

###### src/components/App.js


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

# Refências:

```
    - Erich Gamma ... [et al.], Padrões de projeto : soluções reutilizáveis de software orientado a objetos. tradução Luiz A. Meirelles Salgado. – Dados eletrônicos. – Porto Alegre : Bookman, 2007.
    - George Coulouris ... [et al.], Sistemas distribuídos : conceitos e projeto, radução: João Eduardo Nóbrega Tortello ; revisão técnica: Alexandre Carissimi. – 5. ed. – Porto Alegre : Bookman, 2013.
    - Flux Overview, 05, jul. 2019. Disponível em: <https://facebook.github.io/flux/docs/overview>. Acesso em: 14, dez. 2019.
    - Getting Started with Redux, 02, dez. 2019. Disponível em: <https://redux.js.org/introduction/getting-started>. Acesso em: 14, dez. 2019.
    - Quick Start, 22, jun. 2019. Disponível em: <https://react-redux.js.org/introduction/quick-start>. Acesso em: 14, dez. 2019.
    - Redux Todos Example, 23 abr. 2019. Disponível em: <https://github.com/reduxjs/redux/tree/master/examples/todos>. Acesso em: 14, dez. 2019.
 ```
