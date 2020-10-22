import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './AppComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppComponent/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
