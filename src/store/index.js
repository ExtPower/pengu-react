import { createStore } from 'redux'
import { combineReducers } from 'redux'
const socket = ((state = {}, action) => {
    if (action.type == "change-data" && action.name == "socket") {
        return action.value
    } else {
        return state
    }

})
const userData = ((state = { user_id: null }, action) => {
    if (action.type == "change-data" && action.name == "userData") {
        return action.value
    } else {
        return state
    }

})
// const tasksChanges = ((state = [], action) => {
//     if (action.type == "change-data" && action.name == "tasksChanges") {
//         return action.value
//     } else {
//         return state
//     }

// })

const supportedServers = ((state = [], action) => {
    if (action.type == "change-data" && action.name == "supportedServers") {
        return action.value
    } else {
        return state
    }

})

const Store = createStore(combineReducers({
    userData,
    supportedServers,
    socket,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default Store
