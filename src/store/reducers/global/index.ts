import produce from 'immer';
import * as actions from './actionTypes';

export interface globalState {
  messageError: string;
  messageSuccess: string;
  messageSubError: string;
  isLoading: boolean;
}

const initial: globalState = {
  messageError: '',
  messageSubError: '',
  messageSuccess: '',
  isLoading: false,
};

export const globalReducer = (state = initial, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case actions.SET_LOADING_PAGE:
        draft.isLoading = action.payload;
        break;
      case actions.SET_MESSAGE_ERROR:
        draft.messageError = action.payload;
        break;
      case actions.SET_MESSAGE_SUB_ERROR:
        draft.messageSubError = action.payload;
        break;
      case actions.SET_MESSAGE_SUCCESS:
        draft.messageSuccess = action.payload;
        break;
      default: return draft
    }
  });

const exports = {
  globalReducer
}
export default exports
