import ProductCard from "./ProductCard";
import { sampleProducts } from "../data";

function ProductList({ category, addToCart }) {
  const filteredProducts =
    category === "All"
      ? sampleProducts
      : sampleProducts.filter((p) => p.category === category);

  if (filteredProducts.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;