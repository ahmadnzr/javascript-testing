import React from "react";
import { render, screen } from "@testing-library/react";
import SimpleForm from "./SimpleForm";
import userEvent from "@testing-library/user-event";

test("should success submit form and show fullname", () => {
  render(<SimpleForm />);
  const button = screen.getByRole("button", { name: /submit/i });
  expect(button).toBeDisabled();
  const firstname = screen.getByRole("textbox", { name: /first name/i });
  const lastname = screen.getByRole("textbox", { name: /last name/i });

  userEvent.type(firstname, 'nizar')
  expect(firstname).toHaveValue('nizar')
  userEvent.type(lastname, 'dia')
  expect(lastname).toHaveValue('dia')

  expect(button).toBeEnabled()

  userEvent.click(button)

  const message = screen.getByRole('heading', {name: /hello/i})
  expect(message).toHaveTextContent('hello, nizar dia')
});
