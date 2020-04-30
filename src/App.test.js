import React from "react";
import { render, prettyDOM } from "@testing-library/react";
import App from "./App";

test.only("Lancement de l App", () => {
  const { container, getByText } = render(<App />);
  const textElement = getByText(/Get your IT resources/i);
  expect(textElement).toBeInTheDocument();
});
