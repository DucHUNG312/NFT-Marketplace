export const getTopCreators = (creators) => {
  const totalCreators = [];
  const finalResults = creators.reduce((index, currentValue) => {
    (index[currentValue.seller] = index[currentValue.seller] || []).push(
      currentValue
    );
    return index;
  }, {});

  Object.entries(finalResults).forEach((item) => {
    const seller = item[0];
    const total = item[1]
      .map((newItem) => Number(newItem.price))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    totalCreators.push({ seller, total });
  });
  const finalCreators = totalCreators.sort(
    (current, next) => next.total - current.total
  );
  return finalCreators;
};

export const getTop8Creators = (creators) => {
  const top8Creators = [];
  const finalCreators = getTopCreators(creators);
  if (finalCreators.length < 8) return finalCreators;
  for (let i = 0; i < 7; i++) {
    top8Creators.push(finalCreators[i]);
  }
  return top8Creators;
};
