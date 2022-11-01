import React from "react";
import { useEffect } from "react";
import axios from "axios";
import MainLayout from "../Layout/MainLayout";
import { useState } from "react";
import { toast } from 'react-toastify';
import { ToPrint } from "../Components/ToPrint";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';



function POSPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0)

  const toastOptions = {
    autoClose: 1200,
    pauseOnHover: true
  }

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get("http://localhost:5000/products/");
    setProducts(await result.data);
    setIsLoading(false);
  };

  const addProductToCart = async (product) => {
    //Check if added Product exist
    let findProductCart = await cart.find((i) => {
      return i.id === product.id;
    });

    if (findProductCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to list`,toastOptions)
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to list`,toastOptions)
    }
  };

  const removeProduct = async(product) => {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart)
  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  })

  function handlePrint(){
    handleReactToPrint()
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let newTotalAmout = 0;
    cart.forEach(icart => {
        newTotalAmout = newTotalAmout + parseInt(icart.totalAmount);
    })
    setTotalAmount(newTotalAmout)
  },[cart])

  return (
    <MainLayout>
      <div className="row">
        <div className="col-lg-8">
          {isLoading ? (
            "Loading"
          ) : (
            <div className="row">
              {products.map((product, key) => (
                <div key={key} className="col-lg-4 mb-4">
                  <div
                    className="pos-item px-3 text-center border"
                    onClick={() => addProductToCart(product)}
                  >
                    <p>{product.name}</p>
                    <img
                      src={product.image}
                      className="img-fluid"
                      alt={product.name}
                    />
                    <p>₦{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-lg-4">
            <div style={{display: "none"}}>
                <ToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
            </div>
          <div className="table-responsive bg-dark">
            <table className="table table-responsive table-dark table-hover">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Qty</td>
                  <td>Total</td>
                  <td>Act</td>
                </tr>
              </thead>
              <tbody>
                {cart
                  ? cart.map((cartProduct, key) => (
                      <tr key={key}>
                        <td>{cartProduct.id}</td>
                        <td>{cartProduct.name}</td>
                        <td>{cartProduct.price}</td>
                        <td>{cartProduct.quantity}</td>
                        <td>{cartProduct.totalAmount}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => removeProduct(cartProduct)}>
                            X
                          </button>
                        </td>
                      </tr>
                    ))
                  : "No Selected Item Yet"}
              </tbody>
            </table>
            <h5 className="px-2 text-white">Total→ ₦ {totalAmount} </h5>
          </div>
          <div className="mt-3">
            {
                totalAmount ? <div>
                    <button className="btn btn-primary" onClick={handlePrint}>
                        Pay Now
                    </button>
                </div> : "Please Add A Product To The List"
            }
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default POSPage;
