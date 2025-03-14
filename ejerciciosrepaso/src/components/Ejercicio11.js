/* Formulario con Validación  
Modifica el formulario de nombre y edad para que: 
• No permita nombres vacíos. 
• La edad sea un número mayor a 0. 
 */

import { use, useState } from "react";

function Ejercicio11(){
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const[error, setError] = useState('');

  function manejaError(evento){
    evento.preventDefault();
    if(nombre.trim() === ''){

      setError("El nombre no puede estar vacio");
      return;
    }

    const numeroEdad = Number(edad);

    if(numeroEdad <=0 || numeroEdad === ''){
      setError("La edad no puede estar vacia y no puede ser menor o igual a 0");
      return;
    }

    setError('');
  }

  return(
    <div>
      <form onSubmit={manejaError}>
        <div>
          <input type="text" value={nombre} onChange={function (entrada){ setNombre(entrada.target.value)}}/>
        </div>

        <div>
          <input type="number" value={edad} onChange={function (entrada){ setEdad(entrada.target.value)}}/>
        </div>

        <p>{error}</p>

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Ejercicio11;

































/* function Ejercicio11(){
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [error, setError] = useState('');
    

    function manejaError(event){
        event.preventDefault();
        if(nombre.trim() === ''){
            setError('El nombre no puede estar vacio');
            return;
        }

        const edadNumero = Number(edad);

        if(edadNumero <= 0 || edadNumero === ''){
            setError('La edad no puede estar vacía y tampoco puede ser menor a 0');
            return;
        }

        setError('');
    }

    return (
        <div>
          <form onSubmit={manejaError}>
            <div>
              <input 
                type="text" 
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
    
            <div>
              <input 
                type="number" 
                placeholder="Edad" 
                value={edad} 
                onChange={(e) => setEdad(e.target.value)} 
              />
            </div>
    
            <p style={{ color: 'red' }}>{error}</p>
    
            <div>
              <button type="submit">Enviar</button>
            </div>
          </form>

            <div>
              <h2>Valores Ingresados:</h2>
              <p>Nombre: {nombre}</p>
              <p>Edad: {edad}</p>
            </div>
        </div>
      );
}

export default Ejercicio11;
 */
