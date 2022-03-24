import { trimString } from "utils/common";

export default function ProductTile(props) {
  const { image, brand, productName, mrp, price, discountDisplayLabel } = props;
  return (
    <div className="h-80 w-60 m-3 overflow-hidden">
      {/* image area */}
      <div className="imageContainer bg-rose-100 overflow-hidden w-100  h-4/5">
        <img
          draggable={false}
          className="w-100 "
          src={image}
          alt="product"
          loading="lazy"
        />
      </div>
      <div>
        <p className="font-bold">{brand}</p>
      </div>
      <div>
        <p className="text-slate-400 text-sm">{trimString(productName, 28)}</p>
      </div>
      <div>
        <span className="font-bold pr-1">Rs. {price}</span>
        <span className="text-slate-400 pr-1 text-sm line-through">
          Rs. {mrp}
        </span>
        <span className="text-rose-300  text-sm">{discountDisplayLabel}</span>
      </div>
    </div>
  );
}
