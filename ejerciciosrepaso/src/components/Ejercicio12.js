/* Agenda de Contactos  
Crea una agenda donde el usuario pueda agregar, eliminar y filtrar contactos por  nombre. 
 */
import React, { useState } from "react";

function Ejercicio12(){
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [filtro, setFiltro] =  useState('');
    const [contactos, setContactos] = useState([]);


    function agregarContacto(evento){
        evento.preventDefault();

        const nuevoContacto={nombre, telefono};
        setContactos([...contactos, nuevoContacto]);
        setNombre('');
        setTelefono('');
    }

    function eliminarContacto(indice){
        const contactosRestantes = contactos.filter(function(_, i){
            return i !== indice;
        });
        setContactos(contactosRestantes);
    }
    
    function filtrarContactos(){
        return contactos.filter(contacto => contacto.nombre.indexOf(filtro) !== -1);
    }

    return(

        
    )




}
















































/* import React, { useState } from "react";

function Ejercicio12(){
    const [contactos, setContactos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [filtro, setFiltro] = useState('');

    function agregarContacto(event) {
        event.preventDefault(); // Corregido preventDefault

        const nuevoContacto = { nombre, telefono };
        setContactos([...contactos, nuevoContacto]);
        setNombre('');
        setTelefono('');
    }

    function eliminarContacto(indice) {
        const contactosRestantes = contactos.filter(function(_, i) {
            return i !== indice;
        });
        setContactos(contactosRestantes);
    }

    function filtrarContactos() {
        return contactos.filter(contacto => contacto.nombre.indexOf(filtro) !== -1);
    }

    return (
        <div>
            <h1>Agenda Contactos</h1>

            <form onSubmit={agregarContacto}>

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
                        type="text"
                        placeholder="Telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)} 
                    />
                </div>

                <button type="submit">Agregar Contacto</button>

                <div>
                    <input
                        type="text"
                        placeholder="Filtrar por nombre"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)} 
                    />
                </div>
            </form>

            <h2>Lista de Contactos</h2>
            <ul>
                {filtrarContactos().map((contacto, indice) => (
                    <li key={indice}>
                        {contacto.nombre} - {contacto.telefono}
                        <button onClick={function() {
                            eliminarContacto(indice);
                        }}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Ejercicio12;
  */