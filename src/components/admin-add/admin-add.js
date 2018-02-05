import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actionsUsersList from '../../actions/users-list';
import * as actionsDisplay from '../../actions/display';

export class AdminAdd extends Component {

  searchUsers(formValues) {
    const existingAdmins = [];
    for (let prop in this.props.userInState.admins) {
      existingAdmins.push(prop);
    }
    const excludedIds = [this.props.userInState.id, ...existingAdmins];
    this.props.dispatch(actionsUsersList.fetchUsersList(formValues, this.props.userInState.authToken, excludedIds))
    .then(()=>{
      this.props.dispatch(actionsDisplay.changeDisplay('addAdmin')) // using store as affects parent component
      window.scrollTo(0,this.state.searchBoxY -40)
    })
  }

  getCoords(event){
    this.setState({searchBoxY: event.target.offsetTop})
  }

  render() {

    return (
      <form className='addAdminSearchBar'
        onSubmit={this.props.handleSubmit(formValues => this.searchUsers(formValues))} >
        <label
          className='inputLabel'
          htmlFor={'user'}>add a site admin
        </label>
        <Field
          name='user'
          id='user'
          component='input'
          type='text'
          placeholder='first and/or last name'
          className='adminInputField inputField'
          onChange={event=>this.getCoords(event)} />
        <button className='submitButton'
           type="submit" disabled={this.props.pristine || this.props.submitting}>search users
        </button>
      </form>
    );
  }
}

export const mapStateToProps = state => ({
  userInState: state.user
})

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'adminAdd' })
)(AdminAdd);
