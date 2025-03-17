import React, { useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style.css";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { Header } from "./components/Header";
import { themeReducer, intialState as themeInitalState } from "./store/Theme/reducer";
import { ThemeContext } from "./store/Theme/context";
import { CartContext } from "./store/Cart/context";
import { cartReducer, initialState as cartInitialState } from "./store/Cart/reducer";
import { FavouriteContext } from "./store/Favourites/context";
import { favouriteReducer } from "./store/Favourites/reducer";
import { initialState as favouriteInitialState } from "./store/Favourites/reducer";
import { Favourites } from "./pages/Favourites";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <Header />
        <Product />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Header />
        <Cart />
      </>
    ),
  },
  {
    path: "/Favourites",
    element: (
      <>
        <Header />
        <Favourites />
      </>
    ),
  },
]);

export default function App() {
  // Initializam reducer-ul pentru tema:
  // useReduce ne intoarce un state si o functie care ne permite modificarea state-ului(ce ar trebui sa contina in denumire dispatch)
  const [themeState, themeDispatch] = useReducer(themeReducer, themeInitalState);
  // Creeam valoarea pe care o pasam catre ThemeProvider - care le face disponibil catre restul componetelor
  const themeContextValue = {
    themeState,
    themeDispatch,
  };

  const [favouriteState, favouriteDispatch] = useReducer(favouriteReducer, favouriteInitialState);

  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);

  return (
    // Facem disponobile catre intreaga aplicatie state-urile globale
    <FavouriteContext.Provider value={{ favouriteState, favouriteDispatch }}>
      <CartContext.Provider value={{ cartState, cartDispatch }}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className="App primary">
            <RouterProvider router={router} />
          </div>
        </ThemeContext.Provider>
      </CartContext.Provider>
    </FavouriteContext.Provider>
  );
}
