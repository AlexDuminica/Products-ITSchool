export const initialState = {
  products: [],
};

export function favouriteReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_FAVOURITES": {
      let favouriteProducts;
      let newState;

      const foundFavourite = state.products.find((product) => {
        return product.id === action.payload.id;
      });

      if (foundFavourite) {
        favouriteProducts = state.products.map((product) => {
          if (product.id === foundFavourite.id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          } else {
            return product;
          }
        });
      } else {
        favouriteProducts = [
          ...state.products,
          {
            ...action.payload,
            quantity: 1,
          },
        ];
      }

      newState = {
        products: favouriteProducts,
      };

      return newState;
    }

    case "REMOVE_FROM_FAVOURITES": {
      const filteredProducts = state.products.filter((product) => {
        return product.id !== action.payload;
      });

      return {
        ...state,
        products: filteredProducts,
      };
    }
    default:
      return state;
  }
}
