import { useEffect, useState } from "react";

//Componente principal que sigue el mouse cuando esta activando
const SeguirMouse = () => {
  //Estado para actividar o desactivar el seguimiento del mouse
  const [permitir, setPermitir] = useState(false);
  //Estado para almacenar la posicion actual del mouse
  const [posicion, setPosicion] = useState({ X: 0, Y: 0 });

  //Se ejecuta cuando cambia el estado permitir
  useEffect(() => {
    console.log("efecto", { permitir });

    //Se llama cada vez que se mueve el mouse
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      //Actualiza la posicion
      setPosicion({ X: clientX, Y: clientY });
    };

    //Si el seguimiento esta activado, se agrega el event listener
    if (permitir) {
      window.addEventListener("mousemove", handleMove);
    }
    //Se elimina el event listener cuando se desactiva
    return () => {
      console.log("cleanup");
      window.removeEventListener("mousemove", handleMove);
    };
  }, [permitir]);

  //Oculta el cursor del sistema cuando se activa el seguimiento
  useEffect(() => {
    //Se crea o quita una clase que oculta el cursor
    document.body.classList.toggle("no-cursor", permitir);

    //Siempre elimina la clase al cambiar
    return () => {
      document.body.classList.remove("no-cursor");
    };
  }, [permitir]);

  return (
    <>
      <div
        /* Círculo que sigue la posición del mouse */
        style={{
          position: "absolute",
          backgroundColor: "rgb(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${posicion.X}px, ${posicion.Y}px)`,
        }}
      />
      <button onClick={() => setPermitir(!permitir)}>
        {permitir ? "Desactivar" : "Activar"} Puntero
      </button>
    </>
  );
};
function App() {
  return (
    <main>
      <SeguirMouse />
    </main>
  );
}

export default App;
