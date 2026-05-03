import { useState } from 'react'

type Ingredient = {
  name: string
  quantity: number | null
  unit: string | null
}

const EXAMPLE_RECIPES = [
  {
    label: 'Chicken tikka masala',
    text: `Chicken Tikka Masala

1.5 lb boneless skinless chicken thighs
1 cup plain yogurt
2 tbsp lemon juice
2 tsp garam masala
1 onion, diced
4 cloves garlic, minced
1 inch fresh ginger
1 28-oz can crushed tomatoes
1/2 cup heavy cream
2 cups basmati rice
salt and pepper to taste`,
  },
  {
    label: 'Weeknight pasta',
    text: `Weeknight Pasta

1 lb spaghetti
4 cloves garlic, minced
1/4 cup olive oil
1 tsp red pepper flakes
1/2 cup grated parmesan
1 lemon, zested
fresh parsley
salt and pepper`,
  },
  {
    label: 'Khichuri',
    text: `Bengali Khichuri

1 cup basmati rice
1/2 cup yellow moong dal
2 tbsp ghee
1 onion, diced
1 inch fresh ginger
1 tsp turmeric
1 tsp cumin seeds
2 bay leaves
4 cardamom pods
3 cups water
salt to taste`,
  },
]

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
    } catch {
      console.error('Extract failed')
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

  const buttonLabel = loading
    ? 'Reading the recipe…'
    : !recipeInput.trim()
    ? 'Paste a recipe first'
    : 'Find me a shopping plan'

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl flex flex-col items-center gap-7">

        {/* Header */}
        <header className="text-center">
          <h1
            className="text-7xl font-medium tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Dawat
          </h1>
          <p
            className="text-sm mt-4 italic"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-muted)' }}
          >
            an invitation to the table.
          </p>
        </header>

        {/* Tagline + try chips (only show before extraction) */}
        {ingredients.length === 0 && (
          <div className="text-center flex flex-col items-center gap-4">
            <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--color-text)' }}>
              Paste a recipe and we'll show you the smartest way to shop it in your neighborhood.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>
                Try:
              </span>
              {EXAMPLE_RECIPES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => setRecipeInput(ex.text)}
                  className="text-xs px-3 py-1.5 rounded-full transition-colors"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)'
                    e.currentTarget.style.color = 'var(--color-text)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.color = 'var(--color-text-muted)'
                  }}
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="w-full flex flex-col gap-3">
          <textarea
            value={recipeInput}
            onChange={(e) => setRecipeInput(e.target.value)}
            placeholder="Paste a recipe URL, or type ingredients..."
            className="w-full min-h-32 p-4 rounded-xl text-sm resize-y focus:outline-none transition-colors"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-sans)',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !recipeInput.trim()}
            className="w-full py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: 'var(--color-accent)',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              if (!loading && recipeInput.trim()) {
                e.currentTarget.style.background = 'var(--color-accent-hover)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)'
            }}
          >
            {buttonLabel}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            className="w-full p-4 rounded-xl text-sm text-center"
            style={{
              background: 'var(--color-error-bg)',
              color: 'var(--color-error)',
              border: '1px solid #6a2a2a',
            }}
          >
            {error}
          </div>
        )}

        {/* Ingredients */}
        {ingredients.length > 0 && (
          <div
            className="w-full p-6 rounded-xl"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Ingredients
            </h2>
            <ul className="flex flex-col">
              {ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="py-2 text-sm"
                  style={{
                    borderBottom: i < ingredients.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  {formatIngredient(ing)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <footer
          className="mt-6 text-xs tracking-wider"
          style={{ color: 'var(--color-text-faint)' }}
        >
          Rego Park, Queens · v0
        </footer>
      </div>
    </main>
  )
}

export default App
