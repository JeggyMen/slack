import { render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import App from './App';

test('renders App.js', () => {
  render(<App />);
});

test("snapshot test for App.js", () => {
  const counter = renderer.create(<App />).toJSON();
  expect(counter).toMatchSnapshot();
});
