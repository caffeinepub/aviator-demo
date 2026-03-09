# ✈ Simple Aviator Game (Demo)

A browser-based Aviator-style crash game demo built with React, TypeScript, and Tailwind CSS on the Internet Computer.

## 🎮 About

This is a simple demonstration of an Aviator-style game where:
- The multiplier starts at 1.00x and increases by 0.05 every 100ms
- The plane crashes randomly between 1.00x and 6.00x
- Players can cash out before the crash to "win" at the current multiplier
- Built as a frontend-only demo with no real money or wagering

## 🚀 Local Development

### Prerequisites
- Node.js (v18 or higher)
- pnpm (or npm)
- DFX (Internet Computer SDK)

### Setup & Run Locally

1. **Install dependencies:**
   ```bash
   cd frontend
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm start
   ```

3. **Open your browser:**
   Navigate to **http://localhost:3000** to play the game locally.

The app will hot-reload as you make changes to the source code.

## 🌐 Deploy to Internet Computer

### Prerequisites
- DFX installed and configured
- Internet Computer wallet with cycles

### Deployment Steps

1. **Start the local Internet Computer replica (if testing locally first):**
   ```bash
   dfx start --background
   ```

2. **Deploy the canisters:**
   ```bash
   dfx deploy
   ```

3. **Get your frontend canister URL:**
   After deployment completes, DFX will output the canister URLs. Look for:
   ```
   Frontend canister via browser:
     frontend: http://127.0.0.1:4943/?canisterId=<CANISTER_ID>
   ```

4. **For mainnet deployment:**
   ```bash
   dfx deploy --network ic
   ```
   
   Your app will be available at:
   ```
   https://<CANISTER_ID>.ic0.app
   ```

### Finding Your Deployed URL

- **Local deployment:** Check the output of `dfx deploy` for the localhost URL with canister ID
- **Mainnet deployment:** Your URL will be `https://<frontend-canister-id>.ic0.app`
- **Get canister ID anytime:** Run `dfx canister id frontend`

## 🎨 Features

- **Dark "Night Sky Cockpit" Theme:** Immersive space-inspired design with mint/emerald accents
- **Smooth Animations:** Pulsing multiplier display and floating plane icon
- **Responsive Design:** Works beautifully on desktop and mobile devices
- **Clear Instructions:** Built-in how-to-play guide
- **No Backend Required:** Pure frontend demo (backend canister is empty)

## 🛠 Tech Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS with custom OKLCH color system
- **UI Components:** Shadcn/ui (Radix primitives)
- **Fonts:** Orbitron (display) + Inter (body)
- **Platform:** Internet Computer (ICP)

## 📝 Notes

- This is a **demo only** - no real money, no gambling, no persistent state
- Random number generation uses JavaScript's `Math.random()` (not cryptographically secure)
- No user accounts, leaderboards, or game history
- The crash point is generated client-side for demonstration purposes

## 🤝 Contributing

This is a demo project. Feel free to fork and modify for your own learning purposes.

## 📄 License

MIT License - feel free to use this code for learning and experimentation.
