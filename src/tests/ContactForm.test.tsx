import { render, screen, fireEvent } from "@testing-library/react";
import {  test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ContactForm from "../components/ContactForm";

test("shows validation error when submitting empty form", async () => {
  render(
    <BrowserRouter>
      <ContactForm />
    </BrowserRouter>
  );

  const button = screen.getByRole("button", { name: /send message/i });

  fireEvent.click(button);

  expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
});