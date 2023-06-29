import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function ProductForm({
  _id,
  productName,
  productDesc: productDescription,
  productPrice,
}) {
  const router = useRouter();
  const [formDetails, setFormDetails] = useState({
    productName,
    productDescription,
    productPrice,
  });

  console.log('from Form ->' + formDetails.productName);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const queryClient = useQueryClient();
  const createProductMutation = useMutation({
    mutationFn: async () => await axios.post('/api/products', formDetails),
    onSuccess: (product) => {
      queryClient.setQueryData(['products', _id], product);
      // queryClient.invalidateQueries(['products', _id], { exact: true });
      router.push('/products');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async () =>
      await axios.put('/api/products', { ...formDetails, _id }),
    onSuccess: (product) => {
      queryClient.setQueryData(['products', 'edit', _id], product);
      // queryClient.invalidateQueries(['products', 'edit', _id], { exact: true });
      router.push('/products');
    },
  });

  const createUpdateProduct = async (e) => {
    e.preventDefault();

    if (_id) {
      updateProductMutation.mutate({
        _id,
        productName: formDetails.productName,
        productDescription: formDetails.productDescription,
        productPrice: formDetails.productPrice,
      });
    } else {
      createProductMutation.mutate({
        productName: formDetails.productName,
        productDescription: formDetails.productDescription,
        productPrice: formDetails.productPrice,
      });
    }
  };
  return (
    <form onSubmit={createUpdateProduct}>
      <label htmlFor="productName">Product Name</label>
      <input
        type="text"
        id="productName"
        name="productName"
        value={formDetails.productName}
        onChange={changeHandler}
        placeholder="Product Name"
      />
      <label htmlFor="productDescription">Description</label>
      <textarea
        name="productDescription"
        id="productDescription"
        type="text"
        value={formDetails.productDescription}
        onChange={changeHandler}
        placeholder="Description"
      />
      <label htmlFor="productPrice">Price (in INR)</label>
      <input
        name="productPrice"
        id="productPrice"
        type="number"
        value={formDetails.productPrice}
        onChange={changeHandler}
        placeholder="Price"
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}

export default ProductForm;
