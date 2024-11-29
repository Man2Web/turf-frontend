export const sortCourts = (
  sortOption: string | undefined,
  courtsData: CourtsData[],
  setCourtsData: (data: CourtsData[]) => void
) => {
  const sortedData = [...courtsData];
  switch (sortOption) {
    case "Price Low - High":
      sortedData.sort(
        (a, b) =>
          Number(a.pricing.starting_price) - Number(b.pricing.starting_price)
      );
      break;

    case "Price High - Low":
      sortedData.sort(
        (a, b) =>
          Number(b.pricing.starting_price) - Number(a.pricing.starting_price)
      );
      break;

    case "Featured":
      sortedData.sort((a, b) =>
        b.featured === a.featured ? 0 : b.featured ? -1 : 1
      );
      break;

    default:
      console.warn(`Unknown sort option: ${sortOption}`);
  }
  setCourtsData(sortedData);
};
