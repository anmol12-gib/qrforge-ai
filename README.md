# QRForge AI

**Premium QR Code Generator & QR Toolkit** — a production-quality, client-side web application built as a portfolio project.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)

---

## Features

- **9 QR Types** — URL, Text, Email, Phone, SMS, WiFi, vCard, Calendar Event, Location
- **Live Preview** — Instant QR updates as you type
- **Full Customization** — Colors, size (128–1024px), margin, error correction, rounded modules
- **Logo Embedding** — Upload PNG/JPG/SVG with auto-scale
- **Export** — Download PNG/SVG, copy image, copy link, native share
- **History** — Last 10 codes saved in localStorage
- **Premium UI** — Glassmorphism, gradients, Framer Motion animations
- **Accessible** — ARIA labels, keyboard navigation, focus states, skip link
- **Responsive** — Desktop, tablet, mobile, large screens
- **100% Client-Side** — No backend, privacy-first

---

## Project Structure

```
qrforge-ai/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── generator/     # QR generator, forms, preview, share, history
│   │   ├── layout/        # Header, Hero, Features, FAQ, Footer
│   │   └── ui/            # Reusable UI primitives
│   ├── lib/
│   │   ├── download.ts    # PNG/SVG export & clipboard
│   │   ├── qrFormats.ts   # QR payload encoding (WiFi, vCard, etc.)
│   │   ├── qrRenderer.ts  # Canvas QR rendering with logo & rounded modules
│   │   └── storage.ts     # localStorage helpers
│   ├── store/
│   │   └── useQRStore.ts  # Zustand global state
│   ├── types/
│   │   └── index.ts       # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

### 1. Create the project (if starting fresh)

```bash
npm create vite@latest qrforge-ai -- --template react-ts
cd qrforge-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```bash
npm run build
```

Output is written to the `dist/` folder.

### 5. Preview production build

```bash
npm run preview
```

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Vite.

### Option B — GitHub Integration

1. Push your code to GitHub (see below)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New Project**
4. Import your GitHub repository
5. Framework Preset: **Vite**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**

---

## Push to GitHub

```bash
# Initialize git (if not already)
git init

# Stage all files
git add .

# Commit
git commit -m "feat: QRForge AI — premium QR code generator"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/qrforge-ai.git
git branch -M main
git push -u origin main
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 8 | Build tool & dev server |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| Zustand | State management |
| qrcode + qrcode.react | QR generation |
| react-colorful | Color pickers |

---

## Developer

**Full Name:** Anmol Virmani  
**Email:** anmol.virmani@gmail.com  
**Built for:** [Digital Heroes](https://digitalheroesco.com)

---

## License

MIT
