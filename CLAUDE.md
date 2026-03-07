# CLAUDE.md

## Project Summary

"Who Wins?" — A Vue 3 + Vite app where users pit two animals against each other in a hypothetical battle. Google Gemini AI generates stats, fun facts, and a winner. Wikipedia provides animal images. Supabase handles auth and fight history persistence.

## Essential Commands

```bash
npm run dev      # Start dev server (port 5174)
npm run build    # Production build
npm run preview  # Preview production build
```

## Environment Variables

Required in `.env` (prefixed with `VITE_` for client exposure):

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Key File Locations

| Purpose | Location |
|---------|----------|
| Entry point | `src/main.js` |
| Root component | `src/App.vue` |
| Router | `src/router.js` |
| Global styles | `src/style.css` |
| **Components** | |
| Battle orchestrator | `src/components/BattleArena.vue` |
| Animal name input | `src/components/AnimalInput.vue` |
| Animal result card | `src/components/AnimalCard.vue` |
| Stats visualization | `src/components/StatsComparison.vue` |
| Individual stat bar | `src/components/StatBar.vue` |
| Winner/draw display | `src/components/WinnerAnnouncement.vue` |
| Loading state | `src/components/LoadingBattle.vue` |
| Navigation bar | `src/components/NavBar.vue` |
| Sign in / sign up | `src/components/AuthPage.vue` |
| Fight history list | `src/components/FightHistory.vue` |
| **Services** | |
| Gemini AI integration | `src/services/gemini.js` |
| Wikipedia image fetch | `src/services/wikipedia.js` |
| Supabase client | `src/services/supabase.js` |
| **Composables** | |
| Auth state & methods | `src/composables/useAuth.js` |
| Fight save & fetch | `src/composables/useFights.js` |

## Architecture

### Routing (Vue Router)
- `/` — BattleArena (eager loaded)
- `/auth` — AuthPage (lazy loaded)
- `/history` — FightHistory (lazy loaded)

### Auth (Supabase Auth)
- Email/password sign up and sign in
- Shared reactive state via `useAuth()` composable (module-level refs)
- `onAuthStateChange` listener keeps `user` ref in sync
- App works fully for non-authenticated users — they just can't save fights

### Fight Persistence (Supabase `fights` table)
- Auto-saves after battle if user is signed in
- Stores both animals' stats, special abilities, fun facts, image URLs, winner, and explanation
- Row Level Security: users can only view/insert/delete their own fights
- `useFights()` composable provides `saveFight`, `fetchFights`, `deleteFight`

### Supabase Setup (SQL)

Run this in the Supabase SQL Editor to set up the `fights` table:

```sql
CREATE TABLE fights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  animal1_name TEXT NOT NULL,
  animal1_stats JSONB NOT NULL,
  animal1_special_ability_name TEXT NOT NULL,
  animal1_fun_facts TEXT[] NOT NULL DEFAULT '{}',
  animal1_image_url TEXT,
  animal2_name TEXT NOT NULL,
  animal2_stats JSONB NOT NULL,
  animal2_special_ability_name TEXT NOT NULL,
  animal2_fun_facts TEXT[] NOT NULL DEFAULT '{}',
  animal2_image_url TEXT,
  winner TEXT NOT NULL,
  explanation TEXT NOT NULL,
  is_draw BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_fights_user_id_created_at ON fights(user_id, created_at DESC);

ALTER TABLE fights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own fights" ON fights FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own fights" ON fights FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own fights" ON fights FOR DELETE USING (auth.uid() = user_id);
```

### Component Hierarchy

```
App.vue
├── NavBar.vue (brand, nav links, auth controls)
└── <router-view>
    ├── BattleArena.vue (/)
    │   ├── AnimalInput.vue (x2)
    │   ├── LoadingBattle.vue
    │   ├── AnimalCard.vue (x2)
    │   ├── StatsComparison.vue
    │   │   └── StatBar.vue (x5 per animal)
    │   └── WinnerAnnouncement.vue
    ├── AuthPage.vue (/auth)
    └── FightHistory.vue (/history)
```

### Data Flow
1. User enters two animal names → `BattleArena` reactive state
2. Click FIGHT → parallel fetch: Gemini battle result + Wikipedia images
3. Results render via child components
4. If signed in, fight auto-saves to Supabase; otherwise shows "Sign in to save" link
5. `/history` fetches and displays saved fights with delete option

## Tech Stack
- **Vue 3** (Composition API, `<script setup>`)
- **Vite** (dev server + build)
- **Google Gemini 2.5 Flash** (battle generation)
- **Wikipedia API** (animal images)
- **Supabase** (auth + PostgreSQL + RLS)
- **Vue Router 4** (client-side routing)

## Code Style
- Vue Composition API with `<script setup>`
- Scoped CSS with BEM-like naming (`component__element--modifier`)
- CSS variables for theming (defined in `style.css`)
- Font: Fredoka (Google Fonts)
- Responsive breakpoint: 600px
