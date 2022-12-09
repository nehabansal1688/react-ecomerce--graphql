import React, { createContext, useState, useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const COLLECTIONS = gql`
  query GetCollections {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const { loading, error, data } = useQuery(COLLECTIONS);

  useEffect(() => {
    if (data) {
      const { collections } = data;
      const collectionsMap = collections.reduce((acc, collection) => {
        const { title, items } = collection;
        acc[title.toLowerCase()] = items;
        return acc;
      }, {});
      setCategoriesMap(collectionsMap);
    }
  }, [data]);

  const value = { categoriesMap, loading, error };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

// import React, { createContext, useState, useEffect } from 'react';
// // import SHOP_DATA from '../shop-data.js';
// // import {
// //   addCollectionAndDocuments,
// //   getCategoriesAndDocuments,
// // } from '../utils/firebase/firebase.utils';

// import { gql, useQuery } from '@apollo/client';

// export const CategoriesContext = createContext({
//   categoriesMap: {},
// });

// const COLLECTIONS = gql`
// query {
//   collections {
//     id
//     title
//     items {
//       id
//       name
//       price
//       imageUrl
//     }
//   }
// }
// `;
// export const CategoriesProvider = ({ children }) => {
//   const { loading, error, data } = useQuery(COLLECTIONS);

//   const [categoriesMap, setCategoriesMap] = useState({});

//   console.log(data);
//   // useEffect(() => {
//   //   addCollectionAndDocuments('categories', SHOP_DATA);
//   // }, []);

//   //for firebase data retrival
//   // useEffect(() => {
//   //   const getCategoriesMap = async () => {
//   //     const categoryMap = await getCategoriesAndDocuments();
//   //     setCategoriesMap(categoryMap);
//   //   };
//   //   getCategoriesMap();
//   // }, []);
//   const value = { categoriesMap };
//   return (
//     <CategoriesContext.Provider value={value}>
//       {' '}
//       {children}
//     </CategoriesContext.Provider>
//   );
// };
