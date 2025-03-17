export const initialState = {
  products: [],
};

export function favouriteReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_FAVOURITES": {
      let favouriteProducts;
      let newState;

      console.log(action);

      const productsInFavourite = state.products.find((product) => {
        return product.id === action.payload.id;
      });

      if (!productsInFavourite) {
        favouriteProducts = [...state.products, action.payload];
      }
      console.log("dasda", favouriteProducts);

      newState = {
        products: favouriteProducts,
      };
      return newState;
    }
    case "REMOVE_FROM_FAVOURITES": {
      const filteredProducts = state.products.filter((product) => {
        return product.id !== action.payload;
      });
      const newState = {
        products: filteredProducts,
      };
      return newState;
    }
    default:
      return state;
  }
}
