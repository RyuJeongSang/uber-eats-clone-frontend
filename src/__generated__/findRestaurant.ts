/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findRestaurant
// ====================================================

export interface findRestaurant_findRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface findRestaurant_findRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface findRestaurant_findRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: findRestaurant_findRestaurant_restaurant_menu_options_choices[] | null;
}

export interface findRestaurant_findRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: findRestaurant_findRestaurant_restaurant_menu_options[] | null;
}

export interface findRestaurant_findRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: findRestaurant_findRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: findRestaurant_findRestaurant_restaurant_menu[];
}

export interface findRestaurant_findRestaurant {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: findRestaurant_findRestaurant_restaurant | null;
}

export interface findRestaurant {
  findRestaurant: findRestaurant_findRestaurant;
}

export interface findRestaurantVariables {
  input: RestaurantInput;
}
