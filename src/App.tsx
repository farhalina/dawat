import { useState } from 'react'
import './App.css'

function App() {
  const [recipeInput, setRecipeInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!recipeInput.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    alert('Stubbed — chunk two will make this real')
  }

  return (
    <>
      <section id="center">
        <h1>Dawat</h1>
        <p className="tagline">
          Paste a recipe. We'll find you the smartest place to shop.
        </p>

        <div className="input-area">
          <textarea
            value={recipeInput}
            onChange={(e) => setRecipeInput(e.target.value)}
            placeholder="Paste a recipe URL, or type ingredients..."
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !recipeInput.trim()}
          >
            {loading ? 'Thinking…' : 'Find me a shopping plan'}
          </button>
        </div>

        <footer>Rego Park, Queens · v0</footer>
      </section>
    </>
  )
}

export default App
