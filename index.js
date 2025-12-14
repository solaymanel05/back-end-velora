// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Order = require("./models/Order");

// const app = express();

// // ===== MONGO CONNECT =====
// mongoose
//   .connect(
//     "mongodb+srv://solaymanel673_db_user:aZdz8pNTGXtOvE9E@veloradb.ldsupiq.mongodb.net/?retryWrites=true&w=majority"
//   )
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log("Mongo Error:", err));

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Sample Products (static)
// const products = [
//   {
//     id: 1,
//     name: "Classic White T-Shirt",
//     price: 149,
//     image:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
//     description:
//       "T-shirt أبيض كلاسيكي بخامة قطن 100%، مريح للاستعمال اليومي وكيجي مع جميع الستايلات، مناسب للصيف واللبس اليومي."
//   },
//   {
//     id: 2,
//     name: "Oversized Black Hoodie",
//     price: 349,
//     image:
//       "https://images.unsplash.com/photo-1520975916090-3105956dac38",
//     description:
//       "هودي أسود ستايل oversized، دافئ وعصري، مثالي لفصل الخريف والشتاء ولمظهر streetwear أنيق."
//   },
//   {
//     id: 3,
//     name: "Slim Fit Blue Jeans",
//     price: 399,
//     image:
//       "https://images.unsplash.com/photo-1542272604-787c3835535d",
//     description:
//       "جينز أزرق slim fit بتصميم عصري، مرن ومريح، كيناسب اللبس اليومي والخروج."
//   },
//   {
//     id: 4,
//     name: "Beige Casual Jacket",
//     price: 599,
//     image:
//       "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
//     description:
//       "جاكيت كاجوال باللون البيج، خفيف وأنيق، مثالي للتنسيق مع تي-شيرت أو قميص."
//   },
  
//   {
//     id: 6,
//     name: "Sport Sneakers White",
//     price: 459,
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
//     description:
//       "حذاء رياضي أبيض مريح وخفيف، مناسب للمشي واللبس اليومي مع جميع الإطلالات."
//   }
// ];

// // ===== GET PRODUCTS =====
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });

// // ===== POST ORDER (Save in MongoDB) =====
// app.post("/api/orders", async (req, res) => {
//   try {
//     const { productId, name, phone, quantity } = req.body;

//     // 1️⃣ Find product
//     const product = products.find((p) => p.id === productId);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // 2️⃣ Save FULL product info
//     const newOrder = new Order({
//       productId: {
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         description:product.description
//       },
//       name,
//       phone,
//       quantity,
//     });

//     await newOrder.save();

//     res.status(201).json({
//       message: "Order saved successfully",
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log("API running on port " + PORT));
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./models/Order");

const app = express();

// ===== MONGO CONNECT =====
// URI غادي تجيبو من Environment Variable
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Mongo Error:", err));

// Middleware
app.use(express.json());
app.use(cors());

// Sample Products (static)
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description:
      "T-shirt أبيض كلاسيكي بخامة قطن 100%، مريح للاستعمال اليومي وكيجي مع جميع الستايلات، مناسب للصيف واللبس اليومي."
  },
  {
    id: 2,
    name: "Oversized Black Hoodie",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    description:
      "هودي أسود ستايل oversized، دافئ وعصري، مثالي لفصل الخريف والشتاء ولمظهر streetwear أنيق."
  },
  {
    id: 3,
    name: "Slim Fit Blue Jeans",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
    description:
      "جينز أزرق slim fit بتصميم عصري، مرن ومريح، كيناسب اللبس اليومي والخروج."
  },
  {
    id: 4,
    name: "Beige Casual Jacket",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    description:
      "جاكيت كاجوال باللون البيج، خفيف وأنيق، مثالي للتنسيق مع تي-شيرت أو قميص."
  },
  {
    id: 6,
    name: "Sport Sneakers White",
    price: 459,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description:
      "حذاء رياضي أبيض مريح وخفيف، مناسب للمشي واللبس اليومي مع جميع الإطلالات."
  }
];

// ===== GET PRODUCTS =====
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ===== POST ORDER (Save in MongoDB) =====
app.post("/api/orders", async (req, res) => {
  try {
    const { productId, name, phone, quantity } = req.body;

    // 1️⃣ Find product
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 2️⃣ Save FULL product info
    const newOrder = new Order({
      productId: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description
      },
      name,
      phone,
      quantity,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order saved successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on port " + PORT));
