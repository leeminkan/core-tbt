export function parsePagination(
  page: number,
  size: number,
): { take: number; skip: number } {
  const skip = (page - 1) * size;
  return { take: size, skip: skip };
}
