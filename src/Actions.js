export function fetchJSON() {
  return dispatch => {
    dispatch(fetchOutlineBegin());
    return fetch("https://api.myjson.com/bins/1bgk9a")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchOutlineSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchOutlineFailure(error)));
  };
}

export const CHAPTER_SELECTED = 'CHAPTER_SELECTED';

export const selectChapter = idx => ({
  type: CHAPTER_SELECTED,
  payload: {selected: idx}
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_OUTLINE_BEGIN   = 'FETCH_OUTLINE_BEGIN';
export const FETCH_OUTLINE_SUCCESS = 'FETCH_OUTLINE_SUCCESS';
export const FETCH_OUTLINE_FAILURE = 'FETCH_OUTLINE_FAILURE';

export const fetchOutlineBegin = () => ({
  type: FETCH_OUTLINE_BEGIN
});

export const fetchOutlineSuccess = course => ({
  type: FETCH_OUTLINE_SUCCESS,
  payload: { course }
});

export const fetchOutlineFailure = error => ({
  type: FETCH_OUTLINE_FAILURE,
  payload: { error }
});

