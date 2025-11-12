import React, { useState } from "react";

export default function UseStateExample4() {
  /**
   * CHALLENGE: Shopping Cart with Functional Updates
   *
   * LEARNING GOALS:
   * - Using functional form of setState
   * - When to use functional updates vs direct updates
   * - Calculating derived values from state
   * - Working with arrays of objects
   *
   * TODO:
   * 1. Create state for: cart (array of {id, name, price, quantity})
   * 2. Implement addToCart() using functional update
   * 3. Implement updateQuantity(id, delta) - increase or decrease quantity
   * 4. Implement removeFromCart(id)
   * 5. Calculate total price (derived value - no state needed!)
   * 6. Handle edge cases (quantity = 0 should remove item)
   */

  const products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 29 },
    { id: 3, name: "Keyboard", price: 79 },
    { id: 4, name: "Monitor", price: 299 },
  ];

  // TODO: Add your state here
  const [cart, setCart] = useState([]);

  // TODO: Implement addToCart using functional update
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingCart = prevCart.find((item) => item.id === product.id);

      if (existingCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // TODO: Implement updateQuantity
  const updateQuantity = (id, delta) => {
    setCart(prevCart=>{
      return prevCart.map(item=>item.id===id ? 
        {...item,quantity:item.quantity+delta} : item
      ).filter(item=>item.quantity>0)
    })
  };

  // TODO: Implement removeFromCart
  const removeFromCart = (id) => {
    setCart(prevCart=>prevCart.filter(item=>item.id!=id))
  };

  const total = cart.reduce((sum,item) => sum + item.quantity * item.price,0);

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">
        useState — Shopping Cart (Functional Updates)
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products Section */}
        <div>
          <h5 className="font-semibold mb-3 text-lg">Products</h5>
          <div className="space-y-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div>
          <h5 className="font-semibold mb-3 text-lg">Cart</h5>
          {/* TODO: Conditional rendering - show message if cart is empty */}
          <div className="space-y-2 mb-4">
            {cart.length > 0 ? (
             cart.map(item => (
               <div className="flex justify-between items-center">
                <span>{item.name}</span>
                <span className="flex gap-x-4 items-center">
                  <button onClick={()=>updateQuantity(item.id,+1)} className="p-1">+</button>
                  <span>{item.quantity}</span>
                  <button onClick={()=>updateQuantity(item.id,-1)} className="p-1">-</button>
                </span>
                <span>{item.price}</span>
                <button onClick={()=>removeFromCart(item.id)}>Remove</button>
              </div>
             ))
            ) : (
              <p className="text-gray-400 italic">Cart is empty</p>
            )}
          </div>

          {/* Total */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>${total ? total : 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
