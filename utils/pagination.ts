export function getPaginationData(currentPage: number, totalPages: number) {
  let paginationStart = 1;
  let paginationEnd = 4;

  if (currentPage > 3) {
    if (currentPage >= totalPages - 2) {
      paginationStart = totalPages - 3;
      paginationEnd = totalPages;
    } else {
      paginationStart = currentPage - 1;
      paginationEnd = currentPage + 1;
    }
  }

  return { paginationStart, paginationEnd };
}
