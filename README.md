# Contracts

A controlled-state **contracts management table** — multi-select rows with delete actions, built as a **hiring test task for [NiftyHR](https://niftyhr.com)**. They evaluated the implementation and brought me on as **Interim Front-End Developer** shortly after.

📋 *(Live demo: (https://contracts-lake.vercel.app/)*

---

## What it does

- Renders a list of contract entries with structured row data
- **Multi-select** any subset of rows via checkboxes
- Header bar shows real-time selected count
- **Delete selected** with optimistic state update
- Date filtering via `react-datepicker`

## Tech

- **React 19** + **TypeScript**
- **Vite** — dev server + build
- **Sass / SCSS** — scoped styles per component (`/styles`)
- **react-datepicker** — date range filtering
- ESLint + flat config

## Run locally

```bash
git clone https://github.com/B1toks/contracts.git
cd contracts
npm install
npm run dev
```

## What I focused on

The interview brief was deliberately small (one table view) — the evaluation was about clean state management and component composition under realistic constraints. I lifted the selection state to the parent so multi-row deletes stay consistent, kept the table component pure (data in, events out), and pushed actions into a separate `TableActions` component to keep concerns clean.

It was the test task that landed me the [NiftyHR Interim FE role](https://niftyhr.com).

---

Built by **Oleksandr Honchar** · [honchar.dev](https://www.honchar.dev) · [LinkedIn](https://www.linkedin.com/in/honchar-oleksandr/)
