import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('renders element correctly', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('wrapper')).toHaveTextContent('Hello, Istamal!');
});

test('matches snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
