import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './sections/Home';
import Sobre from './sections/Sobre';        
import Servicos from './sections/Servicos';
import PorqueNos from './sections/PorqueNos';
import Parceiros from './sections/Parceiros';
import Contacto from './sections/Contacto';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Home />
        <Sobre />
        <PorqueNos />
        <Servicos />
        <Parceiros />
        <Contacto />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;