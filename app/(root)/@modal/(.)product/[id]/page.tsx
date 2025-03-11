import { prisma } from "@prisma/prisma-client";
import { notFound } from "next/navigation";
import { ChooseProductModal } from "../../../../../shared/components/shared/modals/choose-product-modal";
import { ProductWithRelations } from "../../../../../@types/prisma";

export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Дожидаемся params

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  }) as ProductWithRelations | null;

  if (!product || !product.items.length) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}