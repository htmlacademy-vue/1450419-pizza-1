export const calculatePizzaPrice = (
  store,
  { doughId, sauceId, sizeId, ingredients }
) => {
  const sizesEnum = store.getters["Builder/sizeEnum"];
  const doughEnum = store.getters["Builder/doughEnum"];
  const sauceEnum = store.getters["Builder/sauceEnum"];
  const ingredientsEnum = store.getters["Builder/ingredientsEnum"];

  const doughPrice = Number(doughEnum[doughId].price);
  const saucePrice = Number(sauceEnum[sauceId].price);
  const sizeMultiplier = Number(sizesEnum[sizeId].multiplier);
  const ingredientsPrice = ingredients.reduce(
    (sum, ing) =>
      sum + Number(ingredientsEnum[ing.id].price) * Number(ing.count),
    0
  );
  return (saucePrice + ingredientsPrice + doughPrice) * sizeMultiplier;
};
