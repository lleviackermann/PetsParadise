import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("renders button with correct text", () => {
  render(<Button label="Click me" />);
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();
});
