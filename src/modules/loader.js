export const SET_OFF = 'loader/SET_OFF';
export const SET_ON = 'loader/SET_ON';


const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OFF:
      return false;

    case SET_ON:
      return true;

    default:
      return state;
  }
}

export const setLoaderOn = () => {
  return dispatch => {
    dispatch({
      type: SET_ON
    });
  }
}

export const setLoaderOff = () => {
    return dispatch => {
      dispatch({
        type: SET_OFF
      });
    }
  }