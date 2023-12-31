import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
  productName: { type: String, required: true },
  productDesc: String,
  productPrice: { type: Number, required: true },
  images: String,
});

export const Product = models.Product || model('Product', productSchema);
