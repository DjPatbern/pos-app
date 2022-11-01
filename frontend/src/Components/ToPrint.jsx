import React from "react";

export const ToPrint = React.forwardRef((props, ref) => {
    const{cart,totalAmount} = props;
    return (
      <div ref={ref} className="p-5 print">
        <h1 className="text-center">RECEIPT</h1>
         <h3 className="text-center">Shanice's Kitchen Stores</h3>
         <p className="text-center">No.1 Line-C, Marian Market,Calabar</p>
            <table className="table">
              <thead>
                <tr>
                  
                  <td>Name</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {cart
                  ? cart.map((cartProduct, key) => (
                      <tr key={key}>
                        
                        <td>{cartProduct.name}</td>
                        <td>{cartProduct.price}</td>
                        <td>{cartProduct.quantity}</td>
                        <td>{cartProduct.totalAmount}</td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
            <h5 className="px-2">Total→ ₦ {totalAmount} </h5>
      </div>
    );
  });
