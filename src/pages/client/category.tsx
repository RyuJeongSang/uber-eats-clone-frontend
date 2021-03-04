import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  findCategory,
  findCategoryVariables,
} from "../../__generated__/findCategory";
import { Restaurant } from "../../components/restaurant";

const CATEGORY_QUERY = gql`
  query findCategory($input: CategoryInput!) {
    findCategory(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantPart
      }
      category {
        ...CategoryPart
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const [page, setPage] = useState(1);
  const { slug } = useParams<ICategoryParams>();
  const { data, loading } = useQuery<findCategory, findCategoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page,
          slug,
        },
      },
    }
  );
  const onNextPageClick = () => setPage(currunt => currunt + 1);
  const onPrevPageClick = () => setPage(current => current - 1);
  return (
    <div>
      <Helmet>
        <title>Category | Uber Eats Clone</title>
      </Helmet>
      {!loading && (
        <div>
          <div className="max-w-screen-xl mx-auto mt-8">
            <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-16 px-7">
              {data?.findCategory.restaurants?.map(restaurant => (
                <Restaurant
                  key={restaurant.id}
                  id={`${restaurant.id}`}
                  coverImg={restaurant.coverImg}
                  name={restaurant.name}
                  categoryName={data?.findCategory.category?.name}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 text-center max-w-sm items-center mx-auto mt-10 pb-20">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div />
            )}
            <span>
              Page {page} of {data?.findCategory.totalPages}
            </span>
            {page !== data?.findCategory.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
