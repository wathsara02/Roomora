# 🛋️ Roomora

**Plan in 2D. Experience in 3D.**

Roomora is an interactive room planning and furniture visualization app built for an HCI & Computer Graphics module. It lets users design floor layouts on a 2D canvas, then instantly switch to an immersive 3D view to see exactly how their room will look — before buying a single piece of furniture.

🌐 **Live Demo:** [roomora.vercel.app](https://roomora.vercel.app) *(or your deployed URL)*

---

## ✨ Features

| Feature | Details |
|---|---|
| **2D Room Editor** | Drag-and-drop furniture placement on a scaled grid |
| **3D Visualizer** | Real-time 3D rendering with lighting, shadows & wall colors |
| **Smart Walls** | Backface-culled walls — see inside the room without obstruction |
| **Furniture Catalog** | 18+ items across Seating, Beds, Tables, Storage & Decor |
| **Style Themes** | Modern Scandinavian, Industrial, etc. |
| **Room Settings** | Adjust room width, length, and ceiling height on the fly |
| **Export Layout** | Download your full room design as a structured JSON file |
| **Project Dashboard** | Create, name, and manage multiple room designs |
| **Fully Responsive** | Mobile-first design, works on all screen sizes |

---

## 🔧 Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4
- **3D Engine:** React Three Fiber (R3F) + Drei
- **State Management:** Zustand
- **Routing:** React Router v7
- **3D Models:** Procedural (code-generated) — no heavy GLTF files

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/wathsara02/Roomora.git
cd Roomora

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Navbar, Footer, Logo
│   └── planner/        # Editor2D, Viewer3D, Sidebar, Toolbar, PropertiesPanel
│       └── furniture/  # ProceduralModels (3D furniture components)
├── pages/              # Home, Catalog, Dashboard, RoomPlanner
├── store/              # Zustand global store (useStore.ts)
├── types/              # TypeScript interfaces
└── lib/                # Utility functions
```

---

## 🛠️ Deployment

This project is deployed on **Vercel** with a `vercel.json` configuration for SPA routing.

To deploy your own fork:
1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — no extra config needed
4. Click **Deploy** ✅

---

## 📸 Screenshots

| Home | Catalog | 3D Planner |
|---|---|---|
| *(Add screenshots here)* | *(Add screenshots here)* | *(Add screenshots here)* |

---

## 📖 Academic Context

This project was developed as part of a **Human-Computer Interaction (HCI) & Computer Graphics** module coursework. Key focus areas:

- **HCI Principles:** Intuitive drag-and-drop interaction, consistent visual hierarchy, responsive design
- **3D Graphics:** Procedural mesh generation, real-time lighting, backface culling for smart walls
- **Usability:** Empty state handling, immediate visual feedback, cross-device support

---

## 📜 License

This project is for educational purposes.

---

*Built with ❤️ for HCI Coursework*
