"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { useCategoryStore } from "../../store/catrgory";
import { Category } from "@prisma/client";


type Props = {
  items: Category[]
  className?: string;
}

export default function Categories({ className, items }: Props) {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 rounded-2xl", className)}>
      {
        items.map(({ name, id }, index) => (
          <a
            key={index}
            className={cn("flex items-center font-bold h-11 rounded-2xl px-5",
              categoryActiveId === id && "bg-white shadow-md shadow-gray-200 text-gray-400")
            }
            href={`/#${name}`}
          >
            <button className="cursor-pointer">
              {name}
            </button>
          </a>
        ))
      }
    </div>
  );
}
