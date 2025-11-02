export async function GET() {
  const products = [
    { id: "p1",  name: "Laptop",        price: 1200, category: "Electronics", stock: 5 },
    { id: "p2",  name: "Desk Chair",    price: 150,  category: "Furniture",   stock: 3 },
    { id: "p3",  name: "Phone",         price: 900,  category: "Electronics", stock: 4 },
    { id: "p4",  name: "Coffee Maker",  price: 80,   category: "Home",        stock: 8 },
    { id: "p5",  name: "Bookshelf",     price: 110,  category: "Furniture",   stock: 6 },
    { id: "p6",  name: "Headphones",    price: 199,  category: "Electronics", stock: 7 },
    { id: "p7",  name: "Throw Blanket", price: 40,   category: "Home",        stock: 10 },
    { id: "p8",  name: "Running Shoes", price: 95,   category: "Sports",      stock: 9 },
    { id: "p9",  name: "Basketball",    price: 30,   category: "Sports",      stock: 12 },
    { id: "p10", name: "Monitor",       price: 260,  category: "Electronics", stock: 5 },
    { id: "p11", name: "Sofa Pillow",   price: 25,   category: "Home",        stock: 15 },
    { id: "p12", name: "Standing Desk", price: 430,  category: "Furniture",   stock: 2 },
  ];
  return Response.json(products);
}
