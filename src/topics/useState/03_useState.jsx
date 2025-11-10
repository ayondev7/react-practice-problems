import React, {useState} from 'react'

export default function UseStateExample3(){
  /**
   * CHALLENGE: Multi-Step Form with Object State
   * 
   * LEARNING GOALS:
   * - Managing complex object state
   * - Updating nested properties immutably
   * - Form validation
   * - Conditional rendering based on step
   * 
   * TODO:
   * 1. Create state for: step (number) and formData (object)
   * 2. formData shape: { name: '', email: '', password: '', age: '' }
   * 3. Implement handleChange() - update formData based on input name
   * 4. Implement nextStep() and prevStep()
   * 5. Implement validation for each step before allowing next
   * 6. Show summary on final step
   */

  // TODO: Add your state here
  // const [step, setStep] = useState(1)
  // const [formData, setFormData] = useState({...})

  // TODO: Implement handleChange function
  const handleChange = (e) => {
    // Update formData object immutably using spread operator
    // Access field name via e.target.name
  }

  // TODO: Implement nextStep function with validation
  const nextStep = () => {
    // Validate current step before proceeding
    // Step 1: name must not be empty
    // Step 2: email must contain @
    // Step 3: password must be at least 6 chars, age must be a number
  }

  // TODO: Implement prevStep function
  const prevStep = () => {
    // Decrease step (don't go below 1)
  }

  // TODO: Implement submit function
  const handleSubmit = () => {
    // Show alert or console.log the formData
  }

  return (
    <div className="card">
      <h4 className="text-xl font-bold mb-4">useState — Multi-Step Form (Object State)</h4>
      
      {/* Progress indicator */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
              ${/* TODO: Add conditional className - blue if step >= num, gray otherwise */ 'bg-gray-300'}`}>
              {num}
            </div>
            {num < 4 && <div className="flex-1 h-1 bg-gray-300 mx-2"></div>}
          </div>
        ))}
      </div>

      {/* TODO: Conditionally render based on step */}
      {/* STEP 1: Name input */}
      {/* Use: step === 1 && (...) */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          // TODO: Add value and onChange
        />
      </div>

      {/* STEP 2: Email input */}
      {/* Use: step === 2 && (...) */}

      {/* STEP 3: Password and Age inputs */}
      {/* Use: step === 3 && (...) */}

      {/* STEP 4: Summary/Review */}
      {/* Use: step === 4 && (...) */}
      {/* Display all formData values */}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button 
          onClick={prevStep}
          // TODO: Add disabled prop (disable if step === 1)
          className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        
        {/* TODO: Show "Next" button for steps 1-3, "Submit" for step 4 */}
        <button 
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}
