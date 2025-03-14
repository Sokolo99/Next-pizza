import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constans/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaSizes = (items: ProductItem[], type: PizzaType): Variant[] => {
    const availablePizzas = items.filter((item) => item.pizzaType === type);

    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !availablePizzas.some((pizza) => Number(pizza.size) === Number(item.value)),
      }));
}