export const SET_LOADING_PAGE: string = 'SET_LOADING_PAGE';
export const SET_MESSAGE_ERROR: string = 'SET_MESSAGE_ERROR';
export const SET_MESSAGE_SUCCESS: string = 'SET_MESSAGE_SUCCESS';
export const SET_MESSAGE_SUB_ERROR: string = 'SET_MESSAGE_SUB_ERROR';

export const setLoadingPage = (loading: boolean) => {
  return {
    type: SET_LOADING_PAGE,
    payload: loading
  }
}

export const setMessageError = (e: any) => {
  return {
    type: SET_MESSAGE_ERROR,
    payload: e?.message || e || 'Unknown error'
  }
}

export const setMessageSubError = (e: string) => {
  return {
    type: SET_MESSAGE_SUB_ERROR,
    payload: e
  }
}

export const setMessageSuccess = (mess: string) => {
  return {
    type: SET_MESSAGE_SUCCESS,
    payload: mess
  }
}