import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Multiselect from 'react-widgets/lib/Multiselect'

export class CausesFields extends Component {

  render() {

    const renderMultiselect = ({ input, data, valueField, textField }) =>
    <Multiselect {...input}
      onBlur={() => input.onBlur()}
      value={input.value || []} // requires value to be an array
      data={data}
      valueField={valueField}
      textField={textField} />

    return (
      <div className='labelInputPair'>
        <label 
          className='inputLabel' 
          htmlFor={'causes'}>Causes
        </label>
        <Field
          name='causes'
          id='causes'
          component={renderMultiselect}
          data={this.props.general.causes}
          className='inputField'/>              
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  general: state.general
})
export default connect(mapStateToProps)(CausesFields);