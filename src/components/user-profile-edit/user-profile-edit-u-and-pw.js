import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css'

import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';
import UandPwFields from '../fields/u-and-pw';

export class UserEditUandPwForm extends Component {
  
  handleSubmitButton(user) {
    if(user.username === 'sampleuser') {
      this.props.dispatch(actionsDisplay.toggleModal('sorry, but we need to keep sampleuser\'s username and password as-is'));
      return;
    }
    const isNew = false;
    this.props.dispatch(actionsUser.createOrEditUser(user, this.props.initialValues.authToken, isNew))
    .then(() => {
      this.props.history.push(`/profiles/${this.props.initialValues.id}`);
      this.props.dispatch(actionsDisplay.changeDisplay('selfProfile'));
    })
  }

  render() {
    
    return (
      <form className='previewCard spacedForm'
        onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}>
        
        <UandPwFields confirm={true}/>

        <div className='previewBottomBar'>
          <button className='clearFormButton wideButton'
            type="button" disabled={this.props.pristine || this.props.submitting} 
            onClick={this.props.reset}>Reset Form
          </button>
          <button className='submitButton wideButton'
            type="submit" disabled={this.props.pristine || this.props.submitting}>Save
          </button>

        </div>
      </form>
    );
  }
}


export const mapStateToProps = state => ({
  initialValues: state.user,
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'userEditUandPw' })
)(UserEditUandPwForm);