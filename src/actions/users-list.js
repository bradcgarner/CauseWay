import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import  * as actionsDisplay from './display';
import * as ck from './api-response-checks';

// right now we have 1 'main' list of users; we can have as many lists as we want, each following identical format
export const LOAD_USERS_LIST = 'LOAD_USERS_LIST';
export const loadUsersList = (array) => ({
  type: LOAD_USERS_LIST,
  main: array
});

export const SUBTRACT_FROM_USERS_LIST = 'SUBTRACT_FROM_USERS_LIST';
export const subtractFromUsersList = (id) => ({
  type: SUBTRACT_FROM_USERS_LIST,
  id
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchUsersList = (query, authToken, excludedIds) => dispatch => {
  
  dispatch(actionsDisplay.changeDisplayStatus('loading'));

  const url = new URL(`${REACT_APP_BASE_URL}/api/users`);
  Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
  
  const headers = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${authToken}`, 
  }; 

  const init = { 
    method: 'GET',
    headers,
  };
  return fetch(url, init)    
    .then(res=>{
      return res.json();
    })
    .then(usersList=>{
      console.log('usersList',usersList)
      ck.compareObjects(ck.getUsersListRes, usersList );
      const updatedUsersList = excludedIds ? usersList.filter(user=> !excludedIds.includes(user.id)) : usersList ;
      dispatch(actionsDisplay.changeDisplayStatus('normal'));
      return dispatch(loadUsersList(updatedUsersList));      
    })
    .catch(error => {
      dispatch(actionsDisplay.changeDisplayStatus('normal'));
      return dispatch(actionsDisplay.toggleModal(error));
    })
}
