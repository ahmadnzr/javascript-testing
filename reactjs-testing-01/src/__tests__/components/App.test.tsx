import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";
import CounterButton from "../../components/CounterButton";
import CounterValue from "../../components/CounterValue";
import { CounterProvider } from "../../components/CounterProvider";

const setup = () => {
  return render(<App />);
};

describe("Should have this components", () => {
  it("Should render provider context", () => {
    render(<CounterProvider />);
  });

  it("should have counter value", () => {
    render(<CounterValue />);
    expect(screen.getByText(/counter value : 0/i)).toBeInTheDocument();
  });

  it("should have increment & decrement button", () => {
    render(<CounterButton />);
    expect(
      screen.getByRole("button", {
        name: /increment/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /decrement/i,
      })
    ).toBeInTheDocument();
  });
});

describe("Should have run the logic", () => {
  it("Should increment the current value", () => {
    setup();
    const currentValue = screen.getByText(/counter value : 0/i);
    const incrementBtn = screen.getByRole("button", {
      name: /increment/i,
    });

    fireEvent.click(incrementBtn);
    expect(currentValue).toHaveTextContent(/counter value : 1/i);
  });

  it("Should decrement the current value", () => {
    setup();
    const currentValue = screen.getByText(/counter value : 0/i);
    const decrementBtn = screen.getByRole("button", {
      name: /decrement/i,
    });

    fireEvent.click(decrementBtn);
    expect(currentValue).toHaveTextContent(/counter value : -1/i);
  });
});
