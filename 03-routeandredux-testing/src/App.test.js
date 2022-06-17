import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, render, screen } from "@testing-library/react";

import App from "./App";

test("fullapp rendering", () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });

  render(
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  );

  expect(screen.getByText(/home page/i)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("to-about"));
  expect(screen.getByTestId("about-page")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("to-contact"));
  expect(screen.getByTestId("contact-page")).toBeInTheDocument();
});

test("render not found", () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  history.push("/wrong-path");

  render(
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  );

  expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
});
