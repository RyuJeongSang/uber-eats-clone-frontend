import { render } from "@testing-library/react";
import React from "react";
import { Restaurant } from "../restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Restaurant />", () => {
  it("render OK with props", () => {
    const restaurantProps = {
      id: "1",
      name: "nameTest",
      categoryName: "cateTest",
      coverImg: "x",
    };
    const { getByText, container } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );
    getByText("nameTest");
    getByText("cateTest");
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurant/${restaurantProps.id}`
    );
  });
});
