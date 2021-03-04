/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findCategory
// ====================================================

export interface findCategory_findCategory_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface findCategory_findCategory_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: findCategory_findCategory_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface findCategory_findCategory_category {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface findCategory_findCategory {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: findCategory_findCategory_restaurants[] | null;
  category: findCategory_findCategory_category | null;
}

export interface findCategory {
  findCategory: findCategory_findCategory;
}

export interface findCategoryVariables {
  input: CategoryInput;
}
