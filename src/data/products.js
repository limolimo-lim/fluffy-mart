const products = [
  // Fruits
  {
    id: 1,
    name: "Fresh Apple",
    price: 2.99,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400"
  },
  {
    id: 2,
    name: "Banana",
    price: 1.49,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400"
  },
  {
    id: 3,
    name: "Orange",
    price: 2.49,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400"
  },
  {
    id: 4,
    name: "Mango",
    price: 3.99,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400"
  },
  {
    id: 5,
    name: "Watermelon",
    price: 5.99,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400"
  },

  // Vegetables
  {
    id: 6,
    name: "Tomato",
    price: 1.99,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400"
  },
  {
    id: 7,
    name: "Potato",
    price: 1.25,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400"
  },
  {
    id: 8,
    name: "Carrot",
    price: 1.50,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400"
  },
  {
    id: 9,
    name: "Broccoli",
    price: 2.20,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400"
  },
  {
    id: 10,
    name: "Cucumber",
    price: 1.10,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400"
  },

  // Dairy
  {
    id: 11,
    name: "Fresh Milk 1L",
    price: 1.99,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400"
  },
  {
    id: 12,
    name: "Yogurt",
    price: 1.50,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"
  },
  {
    id: 13,
    name: "Cheddar Cheese",
    price: 4.99,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400"
  },
  {
    id: 14,
    name: "Butter",
    price: 3.50,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400"
  },
  {
    id: 15,
    name: "Eggs (12 Pack)",
    price: 2.99,
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400"
  },

  // Beverages
  {
    id: 16,
    name: "Coca Cola",
    price: 1.75,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400"
  },
  {
    id: 17,
    name: "Pepsi",
    price: 1.75,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400"
  },
  {
    id: 18,
    name: "Orange Juice",
    price: 2.99,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400"
  },
  {
    id: 19,
    name: "Mineral Water",
    price: 0.99,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1564419320408-38e24e038739?w=400"
  },
  {
    id: 20,
    name: "Green Tea",
    price: 2.25,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400"
  },

  // Bakery
  {
    id: 21,
    name: "White Bread",
    price: 1.50,
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"
  },
  {
    id: 22,
    name: "Croissant",
    price: 1.25,
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1555507036-ab794f4ade0a?w=400"
  },
  {
    id: 23,
    name: "Chocolate Cake",
    price: 8.99,
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400"
  },
  {
    id: 24,
    name: "Donut",
    price: 1.00,
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400"
  },
  {
    id: 25,
    name: "Muffin",
    price: 1.75,
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400"
  },

  // Snacks
  {
    id: 26,
    name: "Potato Chips",
    price: 1.99,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400"
  },
  {
    id: 27,
    name: "Chocolate Bar",
    price: 1.25,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400"
  },
  {
    id: 28,
    name: "Cookies",
    price: 2.50,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400"
  },
  {
    id: 29,
    name: "Popcorn",
    price: 1.75,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400"
  },
  {
    id: 30,
    name: "Mixed Nuts",
    price: 4.50,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400"
  }
];

export default products;