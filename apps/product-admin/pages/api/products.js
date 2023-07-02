import { Product } from '../../models/Product';
import { mongooseConnect } from '../../lib/mongoose';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findById(req.query?.id));
    } else {
      console.log('log 1');
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {
    const { productName, productDescription, productPrice, images } = req.body;

    const productDoc = await Product.create({
      productName,
      productDesc: productDescription,
      productPrice,
      images,
    });

    res.json(productDoc);
  }

  if (method === 'PUT') {
    const { productName, productDescription, productPrice, images, _id } =
      req.body;

    await Product.updateOne(
      { _id },
      { productName, productDesc: productDescription, productPrice, images }
    );
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      return res.json(await Product.deleteOne({ _id: req.query?.id }));
    }
  }
}
