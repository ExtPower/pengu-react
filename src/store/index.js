import { createStore } from 'redux'
const Store = createStore((state = {
    userData: {},
    supportedServers: [],
    newTask_twitter: {},
    newTask_discord: {},
    newTask_opensea: {}
}, action) => {
    if (action.type == "change-data") {
        return { ...state, [action.name]: action.value }
    } else {
        return state
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default Store
