interface PageinationType {
  limit: number;
  offset: number;
  currentPage: number;
  nextOffset: number;
  prevOffset: number;
  totalCount: number;
}
