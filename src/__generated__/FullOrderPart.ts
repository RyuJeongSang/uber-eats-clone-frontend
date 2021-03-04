/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: FullOrderPart
// ====================================================

export interface FullOrderPart_driver {
  __typename: "User";
  email: string;
}

export interface FullOrderPart_customer {
  __typename: "User";
  email: string;
}

export interface FullOrderPart_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface FullOrderPart {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: FullOrderPart_driver | null;
  customer: FullOrderPart_customer | null;
  restaurant: FullOrderPart_restaurant | null;
}
