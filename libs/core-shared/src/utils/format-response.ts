export const formatGetListResponse = <T>(
  data: T[],
  totalCount: number,
  page: number,
  pageSize: number,
) => {
  return {
    data,
    meta: {
      totalCount,
      totalPage: Math.ceil(totalCount / pageSize),
      page,
      pageSize,
    },
  };
};

export const formatGetDetailResponse = <T>(data: T) => {
  return {
    data,
  };
};
