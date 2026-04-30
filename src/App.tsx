import { useState } from 'react'
import './App.css'

type Ingredient = {
  name: string
  quantity: number | null
  unit: string | null
}

function App() {
  const [recipeInput, setRecipeInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!recipeInput.trim()) return
    setLoading(true)
    setError('')
    setIngredients([])

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe: recipeInput }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      setIngredients(data.ingredients || [])
    } catch (err) {
      setError('Network error — try again')
    } finally {
      setLoading(false)
    }
  }

  const formatIngredient = (ing: Ingredient) => {
    const parts = []
    if (ing.quantity !== null) parts.push(ing.quantity)
    if (ing.unit) parts.push(ing.unit)
    parts.push(ing.name)
    return parts.join(' ')
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
            {loading ? 'Reading the recipe…' : 'Find me a shopping plan'}
          </button>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {ingredients.length > 0 && (
          <div className="ingredients">
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((ing, i) => (
                <li key={i}>{formatIngredient(ing)}</li>
              ))}
            </ul>
          </div>
        )}

        <footer>Rego Park, Queens · v0</footer>
      </section>
    </>
  )
}

export default App
