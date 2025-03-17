import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/Cart/actions';
import { CartContext } from '../store/Cart/context';

export function Product() {

  // Extragem functia de pe state care ne permite modificarea cartului
  const {cartDispatch} = useContext(CartContext)
  // Preluam parametrul din URL.
  let { id } = useParams();
  // In url, id-ul este codificat cu functia encodeURI. Il decodam.
  id = decodeURI(id);
  // Cerem produsul de la API si actualizam state-ul.
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, [id]);

  // Extragem datele de inters din produs.
  const productInfo = product.gameInfo || {};
  const { thumb, name, salePrice, retailPrice } = productInfo;

  function handleAddToCart (product) {
    // Apelam functia cu actiunea aferente adaugarii in cart
    const actionResult = addToCart(product)
    cartDispatch(actionResult)
    
  }

  return (
    // Afisam datele despre produs pe ecran.
    <div className="d-flex my-3 mx-2">
      <div className="w-50">
        <div>
          <img src={thumb} alt="" />
        </div>
        <h1>{name}</h1>
      </div>
      <div className="w-50">
        <p>Preț întreg: {retailPrice}$</p>
        <p>
          Preț redus: <span className="text-danger">{salePrice}$</span>
        </p>
        <Button variant="success"  onClick={()=> {
              handleAddToCart({
                id: id,
                image: thumb,
                name,
                price: retailPrice
              })
            }}>Adaugă în coș</Button>
      </div>
    </div>
  );
}
