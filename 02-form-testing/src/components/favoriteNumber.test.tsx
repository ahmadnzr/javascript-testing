import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteNumber from "./FavoriteNumber";

describe("it should type valid number", () => {
  test("should render favorite number", () => {
    render(<FavoriteNumber />);
  });

  test("should return alert when type invalid number", () => {
    ["0", "11", "10"].forEach((item) => {
      render(<FavoriteNumber />);
      const textbox = screen.getByRole("textbox", { name: /favorite number/i });

      userEvent.type(textbox, item);

      const alert = screen.getByText(/the number is invalid/i);
      expect(alert).toBeInTheDocument();
    });
  });

  test("should return 0 when type NaN", () => {
    ["a", "b", "3e"].forEach((item) => {
      render(<FavoriteNumber />);
      const textbox = screen.getByRole("textbox", { name: /favorite number/i });

      userEvent.type(textbox, item);

      const alert = screen.getByText(/the number is invalid/i);
      expect(alert).toBeInTheDocument();
    });
  });
});
