import React from 'react';
import { shallow } from 'enzyme';

import { RegisterPage } from './register-page';

describe.skip('Core display functionality of RegisterPage', () => {
  it('Smoke test - component should render', () => {
    shallow(<RegisterPage />);
  });
});