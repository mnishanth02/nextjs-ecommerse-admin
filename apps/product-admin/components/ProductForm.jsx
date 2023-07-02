import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

function ProductForm({
  _id,
  productName,
  productDesc: productDescription,
  productPrice,
  images,
}) {
  const router = useRouter();
  const [formDetails, setFormDetails] = useState({
    productName,
    productDescription,
    productPrice,
    images,
  });

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
      console.log('Product created success');
      // queryClient.setQueryData(['products'], (oldQueryData) => {
      //   console.log('old P->' + oldQueryData);
      //   console.log('proddd->' + product?.data);
      //   return {
      //     ...oldQueryData,
      //     data: [...oldQueryData.data, product?.data],
      //   };
      // });
      // queryClient.invalidateQueries(['products', _id], { exact: true });
      router.push('/products');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async () =>
      await axios.put('/api/products', { ...formDetails, _id }),
    onSuccess: (product) => {
      queryClient.setQueryData(['products', 'edit', _id], product);
      console.log('Product Updated successfully', product);
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

  const uploadImages = async (e) => {
    const files = e.target?.files;

    if (files.length > 0) {
      const data = new FormData();

      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      console.log(res.data);
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
      <label htmlFor="fileUpload">Photos</label>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <label className="flex items-center justify-center w-24 h-24 gap-1 text-sm text-gray-500 border rounded-lg cursor-pointer bg-grey-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input
            type="file"
            name="fileUpload"
            onChange={uploadImages}
            id="fileUpload"
            hidden
          />
        </label>
        {!formDetails.images?.length && <div>No Photos for this Product</div>}
      </div>

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
