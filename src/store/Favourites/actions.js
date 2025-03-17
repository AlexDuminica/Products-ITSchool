export function addToFavourites(product) {
  return {
    type: "ADD_TO_FAVOURITES",
    payload: product,
  };
}

export function removeFromFavourites(productId) {
  return {
    type: "REMOVE_FROM_FAVOURITES",
    payload: productId,
  };
}
