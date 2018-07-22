import { combineReducers } from 'redux'
import books from './books'
import loader from './loader'

export default combineReducers({
  booksMainObj: books,
  loader
})