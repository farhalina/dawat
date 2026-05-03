import { Link } from 'react-router-dom'

type Guest = {
  initials: string
  name: string
  avatarBg: string
  avatarText: string
  tag?: { label: string; bg: string; color: string }
  isYou?: boolean
}

const GUESTS: Guest[] = [
  { initials: 'JS', name: 'You', avatarBg: '#F0997B', avatarText: '#4A1B0C', isYou: true },
  { initials: 'MR', name: 'Maya', avatarBg: '#AFA9EC', avatarText: '#26215C',
    tag: { label: 'GF', bg: '#FCEBEB', color: '#791F1F' } },
  { initials: 'DK', name: 'Dev', avatarBg: '#5DCAA5', avatarText: '#04342C',
    tag: { label: 'veg', bg: '#E1F5EE', color: '#085041' } },
  { initials: 'AL', name: 'Aisha', avatarBg: '#EF9F27', avatarText: '#412402',
    tag: { label: 'halal', bg: '#FAEEDA', color: '#854F0B' } },
  { initials: 'TC', name: 'Tom', avatarBg: '#F09595', avatarText: '#501313' },
  { initials: 'SR', name: 'Sam', avatarBg: '#85B7EB', avatarText: '#042C53' },
]

type MenuItem = {
  title: string
  source: string
  cover: string
  cost: string
}

const MENU: MenuItem[] = [
  {
    title: 'Maple-glazed turkey',
    source: 'From @smittenkitchen · You\'ll cook',
    cover: 'linear-gradient(135deg, #BA7517, #D85A30)',
    cost: '$42.18',
  },
  {
    title: 'Roasted brussels + pomegranate',
    source: 'Maya\'s recipe · Vegan friendly',
    cover: 'linear-gradient(135deg, #97C459, #639922)',
    cost: '$11.40',
  },
  {
    title: 'Cornbread stuffing (GF)',
    source: 'Custom · Substituted for Maya',
    cover: 'linear-gradient(135deg, #F0997B, #D85A30)',
    cost: '$8.90',
  },
  {
    title: 'Brown butter apple pie',
    source: 'From @halfbakedharvest · Sam will bring',
    cover: 'linear-gradient(135deg, #ED93B1, #D4537E)',
    cost: '$14.20',
  },
]

export default function Host() {
  return (
    <main className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Top nav */}
        <nav className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="text-2xl font-medium tracking-tight"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}
          >
            Dawat
          </Link>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
           <Link to="/" className="hover:opacity-70 transition-opacity">Discover</Link>
          <span style={{ color: 'var(--color-text)' }}>Host</span>
          <span className="hover:opacity-70 transition-opacity cursor-pointer">Albums</span>
          <span className="hover:opacity-70 transition-opacity cursor-pointer">Profile</span>
          </div>
        </nav>

        {/* Page header */}
        <header className="mb-6">
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: 'var(--color-text-faint)' }}
          >
            My dawats · Private
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1
                className="text-4xl font-medium tracking-tight"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}
              >
                Friendsgiving 2026 🍂
              </h1>
              <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
                Sat Nov 21 · 6 guests · 4 recipes · Hosted by you
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                Share invite
              </button>
              <button
                className="px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: 'var(--color-accent)',
                  color: 'white',
                }}
              >
                + Add recipe
              </button>
            </div>
          </div>
        </header>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_0.85fr] gap-3">

          {/* Column 1 — Menu + Guests */}
          <section className="flex flex-col gap-3">

            {/* Guests card */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                  Going · 6
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>
                  3 with restrictions
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {GUESTS.map((g) => (
                  <div
                    key={g.initials}
                    className="flex items-center gap-1.5 rounded-full pl-1 pr-3 py-1"
                    style={{ background: 'var(--color-surface-2)' }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-medium"
                      style={{ background: g.avatarBg, color: g.avatarText }}
                    >
                      {g.initials}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--color-text)' }}>
                      {g.name}
                    </span>
                    {g.tag && (
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded ml-0.5"
                        style={{ background: g.tag.bg, color: g.tag.color }}
                      >
                        {g.tag.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Menu card */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <p className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
                  Menu · 4 recipes
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>
                  Adjusted for 6 servings
                </p>
              </div>
              {MENU.map((item, i) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 px-4 py-3"
                  style={{
                    borderBottom: i < MENU.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0"
                    style={{ background: item.cover }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {item.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      {item.source}
                    </p>
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    {item.cost}
                  </p>
                </div>
              ))}
            </div>

            {/* Smart shop card */}
            <Card>
              <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-text)' }}>
                Smart shop · 2 stores
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div
                className="rounded-lg p-3"
                style={{ background: 'var(--color-success-bg)' }}
              >
                <p className="text-xs" style={{ color: '#7fc9a3' }}>NetCost</p>
                <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--color-success)' }}>
                  $48.20
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: '#7fc9a3' }}>
                  10 items · 8 min walk
                </p>
              </div>
                <div
                  className="rounded-lg p-3"
                  style={{ background: 'var(--color-surface-2)' }}
                >
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Foodtown</p>
                  <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--color-text)' }}>
                    $28.48
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    5 items · 2 min walk
                  </p>
                </div>
              </div>
              <p className="text-[11px] mt-3" style={{ color: 'var(--color-success)' }}>
                Saves $9.40 vs single-store · Skip Trader Joe's
              </p>
            </Card>

          </section>

          {/* Column 2 — Cost Split */}
          <section className="flex flex-col gap-3">
            <Card>
              <p className="text-xs font-medium" style={{ color: 'var(--color-text-faint)' }}>
                Per-person breakdown — coming next chunk
              </p>
            </Card>
            <div
            className="rounded-xl p-4"
            style={{
              background: 'var(--color-highlight-bg)',
              border: '1px solid var(--color-highlight-border)',
            }}
          >
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-highlight-text)' }}>
              $12.78 / person
            </p>
            <p className="text-xs" style={{ color: 'var(--color-highlight-muted)' }}>
              Comparison stat will go here
            </p>
          </div>
          </section>

          {/* Column 3 — Friend Activity */}
          <section>
            <Card>
              <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-text)' }}>
                What friends ate
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>
                Live feed — coming next chunk
              </p>
            </Card>
          </section>

        </div>
      </div>
    </main>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {children}
    </div>
  )
}
