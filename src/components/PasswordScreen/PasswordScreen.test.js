import React from 'react';
import ReactDOM from 'react-dom';
import PasswordScreen from './PasswordScreen';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PasswordScreen/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
