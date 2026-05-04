function ProductCard({ product, addToCart }) {
  return (
    <div>
      <p>{product.name}</p>

      <button
        data-testid={`product-${product.id}`}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;