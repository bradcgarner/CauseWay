import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import DropdownList from 'react-widgets/lib/DropdownList'

export class LocationFields extends Component {

  render() {

    const renderDropdownList = ({ input, data, valueField, textField }) =>
      <DropdownList {...input}
        data={data}
        // valueField={valueField}
        // textField={textField}
        onChange={input.onChange} />

    return (
      <div>
        <div className='labelInputPair'>
          <label
            className='inputLabel'
            htmlFor={'locationCity'}>Location
          </label>
          <Field
            name='locationCity'
            id='locationCity'
            component='input'
            placeholder='city'
            type='text'
            className='inputField locationCity' />
          <label
            className='hidden'
            htmlFor={'locationState'}>State
          </label>
          <Field
            name='locationState'
            id='locationState'
            component={renderDropdownList}
            data={this.props.general.states}
            className='inputField' />
          <label
            className='hidden'
            htmlFor={'locationCountry'}>Country
          </label>
          <Field
            name='locationCountry'
            id='locationCountry'
            component={renderDropdownList}
            data={this.props.general.countries}
            className='inputField' />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  general: state.general
})
export default connect(mapStateToProps)(LocationFields);