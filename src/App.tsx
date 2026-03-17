import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Dashboard from './pages/Dashboard';
import RoomPlanner from './pages/RoomPlanner';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-ivory">
        <Navbar />
        <main className="flex-1 flex flex-col w-full h-full relative isolate">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/planner" element={<RoomPlanner />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
