import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";


test("renders form and validates submission", () => {
  render(<App />);

  const inputField = screen.getByPlaceholderText("Enter JSON schema here");
  fireEvent.change(inputField, { target: { value: '{"fields":[{"type":"text","label":"Name","name":"name","required":true}]}' } });

  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);

  
});




