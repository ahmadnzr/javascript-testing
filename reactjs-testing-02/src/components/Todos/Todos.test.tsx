import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Todos from ".";
import { TodoBody } from "../../types";

const server = setupServer(
  rest.get<TodoBody[]>(
    "https://jsonplaceholder.typicode.com/todos",
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: "Makan",
            completed: false,
          },
        ])
      );
    }
  ),
  rest.post<Pick<TodoBody, "title">>(
    "https://jsonplaceholder.typicode.com/todos",
    async (req, res, ctx) => {
      return res(
        ctx.json({
          userId: 1,
          id: 2,
          title: req.body.title,
          completed: false,
        })
      );
    }
  ),
  rest.delete(
    "https://jsonplaceholder.typicode.com/todos/1",
    async (req, res, ctx) => {
      return res(ctx.json({}));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should successfully render todos", async () => {
  render(<Todos />);
  const loadingMessage = screen.getByText(/loading.../i);
  expect(loadingMessage).toBeInTheDocument();
  await waitForElementToBeRemoved(loadingMessage);
  const itemList = screen.queryByRole("heading", { name: /makan/i });
  expect(itemList).toBeInTheDocument();
});

it("should successfully ad new todos", async () => {
  render(<Todos />);
  const loadingMessage = screen.getByText(/loading.../i);
  expect(loadingMessage).toBeInTheDocument();
  await waitForElementToBeRemoved(loadingMessage);
  const itemList = screen.getByRole("heading", { name: /makan/i });
  expect(itemList).toBeInTheDocument();

  const input = screen.getByRole("textbox", { name: /title/i });
  const button = screen.getByRole("button", { name: /add/i });
  expect(button).toBeDisabled();

  userEvent.type(input, "Minum");
  expect(button).toBeEnabled();
  expect(input).toHaveValue("Minum");

  userEvent.click(button);
  const loadingAdd = screen.getByText(/loading.../i);
  expect(loadingAdd).toBeInTheDocument();
  await waitForElementToBeRemoved(loadingAdd);
  const newItem = screen.getByRole("heading", { name: /minum/i });
  expect(newItem).toBeInTheDocument();
  expect(input).toHaveValue("");
  expect(button).toBeDisabled();
});

it("should successfully delete todo", async () => {
    render(<Todos />);
    const loadingMessage = screen.getByText(/loading.../i);
    expect(loadingMessage).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingMessage);
    const itemList = screen.queryByRole("heading", { name: /makan/i });
    expect(itemList).toBeInTheDocument();

    const button = screen.getAllByRole('button', {name: /delete/i})[0]
    userEvent.click(button)
    const loadingDelete = screen.getByText(/deleting.../i);
    expect(loadingDelete).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingDelete);

    expect(itemList).not.toBeInTheDocument()
  });
