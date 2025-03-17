import React, { useContext }from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../store/Cart/context';
import { FavouriteContext } from '../store/Favourites/context';



export function Header() {
  // Accesam state-ul global al aplicatiei despre cart
  const {cartState} = useContext(CartContext);

  const {favouriteState} = useContext(FavouriteContext)
  
console.log(cartState)
  return (
    <header>
      <div className="d-flex justify-content-between mx-4">
        <Link to="/">Acasă</Link>
        <div>
          <Link to="/products" className="p-3">
            Produse
          </Link>
          <Link to="/cart">Coș ({cartState.products.length})</Link>
          <Link to ="/Favourites" className='p-3'> Favourites ({favouriteState.products.length})</Link>
        </div>
      </div>
    </header>
  );
}
