import * as actions from '../actions/display'
import {display as initialState} from './potential-states'

// right now we have 1 'main' list of users; we can have as many lists as we want, each following identical format
// if we add lists, each one should have an action and reducer; each one can populate 1 key, like "main" does

export const reducer = (state = initialState, action) => {
  
  if (action.type === actions.CHANGE_DISPLAY) {
    return {...state, view: action.view};
  }

  if (action.type === actions.CHANGE_DISPLAY_STATUS) {
    return {...state, status: action.status};
  }

  if (action.type === actions.TOGGLE_MODAL) {
    let modalMessage = 'Sorry, something went wrong';
    if (typeof action.modalMessage === 'string' ) {
      modalMessage = action.modalMessage;
    } else if (typeof action.modalMessage === 'object' && action.modalMessage !== null) {
      if (action.modalMessage.toString()) {
        modalMessage = action.modalMessage.toString();
      }
    } 
    return {...state, modal: !state.modal, modalMessage };
  }

  if (action.type === actions.SET_USER) {
    return {...state, idUser: action.idUser };
  }

  if (action.type === actions.TOGGLE_OPPORTUNITY) {
    const idOpportunity = state.idOpportunity === action.idOpportunity ? null : action.idOpportunity ;
    return {...state, idOpportunity, idResponse: action.idResponse };
  }
  
  if (action.type === actions.SET_OPPORTUNITY) {
    const idOpportunity = action.idOpportunity ;
    return {...state, idOpportunity, idResponse: action.idResponse };
  }
  
  if (action.type === actions.TOGGLE_ROLE) {
    const idRole = state.idRole === action.idRole ? null : action.idRole ;
    const roleIdUser = state.roleIdUser === action.roleIdUser ? null : action.roleIdUser ;
    return {...state, idRole, roleIdUser };
  }

  if (action.type === actions.SAVE_LATEST_ROLE) {
    return {...state, latestRole: action.latestRole };
  }

  if (action.type === actions.TOGGLE_RESPONSE) {
    const idResponse = action.idResponse === state.idResponse ? null : action.idResponse;
    return {...state, idResponse };
  }

  if (action.type === actions.SAVE_LATEST_RESPONSE) {
    return {...state, latestResponse: action.latestResponse };
  }

  return state;

}