import { Product } from '../../models/Product';
import { mongooseConnect } from '../../lib/mongoose';

export default async function handle(req, res) {
  const { method } = req;

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findById(req.query?.id));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {
    await mongooseConnect();

    const { productName, productDescription, productPrice } = req.body;

    const productDoc = await Product.create({
      productName,
      productDesc: productDescription,
      productPrice,
    });

    res.json(productDoc);
  }

  if (method === 'PUT') {
    const { productName, productDescription, productPrice, _id } = req.body;

    await Product.updateOne(
      { _id },
      { productName, productDesc: productDescription, productPrice }
    );
    res.json(true);
  }
}
