"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variants";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient";
import { PizzaSize, PizzaType, pizzaTypes } from "../../constans/pizza";
import { usePizzaOptions } from "../../hooks/use-active-available-size";
import { getPizzaDetails } from "../../lib/get-pizza-details";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onSubmit,
  className,
}) => {
  const { size, type, setSize, setType, addIngredient, selectedIngredients, availableSizes } =
    usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(
    items,
    ingredients,
    type,
    size,
    selectedIngredients
  );

  const handleClickAdd = () => {
    onSubmit?.();
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[500px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-y-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3 min-h-full">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
