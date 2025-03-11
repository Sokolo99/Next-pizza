import React from "react";
import { cn } from "../../lib/utils";
import { CartItemInfo } from "./cart-item-details/cart-item-info";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { CartItemDetailsPrice } from "./cart-item-details/cart-item-details-price";
import { TrashIcon } from "lucide-react";

interface Props extends CartItemProps {
  className?: string;
}

export const CardDrawerItem: React.FC<Props> = ({
  className,
  id,
  imageUrl,
  name,
  price,
  quantity,
  details,
}) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6", className)}>
      <CartItemDetailsImage src={imageUrl} />
      <div className="flex-1">
        <CartItemInfo name={name} details={details} />

        <hr className="my-3" />

        <div className="flex justify-between items-center">
          <CountButton value={quantity} />

          <div className="flex items-center gap-3">
            <CartItemDetailsPrice value={price} />
            <TrashIcon className="text-gray-400 cursor-pointer hover:text-gray-600" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
