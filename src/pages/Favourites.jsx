import React, { useContext } from "react";
import { FavouriteContext } from "../store/Favourites/context";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
import { removeFromFavourites } from "../store/Favourites/actions";


export function Favourites () {
    const {favouriteState, favouriteDispatch} = useContext(FavouriteContext)

    const handleRemoveFavourite = (id) => {
        const actionResult = removeFromFavourites(id)
        favouriteDispatch(actionResult)
    }

    return (
       
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
            {favouriteState.products.length === 0 ? (<h3>No products added to Favourites yet</h3>) : (
            <h3>Here is a list of your favourite films: </h3>
            )}  
           
         {favouriteState.products.map((product) => {
            return (
                <Card key={product.id} style={{ width: '18rem' }} className="m-3">
                  {/* Fiecare card are link-ul corespunzator catre pagina de produs. */}
                  {/* Functia encodeURI transforma caracterele care nu sunt acceptate in url */}
                  <Link
                    to={`/product/${encodeURI(product.id)}`}
                    className="text-dark"
                  >
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="text-danger">
                        {product.price} $
                      </Card.Text>
                    </Card.Body>
                  </Link>
                  <Button variant="warning" onClick={()=>{
                    handleRemoveFavourite(
                     product.id
                    )
                  }}
                 >Remove from Favourites</Button>
                </Card>
            )
         })}
        </div>

    )
    
}