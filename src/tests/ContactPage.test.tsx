import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import ContactPage from "../components/ContactPage";

test("shows toast when contact:submitted event fires", () => {
  render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>
  );

  window.dispatchEvent(new Event("contact:submitted"));

  const toast = screen.getByText(/message sent!/i);

  expect(toast).toBeInTheDocument();
});