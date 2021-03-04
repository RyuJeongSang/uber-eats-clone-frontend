import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  findRestaurant,
  findRestaurantVariables,
} from "../../__generated__/findRestaurant";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";
import { Dish } from "../../components/dish";
import { DishOption } from "../../components/dish-option";
import {
  createOrder,
  createOrderVariables,
} from "../../__generated__/createOrder";

const RESTAURANT_QUERY = gql`
  query findRestaurant($input: RestaurantInput!) {
    findRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantPart
        menu {
          ...DishPart
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const { id } = useParams<IRestaurantParams>();
  const { data } = useQuery<findRestaurant, findRestaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +id,
        },
      },
    }
  );

  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOreder = () => {
    setOrderStarted(true);
  };
  const getItem = (dishId: number) => {
    return orderItems.find(order => order.dishId === dishId);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems(current => [{ dishId, options: [] }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems(current => current.filter(dish => dish.dishId !== dishId));
  };

  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find(aOption => aOption.name === optionName)
      );
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems(current => [
          { dishId, options: [{ name: optionName }, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };
  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems(current => [
        {
          dishId,
          options: oldItem.options?.filter(
            option => option.name !== optionName
          ),
        },
        ...current,
      ]);
    }
  };
  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find(option => option.name === optionName);
  };
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };
  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };
  const history = useHistory();
  const onCompleted = (data: createOrder) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (data.createOrder.ok) {
      history.push(`/orders/${orderId}`);
    }
  };
  const [createOrderMutation, { loading: placingOrder }] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER_MUTATION, {
    onCompleted,
  });
  const triggerConfirmOrder = () => {
    if (placingOrder) {
      return;
    }
    if (orderItems.length === 0) {
      alert("Cant place empty order");
      return;
    }
    const ok = window.confirm("place an order");
    if (ok) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +id,
            items: orderItems,
          },
        },
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>
          {data?.findRestaurant.restaurant?.name || ""} | Nuber Eats
        </title>
      </Helmet>
      <div
        className="bg-gray-800 bg-center bg-cover py-48"
        style={{
          backgroundImage: `url(${data?.findRestaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="bg-white w-3/12 py-8 pl-12">
          <h4 className="text-4xl mb-3">
            {data?.findRestaurant.restaurant?.name}
          </h4>
          <h5 className="text-sm font-light mb-2">
            {data?.findRestaurant.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light">
            {data?.findRestaurant.restaurant?.address}
          </h6>
        </div>
      </div>
      <div className="container pb-32 flex flex-col items-end mt-20">
        {!orderStarted && (
          <button
            onClick={triggerStartOreder}
            className="text-white font-medium py-3 px-5 text-lg rounded-lg focus:outline-none hover:opacity-80 transition-opacity mb-4 bg-lime-500"
          >
            Start Order
          </button>
        )}
        {orderStarted && (
          <div className="flex items-center">
            <button
              onClick={triggerConfirmOrder}
              className="text-white font-medium py-3 px-5 text-lg rounded-lg focus:outline-none hover:opacity-80 transition-opacity mb-4 bg-lime-500 mr-3"
            >
              Confirm Order
            </button>
            <button
              onClick={triggerCancelOrder}
              className="text-white font-medium py-3 px-5 text-lg rounded-lg focus:outline-none hover:opacity-80 transition-opacity mb-4 bg-red-400"
            >
              Cancel Order
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-3 w-full gap-x-5 gap-y-10 mt-16 px-7 mb-36">
          {data?.findRestaurant.restaurant?.menu.map((dish, index) => (
            <Dish
              isSelected={isSelected(dish.id)}
              id={dish.id}
              orderStarted={orderStarted}
              key={index}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              isCustomer={true}
              options={dish.options}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map((option, index) => (
                <DishOption
                  key={index}
                  dishId={dish.id}
                  isSelected={isOptionSelected(dish.id, option.name)}
                  name={option.name}
                  extra={option.extra}
                  addOptionToItem={addOptionToItem}
                  removeOptionFromItem={removeOptionFromItem}
                />
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
