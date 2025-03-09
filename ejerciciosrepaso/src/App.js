import './App.css';
import React, { useState } from 'react';

import Ejercicio1 from './components/Ejercicio1';
import Ejercicio2 from './components/Ejercicio2';
import Ejercicio3 from './components/Ejercicio3';
import Ejercicio4 from './components/Ejercicio4';
import Ejercicio5 from './components/Ejercicio5';
import Ejercicio6 from './components/Ejercicio6';
import Ejercicio7 from './components/Ejercicio7';
import Ejercicio8 from './components/Ejercicio8';
import Ejercicio9 from './components/Ejercicio9';
import Padre from './components/Ejercicio10.js/Padre';
import Ejercicio11 from './components/Ejercicio11';
import Ejercicio12 from './components/Ejercicio12';
import Ejercicio13 from './components/Ejercicio13';
import Ejercicio14 from './components/Ejercicio14';
import Clima from './components/Ejercicio15/Clima'
import FechaHoy from './components/Ejercicio15/FechaHoy'
import { AgendaProvider } from './components/Ejercicio16/AgendaPadre';
import Contactos from './components/Ejercicio16/Contactos'; // Componente para mostrar los contactos
import Citas from './components/Ejercicio16/Citas'; // Componente para mostrar las citas
import Ejercicio17 from './components/Ejercicio17';
import Ejercicio18 from './components/Ejercicio18';
import Ejercicio19 from './components/Ejercicio19';
import Prueba1 from './components/Prueba1';



function App() {
  const [cambiarColorFondo, setCambiarColorFondo] = useState('white'); // Iniciamos el color en blanco

  return (
    <div
      className="App"
      style={{
        backgroundColor: cambiarColorFondo,
        color: cambiarColorFondo === 'black' ? 'white' : 'black',
        height: "100%",
        width: "100%"
      }}>
      <Ejercicio1 />
      <Ejercicio2 nombre="Ayoub" />
      <Ejercicio3 />
      <Ejercicio4 />
      <Ejercicio5 color={'red'} setColorFondo={setCambiarColorFondo} />
      <Ejercicio6 />
      <Ejercicio7 setColorFondo={setCambiarColorFondo} /> 
      <Ejercicio8 />
      <Ejercicio9 />

      <div className='Ejercicio10'>
      <h1>Ejercicio10</h1>
      <Padre />
      </div>

      <Ejercicio11/>
      <Ejercicio12/>
      <Ejercicio13/>
      <Ejercicio14/>
      <Clima/>
      <FechaHoy/>

      <AgendaProvider> 
      <div>
        <h1>Mi Agenda</h1>
        <Contactos />
        <Citas />
      </div>
    </AgendaProvider>

    <Ejercicio17/>
    <Ejercicio18/>
    <Ejercicio19/>  



    <Prueba1/>
    </div>

    
  );
}

export default App;
