import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurants,
  searchRestaurantsVariables,
} from "../../__generated__/searchRestaurants";

const SEARCH_RESTAURANT = gql`
  query searchRestaurants($input: SearchRestaurantsInput!) {
    searchRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchRestaurants,
    searchRestaurantsVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return history.replace("/");
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location]);
  return (
    <div>
      <Helmet>
        <title>Search | Uber Eats Clone</title>
      </Helmet>
      <h1>SearchPage</h1>
    </div>
  );
};
