# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Event Tracker

## Features
- **Entry Point:** The app opens to the Hero section at `/`.
- **Home Page:** Navigate to `/home` to view and manage events.
- **Dark/Light Mode:** Use the toggle button in the header to switch between dark and light themes.
- **Routing:** Powered by React Router. You can add more pages by editing `App.tsx`.

### How to Use

1. **Start the App**
   - Run `npm install` and `npm run dev` in the `event-fn` directory.
   - Open your browser to the local server (usually `http://localhost:5173/`).

2. **Navigation**
   - The landing page ("Hero Section") welcomes you and provides a button to explore events.
   - Click "Explore Events" or go to `/home` to access the event management page.

3. **Dark/Light Mode**
   - In the header (top bar), click the sun/moon button to toggle between light and dark mode.
   - The theme is applied instantly across the app.

4. **Adding More Routes**
   - Open `src/App.tsx` and add new `<Route path='/your-path' element={<YourComponent />} />` inside the `<Routes>` block.

---

For more details, see the code comments in `App.tsx`, `Hero.tsx`, and `Header.tsx`.
