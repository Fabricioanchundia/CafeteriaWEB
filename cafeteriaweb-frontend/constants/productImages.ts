import { categoryFolders } from "./categoryFolders";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD") // quita acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getProductImage(
  productName: string,
  categoryName: string
): string {
  const folder = categoryFolders[categoryName];

  if (!folder) {
    return "/images/products/default.png";
  }

  const fileName = slugify(productName);

  return `/images/products/${folder}/${fileName}.png`;
}
