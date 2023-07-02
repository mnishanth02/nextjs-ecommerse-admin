import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

function DeleteProduct() {
  const router = useRouter();
  const { productId } = router.query;

  const getProductByID = async () => {
    const response = await axios.get('/api/products?id=' + productId);
    return response.data;
  };

  const goBack = () => {
    router.push('/products');
  };
  const deleteProduct = async () => {
    return await axios.delete('/api/products?id=' + productId);
  };

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      // queryClient.invalidateQueries('products');
      router.push('/products');
    },
  });

  const { data, isLoading, isError, error } = useQuery(
    ['products', 'delete', productId],
    getProductByID
  );

  if (isLoading) {
    return <div>Loading ....</div>;
  }
  if (isError) {
    return <div>Error while fetching ProductBy ID ... {error}</div>;
  }

  const onDelete = () => {
    deleteProductMutation.mutate();
  };

  return (
    <>
      <h1 className="text-center">
        Do you really want to delete a Product {data && data?.productName} ?
      </h1>
      <div className="flex justify-center gap-2">
        <button className="btn-red" onClick={onDelete}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </>
  );
}

export default DeleteProduct;
