

const ProductCard = ({image, title}) => {
  return (
    <div className='product-card' >
        <img className="product-image" src={image} alt={title} />
        <span>{title}</span>
    </div>
  )
}

export default ProductCard