import { useQuery, useQueryClient } from '@tanstack/react-query';
import ProductForm from '../../../components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';

const getProductByID = async (id) => {
  const response = await axios.get('/api/products?id=' + id);
  return response.data;
};

function EditProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { productId } = router.query;

  const { data, isLoading, isError, error } = useQuery(
    ['products', 'edit', productId],
    () => getProductByID(productId),
    {
      initialData: () => {
        const product = queryClient
          .getQueryData(['products'])
          ?.find((product) => product._id === parseInt(productId));

        if (product) {
          return { data: product };
        } else {
          return undefined;
        }
      },
    }
  );

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (isError) {
    return <div>Error while fetching ProductBy ID ... {error}</div>;
  }

  return (
    <>
      <h1>Edit Product</h1>
      {data && <ProductForm {...data} />}
    </>
  );
}

export default EditProduct;
