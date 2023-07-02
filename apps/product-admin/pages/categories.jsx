import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

function Categories() {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  const getCategories = async () => {
    const response = await axios.get('/api/categories');
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery(
    ['categories'],
    getCategories
  );

  const saveCategory = async () => {
    return await axios.post('/api/categories', { name });
  };

  const catMutation = useMutation(saveCategory, {
    onSuccess: (cate) => {
      setName('');
      //   console.log('cat--> ', cate);
      //   queryClient.setQueryData(['categories'], cate.data);
      queryClient.invalidateQueries({
        queryKey: 'categories',
      });
    },
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    <div>Error - {error}</div>;
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    catMutation.mutate();
  };
  return (
    <>
      <h1>Categories</h1>
      <label htmlFor="">New Category Name</label>
      <form onSubmit={onSubmit} className="flex gap-1">
        <input
          className="mb-0"
          onChange={(ev) => setName(ev.target.value)}
          type="text"
          value={name}
          placeholder="Category Name"
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>

      <table className="mt-4 basic">
        <thead>
          <tr>
            <td>Category Name</td>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data?.map((cat) => (
              <tr key={cat._id}>
                <td> {cat.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Categories;
