import React from 'react';
import ReactDOM from 'react-dom';
import SignUpScreen from './SignUpScreen';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignUpScreen/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
