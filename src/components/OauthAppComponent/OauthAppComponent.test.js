import React from 'react';
import ReactDOM from 'react-dom';
import OauthAppComponent from './OauthAppComponent';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OauthAppComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
