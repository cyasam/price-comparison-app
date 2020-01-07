import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import './Home.scss';

const GET_PRICES = gql`
  {
    prices {
      id
      shop {
        id
        name
      }
      productCategory {
        id
        name
      }
      product {
        id
        name
        productUnit {
          id
          name
        }
        productCategory {
          id
          name
        }
      }
      amount: price
      currency {
        id
        name
        short
      }
      createDate
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_PRICES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul>
        {data.prices.map(price => (
          <li key={price.id}>
            {price.amount} {price.currency.short}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
