export const totalCounts = (clickName, analysisValues) => {
  let totalCount = 0;
  analysisValues.products.data.forEach((attribute) => {
    attribute.attributes[clickName].forEach((element) => {
      totalCount += parseInt(element.clickCount);
    });
  });
  return totalCount;
};

export const butikClickTotalCount = (analysisValues) => {
  let totalCountButik = 0;
  analysisValues.clicks.forEach((element) => {
    totalCountButik += parseInt(element.clickCount);
  });
  return totalCountButik;
};

// export const crop = (cropCount, value) => {
// 	value.forEach(element => {
		
// 	});
//   };
