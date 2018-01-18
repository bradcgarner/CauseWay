import * as actions from '../actions/user'
import {user as initialState} from './potential-states'
// import deepAssign from 'deep-assign';

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing YOUR OWN profile
export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_USER) {
    const displayName = action.userType === 'organization' ? action.organization :`${action.firstName} ${action.lastName}`;

    return {...state, 
      id: action.id,
      username: action.username,
      userType: action.userType,
      firstName: action.firstName,
      lastName: action.lastName,
      organization: action.organization,
      displayName,
      logo: action.logo,
      locationCity: action.locationCity,
      locationState: action.locationState,
      locationCountry: action.locationCountry,
      availability: action.availability,
      bio: action.bio,
      authToken: action.authToken,
      links: action.links,
      causes: action.causes,
      skills: action.skills,
      adminOf: action.adminOf, 
      admins: action.admins,
      following: action.following,
      opportunities: action.opportunities,
      responses: action.responses,
    };
  }

  if (action.type === actions.UPDATE_USER) {
    const displayName = action.userType === 'organization' ? action.organization :`${action.firstName} ${action.lastName}`;

    return {...state, 
      id: action.id,
      username: action.username,
      userType: action.userType,
      firstName: action.firstName,
      lastName: action.lastName,
      organization: action.organization,
      displayName,
      logo: action.logo,
      locationCity: action.locationCity,
      locationState: action.locationState,
      locationCountry: action.locationCountry,
      availability: action.availability,
      bio: action.bio,
      authToken: action.authToken,
      links: action.links,
      causes: action.causes,
      skills: action.skills,
    };
  }

  if (action.type === actions.LOGOUT) {
    return {...state, user: {} };
  }
  if (action.type === actions.LOAD_RESPONSE) {
    const newResponses = {...state.responses, [action.response.idOpportunity]: action.response};
    return {...state, responses: newResponses };
  }

  if (action.type === actions.LOAD_ADMIN) {
    const newAdmins = {...state.admins, [action.admin.idUserReceiving]: action.admin}
    return {...state, admins: newAdmins };
  }

  if (action.type === actions.LOAD_USER_OPPORTUNITY) {
    const newOpps = {...state.opportunities, [action.opportunity.id]: action.opportunity}
    return {...state, opportunities: newOpps };
  }

  if (action.type === actions.LOAD_FOLLOWING) {
    const newFollowing = {...state.following, [action.following.idUserReceiving]: action.following}
    return {...state, following: newFollowing };
  }

  // if (action.type === actions.SET_FORM_TYPE) {
  //   return {...state, formType: action.formType};
  // }
  
  return state;


}