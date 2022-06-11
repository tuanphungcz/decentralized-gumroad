import { productItem } from "utils/template";

const ProductItem = () => (
  <div className="p-4 mb-6 text-sm rounded box-shadow-blue">
    <div className="inline-block px-4 py-2 mb-4 bg-yellow-400 polygon">
      {productItem.price}
    </div>
    <div>
      <div className="pb-2">{productItem.title}</div>
      {productItem.items.map((item, i) => (
        <div key={i.toString() + item} className="pb-2 text-gray-500">
          {item}
        </div>
      ))}
    </div>
  </div>
);

export default ProductItem;
