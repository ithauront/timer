# Timer – Countdown App

This is a timer application built with **React**, **TypeScript**, **Vite**, and **Styled-Components** as part of my frontend learning journey.

The project simulates task cycles with countdowns. It features state management with React Context and Reducers, form validation with Zod, and persistence with `localStorage`.

---

## 🌐 Live Preview

[![View on GitHub Pages](https://img.shields.io/badge/Live%20Preview-Click%20Here-blue?style=for-the-badge)](https://ithauront.github.io/timer/)

Or access directly: [https://ithauront.github.io/timer/](https://ithauront.github.io/timer/)

---

## 🚀 Technologies Used

- **React**
- **TypeScript**
- **Vite**
- **React Hook Form**
- **Zod** (schema validation)
- **Styled-Components**
- **Phosphor Icons**
- **React Router DOM**
- **Immer** (for immutable state updates)
- **Date-fns**
- **ESLint**

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ithauront/timer

# Enter the project directory
cd timer

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🧩 Features

   Add tasks and start a countdown

   Pause or interrupt the timer

   Automatically mark tasks as completed when time ends

   Task list history

   Timer state is persisted on page reload using localStorage

   Form validation with Zod and react-hook-form

   Modular state management using React Context + useReducer

  Project linted with ESLint

## 💾 Local Storage

The timer's cycle state is saved and restored using localStorage, enabling the app to remember your timer and task history even after refreshing or closing the page.
```bash
localStorage.setItem('@ignite-timer:cycles-state-1.0.0', JSON.stringify(state))
```
## 📚 What I Learned

While building this project, I practiced:

   Managing global state with Context + useReducer

  Persisting data locally via localStorage

   Validating forms using zod + react-hook-form

  Styling with styled-components

  Using useEffect for time-based updates

  Structuring reusable components and clean architecture

  Setting up a project with Vite + ESLint + TypeScript


