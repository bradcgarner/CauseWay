import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';
import * as actionsUser from '../../actions/user';
import './landing-page.css'
import UserPreview from '../user-preview/user-preview';

export class LandingPage extends Component {
  constructor(props){
    super(props);
    this.state={
      howTo: false
    }
  }
  componentDidMount() {
    this.props.dispatch(actionsDisplay.changeDisplay('landingPage'));
  }

  toggleHowToUse() {
    this.setState({howTo: !this.state.howTo})
  }

  render() {
    const previews = Array.isArray(this.props.usersList) ?
      this.props.usersList.map((user, key) => {
        if (user.userType === 'organization') {
          return <UserPreview user={user} key={key} history={this.props.history} showDetail={false}/>
        } else {
          return null;
        }
      }) : null ;

    const howTo = !this.state.howTo ? null :
      <div className='appDescription'>
        <ul>
          <li><span className='liEmphasis'>Sign Up</span> : Click 'sign up' at the bottom of the screen, or use this <span className='sampleAccountLink' onClick={()=>this.props.dispatch(actionsUser.login({username:'sampleuser2', password:'sampleuser2'}))}>sample account</span> for a test drive.</li>
          <li><span className='liEmphasis'>See Who's Here</span> : After signing in, look for 'organizations' or 'contributors' at the bottom of the screen.</li>
          <li><span className='liEmphasis'>See How You Can Contribute</span> : After signing in, look for a briefcase 'opportunities' icon at the top left of screen to see all the ways you can get involved.</li>
          <li><span className='liEmphasis'>Lend A Hand!</span> Click the red 'sign up' button on any opportunity. You can also send a note or question to the host.</li>
          <li><span className='liEmphasis'>Get Involved!</span> If you are hosting a charitable event, post it here. Or if you want to give back tot he community - say tutoring, or delivering meals - post your availability for things like that too!</li>
        </ul>
      </div>

    return (
      <div className='landingPage mainColumn'>
        <h1 className='siteName'>CauseWay</h1>
        <div className='descriptionContainer'>
          <p className='appDescription'>
          Welcome! CauseWay connects volunteers and charitable organizations.
          </p>
          <button onClick={()=>this.toggleHowToUse()}className='addOpportunityButton'>How To Use CauseWay</button>
          {howTo}
        </div>
        <div className='previewCardListContainer'>
          <h2>Organizations Using CauseWay</h2>
          {previews}
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  usersList: state.usersList.main,
  display: state.display.view
})
export default connect(mapStateToProps)(LandingPage)