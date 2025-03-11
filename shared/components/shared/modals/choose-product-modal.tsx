"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../shoose-product-form";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { ChoosePizzaForm } from "../shoose-pizza-form";
import { ProductWithRelations } from "../../../../@types/prisma";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
type Props = {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <VisuallyHidden>
        <DialogTitle>{product.name}</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] sm:max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
