import React from 'react';
import ReactDOM from 'react-dom';
import DeviceVerifiyComponent from './DeviceVerifiyComponent';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DeviceVerifiyComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
