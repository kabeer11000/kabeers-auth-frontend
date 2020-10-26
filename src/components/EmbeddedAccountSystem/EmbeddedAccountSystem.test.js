import React from 'react';
import ReactDOM from 'react-dom';
import EmbeddedAccountSystem from './EmbeddedAccountSystem';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EmbeddedAccountSystem/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
