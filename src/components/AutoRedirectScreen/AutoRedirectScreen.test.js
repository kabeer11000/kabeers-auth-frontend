import React from 'react';
import ReactDOM from 'react-dom';
import AutoRedirectScreen from './AutoRedirectScreen';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AutoRedirectScreen/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
