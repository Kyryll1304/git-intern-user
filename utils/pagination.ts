export const getPaginationData = (currentPage: number, totalPages: number) => {
  let paginationStart, paginationEnd;

  if (currentPage <= 3) {
    paginationStart = 1;
    paginationEnd = 4;
  } else if (currentPage >= totalPages - 2) {
    paginationStart = totalPages - 3;
    paginationEnd = totalPages;
  } else {
    paginationStart = currentPage - 1;
    paginationEnd = currentPage + 1;
  }

  return { paginationStart, paginationEnd };
};
