This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

<hr />

## Note on the following

Below is a table of contents that outlines my notes regarding Redux and React-Redux.

- [Redux](#redux)
  - [Actions](#actions)
  - [Reducers](#reducers)
  - [Store](#store)
- [React Redux](#react-redux)
  - [Intro to React Redux](#intro-to-react-redux)
  - [Extracting Data with mapStateToProps](#extracting-data-with-mapStateToProps)
  - [Dispatching Actions with mapDispatchToProps](#dispatching-actions-with-mapdispatchtoprops)

<hr />

# Redux

## Actions

- Def - Actions send data from your application to your store using `store.dispatch()`
  - Actions are JS objects. They must contain a `type` property

```
const ADD_TODO = 'ADD_TODO'
{
    type: ADD_TODO,
    text: "build redux app'
}
```

### Action Creators

- Def: functions that create actions
- Why are these important? - Action creators are portable and easy to test

```
function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}
```

- To initiate a dispatch, pass the result of the function to `dispatch()`
  - `dispatch(addToDo(text))`
  - `dispatch()` can be accessed from the `store` as `store.dispatch()`

## Reducers

- Def - reducers specify how the application's state changes in response to actions sent to thes tore
  - Actions describe _what_ happens, reducers describe _how_ the action happens
- What is a reducer? - a pure function that takes 2 parameters (previous state, action) and returns the next state
  - for undefined state, we can use ES6 default arguments syntax `state = initialState`

```
const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function todoApp(state = initialState, action) {
    switch(action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {visibilityFilter: action.filter})
        default:
            return state;
    }
}
```

## Store

- Def - The store holds the application state
- There are 3 functions that can be run on store
  - `store.getState()`
  - `store.dispatch(action)`
  - `store.subscribe(listener)`
    - `subscribe(listener)` returns a function which handles the unregistering of listeners

# React Redux

## Intro to React Redux

- What is React Redux? - A UI binding library that bridges the use of Redux w/ the UI layer/framework of React
- What is required to integrate Redux w/ a UI layer
  - Create a Redux store
  - Subscribe to updates
  - Inside the subscription callback
    - Get the current store state
    - extract the data needed by the UI
    - Update the UI w/ the data
  - render the UI w/ initial state if necessary
  - respond to UI inputs by dispatching Redux actions

## Extracting Data with mapStateToProps

- `mapStateToProps` is a function that selects the part of the data from the store that the component needs.
  - it's called every time the store state changes
  - returns an object of data

```
//ownProps param is optional
function mapStateToProps(state, ownProps?)
```

- this function is the first argument passed to `connect`
  - `connect` is called every time the Redux store state changes
  - by passing this function, you subscribe to the store, if you don't want to subscribe to the store, pass `null` to `connect`
- `state` - refers to the entire Redux store state (what is returned by `store.getState()`)
- `ownProps` (optional) - provided if the component needs the data from its own props to retrieve data from the store
- `return` - what is returned from `mapStateToProps`?
  - returns an object that contains the data the component needs

General Info on mapStateToProps

- Should be fast - if it is not fast, this will cause a bottle neck
  - mapping an array of IDs to the corresponding object, filtering arrays are expensive operations
  - to fix this, only run these transformations if the input values have changed
- functions should be pure and synchronous
- the wrapper component will automatically rerender when the data returned has changed

## Dispatching Actions with mapDispatchToProps

- Second argument passed in to `connect`, used to dispatch actions to the store
- The components never access the `store` directly, it is all done through `connect`
- you can let components dispatch actions in two ways
  1. a connected component receives `props.dispatch` and can dispatch actions itself
  2. `connect` can accept an argument `mapDispatchToProps` which lets you create functions that dispatch when called. These functions can be passed as props to a component

### 1. `dispatch` as a prop

- If you use `dispatch` as a prop, do not specify the second argument to `conneect()`

```
connect(mapStateToProps /** no second argument **/) (CounterComponent);
```

- This allows our `CounterComponent` to receive `props.dispatch` which can be used to dispatch actions to the store

```
function Counter( {count, dispatch }) {
  return (
    <div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}> + </button>
      <button onClick={() => dispatch({ type: 'RESET' })}> reset </button>
    </ div>
  )
}
```

### 2. providing a `mapDispatchToProps` parameter

- Why this may be better?
  - this style of coding is more declarative
    - the `button` does not need to know about dispatch
  - you can pass down dispatching logic to unconnected child components

```
// pass toggleToDo to child component
// making ToDo able to dispatch the toggleToDo action
const ToDoList = ({ todos, toggleToDo }) => (
  <div>
    {todos.map( todo => (
      <ToDo toDo={toDo} onClick={toggleToDo} />
    ))}
  </div>
)
```

- `mapDispatchToProps` can be defined in two forms
  1. As a function - allows more customization
  2. As an object - more declarative and easier to use

#### Defining `mapDispatchToProps` as a function

- you can customize the functions that your component receives, and how they dispatch actions
- two parameters
  1. `dispatch`
  2. `ownProps` (optional)
- `return` a plain object

```
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' })
  }
}
```

- you can also forward arguments to action creators

```
const mapDispatchToProps = (dispatch) => {
  return {
    // explicitly forward events
    onClick: event => dispatch(trackClick(event)),

    // implicitly forward events
    onReceiveImpressions: (...impressions) =>
      dispatch(trackImpressions(impressions))
  }
}
```

- You can then call these 'dispatches' as props in your connected component

```
function Counter( {count, increment, decrement, reset }) {
  return (
    <div>
      <button onClick={decrement}> - </button>
      <button onClick={increment}> + </button>
      <button onClick={reset}> reset </button>
    </div>
  )
}
```

#### Defining `mapDispatchToProps` as an Object

- each field of the `mapDispatchtoProps` object is assumed to be an action creator

```
const mapDispatchToProps = {
  increment, decrement, reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
```

is equivalent to

```
const increment = () => ({type: "INCREMENT"});
const decrement = () => ({type: "DECREMENT"});
const reset = () => ({type: "RESET"});

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
```
