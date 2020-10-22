import React from 'react';
import ReactDOM from 'react-dom';
import PermessionsScreen from './PermessionsScreen';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PermessionsScreen/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
