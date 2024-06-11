import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import ChatWindow from "./ChatWindow";

test("render the ChatWindowqq component", () => {
    render(<ChatWindow />);
});

test("snapshot test for ChatWindow", () => {
    const counter = renderer.create(<ChatWindow />).toJSON();
    expect(counter).toMatchSnapshot();
});
