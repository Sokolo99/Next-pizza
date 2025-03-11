import { PizzaType } from "../constans/pizza";
import { useEffect } from "react";
import { PizzaSize } from "../constans/pizza";
import React from "react";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib/get-avaolable-pizza-sizes";
import { ProductItem } from "@prisma/client";
import { Variant } from "../components/shared/group-variants";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  availableSizes: Variant[];
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
  selectedIngredients: Set<number>;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const availableSizes = getAvailablePizzaSizes(items, type);

  useEffect(() => {
    const currentSize = availableSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);
    if (!currentSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return { size, type, setSize, setType, addIngredient, selectedIngredients, availableSizes };
};
