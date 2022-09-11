import { createStore } from 'redux'
const Store = createStore((state = {
    userData: {},
    supportedServers: []
}, action) => {
    if (action.type == "change-data") {
        return { ...state, [action.name]: action.value }
    } else {
        return state
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default Store
