export const sortDirection = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type SortDirection = (typeof sortDirection)[keyof typeof sortDirection];
