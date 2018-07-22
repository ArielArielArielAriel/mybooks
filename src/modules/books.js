import { getCorsAnywhereUrl, getDelayedPromise } from '../containers/app/common/Utils'
import { setLoaderOff } from './loader'

export const SET_BOOK_LIST = 'books/SET_BOOK_LIST';
export const SET_BOOK_NAMES = 'books/SET_BOOK_NAMES';
export const EDIT_BOOK = 'books/EDIT_BOOK';
export const ADD_BOOK = 'books/ADD_BOOK';
export const REMOVE_BOOK = 'books/REMVOE_BOOK';

const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);

const initialState = {
  booksHashTable: {}, // hash table instead of array for better performance
  namesHashTable: {}
  /*
    book names hash table will be stored here (key: book title, value: book id)
    That's how I will be able to check whether a book title already exist in O(1)
    Of course, in a real world app I whould call an API to check it out.
    But for now - it's good enough.
  */
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK_LIST:
      return {
        ...state,
        booksHashTable: action.books
      };

    case SET_BOOK_NAMES:
      return {
        ...state,
        namesHashTable: action.names
      };
    case EDIT_BOOK:
    case ADD_BOOK:

      return {
        ...state,
        booksHashTable: {
          ...state.booksHashTable,
          [action.book.id]: action.book
        }
      };

    case REMOVE_BOOK:
      return {
        ...state,
        booksHashTable:

          Object.keys(state.booksHashTable)
            .filter(key => key !== action.id)
            .reduce((obj, key) => {
              obj[key] = state.booksHashTable[key];
              return obj;
            }, {})
      };
    default:
      return state;
  }
}

export const setBookList = (books) => {
  return dispatch => {
    
    dispatch({
      type: SET_BOOK_LIST,
      books: books.reduce((map, obj) => { map[obj.id] = obj; return map; }, {})
    });
  }
}


const editBookPrivate = (book) => {
  return dispatch => {
    dispatch({
      type: EDIT_BOOK,
      book
    });
  }
}

export const editBook = (book) => {
  return (dispatch, getState) => {

    dispatch(editBookPrivate(book));
    return delay(0).then(() => {
      dispatch(setBookNames())
    });
  };
}


const addBookPrivate = (book) => {
  return dispatch => {
    dispatch({
      type: ADD_BOOK,
      book
    });
  }
}

export const addBook = (book) => {
  return (dispatch, getState) => {
    dispatch(addBookPrivate(book));
    return delay(0).then(() => {
      dispatch(setBookNames())
    });
  };
}

export const removeBook = (id) => {
  return dispatch => {
    dispatch({
      type: REMOVE_BOOK,
      id
    });
  }
}

export const getBookList = () => {
  return (dispatch, getState) => {

    const targetUrl = 'https://dev-api.com/ariel/books';

    fetch(getCorsAnywhereUrl(targetUrl), {
      headers: {
        'Origin': 'x-requested-with',
      }
    }).then(res => res.json())
      .then(
        (result) => {
          
          dispatch(setBookList(result.books));
          dispatch(setLoaderOff());
          return delay(0).then(() => {
            dispatch(setBookNames())
          });
        },

        (error) => {
          //TODO: handle error
          dispatch(setLoaderOff());
        }
      )
  };
}


export const setBookNames = () => {
  return (dispatch, getState) => {

    const { booksMainObj } = getState();
    const { booksHashTable } = booksMainObj;

    let bookNamesObj = {};
    Object.keys(booksHashTable).map(function (key, index) {
      bookNamesObj[booksHashTable[key].bookTitle] = booksHashTable[key].id;
    });

    dispatch({
      type: SET_BOOK_NAMES,
      names: bookNamesObj
    });
  };
}