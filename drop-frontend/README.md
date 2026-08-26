# DROP — Coffee Shop App (Starter Scaffold)

Rebrand of the Savoré restaurant project into DROP, a premium specialty coffee shop.
Espresso Black / Warm Walnut / Caramel / Cream palette — no Emerald/Gold carried over.

## What's included in this zip (complete frontend)

**Foundation**
- `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`
- `src/theme/theme.js` — MUI theme: palette, Fraunces/Figtree typography, pill buttons, shadow-only cards, caramel focus rings
- `src/styles/global.css` — CSS custom properties, font imports, base reset, `prefers-reduced-motion` handling

**State (Redux Toolkit)**
- `src/redux/cartSlice.js`, `favoritesSlice.js`, `uiSlice.js`, `store.js`

**Mock data** (swap for real API calls once backend exists)
- `src/data/coffees.js` — 16 menu items across Espresso Based / Cold Brew / Specialty / Seasonal
- `src/data/reviews.js`, `src/data/faqs.js`

**Shared components**
- `Navbar` — scroll blur, animated active-link underline, cart badge, favorites icon, mobile drawer
- `Footer` — hours, location, newsletter, socials
- `Hero` — staggered entrance, floating steam + bean decor
- `CoffeeCard` — hover lift/zoom, favorite toggle, add to cart
- `MenuFilters` — shared-layout category chips + expanding search
- `CartDrawer` — slide-in, staggered items, animated count-up total
- `ReviewCard`, `AnimatedNumber`, `PageTransition` (fade + blur + y route transitions)

**Pages** (all wired into React Router in `App.jsx`)
- `/` Home — Hero + featured picks
- `/menu` Menu — filters, search, grid
- `/coffee/:id` Coffee Detail — parallax hero, tabs, reviews, quantity + milk picker
- `/checkout` Checkout — validated form (shake on error), payment method cards, coupon field, order summary, success state
- `/favorites` Favorites — reflow animation on remove
- `/order-tracking` Order Tracking — animated fill timeline, breathing active step
- `/contact` Contact — info cards, map placeholder, stagger form
- `/about` About — brand story + pillars
- `/faq` FAQ — accordion
- `*` 404 — floating illustration

Verified with a real `vite build` — compiles clean.

## To run

```bash
npm install
npm run dev
```

## Not included yet (backend)

- Express server, MongoDB models, JWT auth, role system
- Real-time order updates via Socket.io
- Admin Dashboard + Recharts (revenue, orders, popular/best-rated coffees)
- Email templates
- PWA icons (manifest is wired, icon image files still need to be added)

Sab frontend ready hai — ab agla batch backend + admin dashboard hoga jab tum ready ho.
