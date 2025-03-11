"use client";

import React, { useRef } from "react";
import { useCategoryStore } from "../../store/catrgory";
import { useIntersection } from "react-use";
import { cn } from "../../lib/utils";
import { Title } from "./title";
import { ProductCard } from "./product-card";


type Props = {
  title: string;
  items: any[];
  listClassName?: string;
  categoryId: number
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = (
  {
    className,
    title,
    items,
    listClassName,
    categoryId,
  }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(intersectionRef as React.MutableRefObject<HTMLElement>, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection, title, categoryId]);

  return (
    <div className={cn("", className)} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
