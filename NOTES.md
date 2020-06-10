# Redux

- Redux
  - [Actions](#actions)
  - [Reducers](#reducers)
  - [Store](#store)
- React Redux
  - [Intro to React Redux](#intro-to-react-redux)
  - [Extracting Data with mapStateToProps](#extracting-data-with-mapStateToProps)
  - [Dispatching Actions with mapDispatchToProps](#dispatching-actions-with-mapdispatchtoprops)

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
