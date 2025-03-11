import { calcTotalPizzaPrices } from "./calc-pizza-prices";
import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constans/pizza";

export const getPizzaDetails = (
  items: ProductItem[],
  ingredients: Ingredient[],
  type: PizzaType,
  size: PizzaSize,
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrices(items, ingredients, type, size, selectedIngredients);
  const textDetaills = `${size} см, ${mapPizzaType[type]} пицца, ингредиенты: (${selectedIngredients.size}) шт`;

  return { totalPrice, textDetaills };
};
