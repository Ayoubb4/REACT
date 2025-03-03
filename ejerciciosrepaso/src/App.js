import './App.css';
import Ejercicio1 from './components/Ejercicio1';
import Ejercicio2 from './components/Ejercicio2';
import Ejercicio3 from './components/Ejercicio3';
import Ejercicio4 from './components/Ejercicio4';

function App() {
  return (
    <div className="App">
      <Ejercicio1 />
      <Ejercicio2 nombre="Ayoub" />
      <Ejercicio3 />
      <Ejercicio4 />

    </div>
  );
}

export default App;
