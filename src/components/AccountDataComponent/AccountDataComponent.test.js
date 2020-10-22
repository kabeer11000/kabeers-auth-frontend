import React from 'react';
import ReactDOM from 'react-dom';
import AccountDataComponent from './AccountDataComponent';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AccountDataComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
