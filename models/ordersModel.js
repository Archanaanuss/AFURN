const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileno: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  products: {
    item: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          // required:true
        },
        qty: {
          type: Number,
          // required:true
        },
        price: {
          type: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalqty: {
      type: Number,
      default: 0,
    },
  },
  productReturned:[{
    type:Number
}],
  status: {
    type: String,
    default: 'Attempted',
  },
  offer:{
    type:String,
    default:"None"
}
});

orderSchema.methods.addToOrders = function (product) {
  const { products } = this;
  const isExisting = products.item.findIndex(
    (objInItems) => new String(objInItems.productId).trim() === new String(product._id).trim(),
  );
  if (isExisting >= 0) {
    cart.products[isExisting].qty += 1;
  } else {
    cart.products.push({ productId: product._id, qty: 1 });
  }
  cart.totalPrice += product.price;
  console.log('User in schema:', this);
  return this.save();
};

module.exports = mongoose.model('Orders', orderSchema);