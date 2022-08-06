import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import testData from "../mock/mockData";

afterEach(() => jest.clearAllMocks());

test("Checa maior que", async () => {
  jest.spyOn(global, "fetch");
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });

  render(<App />);
  const columnFilter = await screen.findByTestId("column-filter");
  const operator = await screen.findByTestId("comparison-filter");
  const valueFilter = await screen.findByTestId("value-filter");
  const buttonFilter = await screen.findByTestId("button-filter");

  userEvent.selectOptions(columnFilter, "population");
  userEvent.selectOptions(operator, "maior que");
  userEvent.type(valueFilter, "1000000");
  userEvent.click(buttonFilter);

  const rows = await screen.findAllByRole("row");

  expect(rows).toHaveLength(7);
});

test("Checa menor que", async () => {
  jest.spyOn(global, "fetch");
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });

  render(<App />);
  const columnFilter = await screen.findByTestId("column-filter");
  const operator = await screen.findByTestId("comparison-filter");
  const valueFilter = await screen.findByTestId("value-filter");
  const buttonFilter = await screen.findByTestId("button-filter");

  userEvent.selectOptions(columnFilter, "population");
  userEvent.selectOptions(operator, "menor que");
  userEvent.type(valueFilter, "20000");
  userEvent.click(buttonFilter);

  const rows = await screen.findAllByRole("row");

  expect(rows).toHaveLength(2);
});

test("Checa igual a", async () => {
  jest.spyOn(global, "fetch");
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });

  render(<App />);
  const columnFilter = await screen.findByTestId("column-filter");
  const operator = await screen.findByTestId("comparison-filter");
  const valueFilter = await screen.findByTestId("value-filter");
  const buttonFilter = await screen.findByTestId("button-filter");

  userEvent.selectOptions(columnFilter, "population");
  userEvent.selectOptions(operator, "igual a");
  userEvent.type(valueFilter, "200000");
  userEvent.click(buttonFilter);

  const rows = await screen.findAllByRole("row");

  expect(rows).toHaveLength(2);
});

test("Filtro por nome", async () => {
  jest.spyOn(global, "fetch");
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });

  render(<App />);
  const nameFilter = await screen.findByTestId("name-filter");

  userEvent.type(nameFilter, "t");

  const rows = await screen.findAllByRole("row");

  expect(rows).toHaveLength(4);
});

test("Remover todos filtros", async () => {
  jest.spyOn(global, "fetch");
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });

  render(<App />);
  const columnFilter = await screen.findByTestId("column-filter");
  const operator = await screen.findByTestId("comparison-filter");
  const valueFilter = await screen.findByTestId("value-filter");
  const buttonFilter = await screen.findByTestId("button-filter");
  const removeFiltersButton = await screen.findByRole("button", {
    name: /remover todos os filtros/i,
  });

  userEvent.selectOptions(columnFilter, "population");
  userEvent.selectOptions(operator, "igual a");
  userEvent.type(valueFilter, "200000");
  userEvent.click(buttonFilter);

  const rows = await screen.findAllByRole("row");

  expect(rows).toHaveLength(2);

  userEvent.click(removeFiltersButton);

  const updatedRows = await screen.findAllByRole("row");
  expect(updatedRows).toHaveLength(11);
});

test("Remover um filtro", async () => {
  jest.spyOn(global, "fetch");
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });

  render(<App />);
  const columnFilter = await screen.findByTestId("column-filter");
  const operator = await screen.findByTestId("comparison-filter");
  const valueFilter = await screen.findByTestId("value-filter");
  const buttonFilter = await screen.findByTestId("button-filter");

  userEvent.selectOptions(columnFilter, "population");
  userEvent.selectOptions(operator, "igual a");
  userEvent.type(valueFilter, "200000");
  userEvent.click(buttonFilter);

  const rows = await screen.findAllByRole("row");

  expect(rows).toHaveLength(2);

  const removeFilterButton = await screen.findByRole("button", {
    name: /x/i,
  });
  userEvent.click(removeFilterButton);

  const updatedRows = await screen.findAllByRole("row");
  expect(updatedRows).toHaveLength(11);
});

test("Testa radios", () => {
  render(<App/>)
const radioAsc = screen.getByTestId('column-sort-input-asc');
const radioDesc = screen.getByTestId('column-sort-input-desc');

expect(radioAsc).toBeInTheDocument();
expect(radioDesc).toBeInTheDocument();
})