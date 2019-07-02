import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { crimeReducer } from './reducers/crime-reducer';



const enhancer = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const allReducers = combineReducers({
    crimes: crimeReducer
})

export const store = createStore(allReducers, {}, enhancer)
