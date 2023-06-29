import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

const getProductByID = async (id) => {
  const response = await axios.get('/api/products?id=' + id);
  return response.data;
};

function DeleteProduct() {
  const router = useRouter();
  const { productId } = router.query;

  const goBack = () => {
    router.push('/products');
  };

  const { data, isLoading, isError, error } = useQuery(
    ['products', 'delete', productId],
    () => getProductByID(productId)
  );

  if (isLoading) {
    return <div>Loading ....</div>;
  }
  if (isError) {
    return <div>Error while fetching ProductBy ID ... {error}</div>;
  }

  return (
    <>
      <h1>
        Do you really want to delete a Product {data && data?.productName}
      </h1>
      <button className="btn-primary" onClick={goBack}>
        Go Back
      </button>
    </>
  );
}

export default DeleteProduct;
