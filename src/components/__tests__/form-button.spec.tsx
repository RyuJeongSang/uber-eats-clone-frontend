import { render } from "@testing-library/react";
import React from "react";
import { FormButton } from "../form-button";

describe("<FormButton />", () => {
  it("should render OK with props", () => {
    const { getByText } = render(
      <FormButton canClick={true} loading={false} actionText={"test"} />
    );
    getByText("test");
  });
  it("should display loading", () => {
    const { getByText, container } = render(
      <FormButton canClick={false} loading={true} actionText={"test"} />
    );
    getByText("Loading...");
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
