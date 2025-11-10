import React, {useState} from 'react'

export default function UseStateExample4(){
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
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 },
    { id: 4, name: 'Monitor', price: 299 },
  ]

  // TODO: Add your state here
  // const [cart, setCart] = useState([])

  // TODO: Implement addToCart using functional update
  const addToCart = (product) => {
    // Check if product already in cart
    // If yes, increase quantity
    // If no, add with quantity 1
    // Use: setCart(prevCart => ...)
  }

  // TODO: Implement updateQuantity
  const updateQuantity = (id, delta) => {
    // Use functional update
    // If quantity becomes 0, remove the item
  }

  // TODO: Implement removeFromCart
  const removeFromCart = (id) => {
    // Filter out the item with matching id
  }

  // TODO: Calculate total price (no useState needed!)
  // Use: const total = cart.reduce(...)
  const total = 0

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useState — Shopping Cart (Functional Updates)</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products Section */}
        <div>
          <h5 className="font-semibold mb-3 text-lg">Products</h5>
          <div className="space-y-2">
            {products.map(product => (
              <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
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
            {/* TODO: Map over cart items */}
            {/* Each item should show:
                - Name and price
                - Quantity with +/- buttons
                - Remove button
                - Subtotal (price * quantity)
            */}
            <p className="text-gray-400 italic">Cart is empty</p>
          </div>

          {/* Total */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>${/* TODO: Display calculated total */}0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
