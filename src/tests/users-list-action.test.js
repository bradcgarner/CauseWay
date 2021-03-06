import * as actionsUsersList from '../actions/users-list';
import * as actionsDisplay from '../actions/display';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
// console.log('mockStore1',mockStore());

// Initialize mockstore with empty state
const initialState = {}
const store = mockStore(initialState)

describe('actions - list of users', () => {

  let cumulativeActions = 0;
  
  const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    });
  };

  it('should create an action: array of users', () => {
    const arrayOfUsers = [
      {
        id: 1,
        username: '',
        userType: '',  
        firstName: '',
        lastName: '',
        organization: 'Coffee for the Future',
        locationCity: 'Birmingham',
        locationState: 'AL',
        locationCountry: 'USA',
        bio: 'We work to ensure the world never runs out of caffeine',
        links: [
          {
            linkType: 'home',
            linkURL: 'http://pouranothercup.org',
          },
          {
            linkType: 'financial',
            linkURL: 'http://pouranothercup.org/donations',
          }
        ],
        causes: ['hunger'],    
        skills: [''],  
        opportunities: [
          {
            id: 2,
            idUser: 1,
            opportunityType: 'services',
            offer: false,
            title: 'Buzz Me 2018',
            narrative: 'Annual event to do some highly caffeinated things!',
            timestampStart: '2018-01-13 01:00:00',
            timestampEnd: '2018-01-23 01:00:00',
            locationCity: 'Boulder',
            locationState: 'CO',
            locationCountry: 'USA',
            link: 'http://www.buzzme.org/2018',
            causes: ['hunger', 'peace'],          
          },
          {
            id: 3,
            idUser: 1,
            opportunityType: 'financial',
            offer: false,
            title: 'Buzz Me 2018 Fund Drive',
            narrative: 'Raising money for coffee plant research',
            timestampStart: '2018-01-13 01:00:00',
            timestampEnd: '2018-01-23 01:00:00',
            locationCity: 'Everywhere',
            locationState: undefined,
            locationCountry: undefined,
            link: 'http://www.buzzme.org/2018/funds',
            causes: ['hunger', 'research'],          
          }
        ]
      },
      {
        id: 1,
        organization: 'The Literary Project',
        locationCity: 'San Diego',
        locationState: 'CA',
        locationCountry: 'USA',
        bio: 'We help improve the literacy of individuals and communities',
        links: [
          {
            linkType: 'home',
            linkURL: 'http://tlp-reads.org',
          }
        ],
        causes: ['education'],      
        opportunities: []
      }
    ];
    const expectedAction = {
      type: actionsUsersList.LOAD_USERS_LIST,
      main: arrayOfUsers
    };
    const result = actionsUsersList.loadUsersList(arrayOfUsers);
    expect(result).toEqual(expectedAction)
    expect(result.main.length).toBe(2)
    expect(result.main[0].id).toBe(1)
  });

  it('should fetch user list from server', () => {
    cumulativeActions += 2;

    const expectedResponse = {}; // this will be the response of the mock call
    const searchCriteria = {}; // doesn't matter for testing
    const authToken = '';

    // cannot find docs on window.fetch. Does this intercept fetch in "this" window?
    // i.e. when actions.fetchUsersList is called, does this intercept, because it is in the same "window"? 
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));

    // console.log('store',store);
      
    return store.dispatch(actionsUsersList.fetchUsersList(searchCriteria, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsUsersList.LOAD_USERS_LIST, main: {} }
        );
      })
  });

  it('should fail to to fetch user list from server', () => {
    cumulativeActions += 2;
    const expectedResponse = {error: 'error'}; // this will be the response of the mock call
    const searchCriteria = {}; // doesn't matter for testing
    const authToken = '';

    // cannot find docs on window.fetch. Does this intercept fetch in "this" window?
    // i.e. when actions.fetchUsersList is called, does this intercept, because it is in the same "window"? 
    window.fetch = jest.fn().mockImplementation(() =>
    Promise.reject(mockResponse(500, 'ERROR', JSON.stringify(expectedResponse))));

    // console.log('store',store);
      
    return store.dispatch(actionsUsersList.fetchUsersList(searchCriteria, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsDisplay.TOGGLE_MODAL, message: expectedResponse.error},
        );
      })
  });
  
})