import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HeroSection } from './components/Hero';
import Home from './pages/Home';
function App() {
  return (
    <Routes>
      <Route path='/' element={<HeroSection />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  );
}

export default App;
