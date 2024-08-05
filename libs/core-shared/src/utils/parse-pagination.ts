export function parsePagination(
  page: number,
  pageSize: number,
): { take: number; skip: number } {
  const skip = (page - 1) * pageSize;
  return { take: pageSize, skip: skip };
}
