import React from "react";
// import { render } from '@testing-library/react';
import { render, fireEvent } from "components/utils/test-utils";
import { MemoryRouter } from "react-router-dom";
import Signin from "./Signin";

test.only("renders learn react link", () => {
  const { container, getByText } = render(
    <MemoryRouter>
      <Signin />
    </MemoryRouter>
  );
  const linkElement = getByText(/Submit/i);
  expect(linkElement).toBeInTheDocument();
});
