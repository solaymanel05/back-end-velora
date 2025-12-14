const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    productId: {
      id: Number,
      name: String,
      price: Number,
      description:String,
    },
    name: String,
    phone: String,
    quantity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);



// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema(
//   {
//     productName: { type: String, required: true },
//     productPrice: { type: Number, required: true },

//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     quantity: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", OrderSchema);
