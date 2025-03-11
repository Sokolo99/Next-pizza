import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constans/pizza";

/**
 * Функция для подсчета общей стоимости пиццы
 * @param items - массив продуктов
 * @param ingredients - массив ингредиентов
 * @param type - тип пиццы
 * @param size - размер пиццы
 * @param selectedIngredients - выбранные ингредиенты
 */

export const calcTotalPizzaPrices = (
  items: ProductItem[],
  ingredients: Ingredient[],
  type: PizzaType,
  size: PizzaSize,
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
