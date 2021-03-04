import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantPart on Restaurant {
    id
    name
    coverImg
    category {
      name
    }
    address
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryPart on Category {
    id
    name
    coverImg
    slug
    restaurantCount
  }
`;

export const DISH_FRAGMENT = gql`
  fragment DishPart on Dish {
    id
    name
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
  }
`;

export const ORDERS_FRAGMENT = gql`
  fragment OrderPart on Order {
    id
    createdAt
    total
  }
`;

export const FULL_ORDER_FRAGMENT = gql`
  fragment FullOrderPart on Order {
    id
    status
    total
    driver {
      email
    }
    customer {
      email
    }
    restaurant {
      name
    }
  }
`;
