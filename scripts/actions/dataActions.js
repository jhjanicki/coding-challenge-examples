export const FETCH_DATA_BEGIN   = 'FETCH_DATA_BEGIN';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';


export const fetchDataBegin = (bool) => ({
  type: FETCH_DATA_BEGIN,
  fetchInProgress:bool
})

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  data:data
})

export function fetchData(page,order) {
    return (dispatch) => {
        dispatch(fetchDataBegin(true));
        fetch(`https://jsonplaceholder.typicode.com/photos?_limit=9&_page=${page}&_sort=title&_order=${order}`)
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }
              dispatch(fetchDataBegin(false));
              return response;
          })
          .then(response => response.json())
          .then(response => dispatch(fetchDataSuccess(response)))
    };
}
