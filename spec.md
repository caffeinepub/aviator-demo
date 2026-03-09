# Specification

## Summary
**Goal:** Build a single-page Aviator-style crash game demo with a minimal UI, a dark “night sky cockpit” Tailwind theme, and bundled static image assets.

**Planned changes:**
- Implement the crash-game loop in the React + TypeScript frontend: multiplier starts at 1.00x, increases by 0.05 every 100ms while running, and crashes at a randomly chosen point between 1.00x and 6.00x.
- Add Start and Cash Out controls with correct state handling (cannot start while already running) and show the outcome text exactly as “Crashed at …x” or “Cashed out at …x” (2 decimals).
- Apply a cohesive dark “night sky cockpit” visual theme using Tailwind with a non-blue/non-purple primary accent; keep layout minimal (title, multiplier, controls, result).
- Add generated static image assets under `frontend/public/assets/generated` and render at least one image in the UI (e.g., header icon or subtle background).
- Add documentation with clear local run steps and Internet Computer deployment steps, including the local URL and how to find/open the deployed frontend canister URL after `dfx deploy`.

**User-visible outcome:** Users can open a single-page demo, press Start to watch the multiplier rise until a random crash, optionally Cash Out before the crash, and see the result text; the page uses a consistent dark theme and displays a bundled static image, with docs explaining how to access it locally and after deployment.
