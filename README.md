# AgriTech Mobile Application (Frontend Architecture)

AgriTech is an Android-optimized precision agricultural assistant built using **React Native**, **Expo (SDK 54+)**, **TypeScript**, and **Expo Router**.

This project implements a high-fidelity, production-grade frontend UI layer following a modular, clean **feature-based architecture**. It is prepared for future integrations with a **FastAPI backend** and a dedicated **Weed Detection** ML module.

---

## 📂 Architecture & Directory Structure

All source code resides inside the `src/` directory to enforce clean separation of concerns:

```
weed-app/
├── src/
│   ├── app/                    # Routing layer managed by Expo Router
│   │   ├── (tabs)/             # Bottom tab bar routes
│   │   │   ├── _layout.tsx     # Custom navigation bar with active capsule highlights
│   │   │   ├── index.tsx       # Renders DashboardScreen
│   │   │   ├── gap-detection.tsx # Renders GapDetectionScreen
│   │   │   └── profile.tsx     # Renders ProfileScreen
│   │   └── _layout.tsx         # App entry config (Providers, Theme, Status Bar)
│   │
│   ├── features/               # Domain-specific modules (business boundaries)
│   │   ├── dashboard/          # Dashboard module (greetings, quick links, widgets)
│   │   ├── gap-detection/      # Gap Detection module (upload cards, maps, stats results)
│   │   └── profile/            # Profile module (farmer card, farm details, analytics list)
│   │
│   ├── constants/              # Styling config, color schemes, spacing tokens
│   │   └── theme.ts            # High-fidelity custom color palette and shadows
│   │
│   ├── assets/                 # Graphics and images loaded at runtime
│   │   └── images/             # Map overlays, avatar files, and thumbnails
│   │
│   ├── components/             # Global, generic UI components (shared app-wide)
│   ├── hooks/                  # Global custom hooks (e.g., color scheme state)
│   ├── services/               # System-wide services (API clients, storage engines)
│   └── types/                  # Shared TypeScript models and interface declarations
```

### 🌟 Folder Responsibilities
* **`app/`**: Standard Expo Router file-system paths. Handled separately from UI rendering for easy navigation changes.
* **`features/`**: Code group by domain. Keeps Dashboard, Gap Detection, and future Weed Detection completely decoupled.
* **`constants/theme.ts`**: The visual design tokens (AgriTech green, warning amber, slate backgrounds) supporting light/dark theme schemes.
* **`components/`** and **`hooks/`**: Global reusable items.
* **`services/`**: Location for future API client interfaces connecting to your **FastAPI** backend.

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed on your machine:
* [Node.js (v18+)](https://nodejs.org/)
* [Git](https://git-scm.com/)
* **Expo Go App** (installed on your physical Android device via the Google Play Store)

### ⚙️ Installation
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd weed-app
   ```
2. Install the node modules:
   ```bash
   npm install
   ```

---

## 📱 Running the Application

### 1. Start the Metro Development Server
```bash
npm run start
```
*or*
```bash
npx expo start
```

### 2. Connect Your Android Device
* **Local Connection:** If your computer and phone are on the same local Wi-Fi, open the **Expo Go** app and scan the QR code printed in the terminal.
* **Android Emulator:** Make sure your Android Studio emulator is running, then press **`a`** in your computer's terminal to open it.

---

## 🛠️ Connection Troubleshooting (Firewall/Router Blocks)

If scanning the QR code gets stuck loading or displays a `java.io.IOException` (Failed to download remote update), it means your computer's firewall or Wi-Fi router is blocking the direct local network connection. 

Use one of the following methods to resolve it:

### Method A: Use Tunnel Mode (Ngrok)
Tunneling routes the connection through a secure public web address:
```bash
npx expo start --tunnel
```
*Note: If prompted to install `@expo/ngrok`, type `y` and press Enter.*

### Method B: Use Mobile Hotspot (Highly Recommended)
1. Turn on the **Mobile Hotspot** on your phone.
2. Connect your **computer's Wi-Fi** directly to your phone's hotspot network.
3. Start the bundler normally:
   ```bash
   npm run start
   ```
4. Scan the QR code. This bypasses all external router firewalls completely.

---

## 🔒 Git Configuration & Security (`.gitignore`)

The project contains a pre-configured `.gitignore` file to ensure security and prevent large generated folders from polluting your GitHub repository.

### Key Ignored Paths:
* `node_modules/`: Prevent committing massive external library assets.
* `.expo/` & `dist/`: Locally generated cache folders created during builds.
* `*.jks`, `*.p8`, `*.p12`, `*.key`, `*.pem`, `*.mobileprovision`: Native mobile signing keys and certificates (Crucial to prevent uploading security keys to GitHub).
* `/android` & `/ios`: Locally generated native folders created when running prebuild commands.

Before pushing your changes, confirm your git status is clean:
```bash
git status
```
Only your custom source code files inside `src/` should be listed for staging.
