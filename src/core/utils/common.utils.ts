export function getPaginateOffset(pageNumber: number, perPage: number) {
  const pageNr = pageNumber ? Number(pageNumber) : 1;
  const limit = perPage ? Number(perPage) : 10;
  const offset = (pageNr - 1) * limit;
  return { limit, offset, pageNr };
}
