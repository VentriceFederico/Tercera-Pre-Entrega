//Captar datos de entrada.

const ORIGEN_1 = "BUENOS AIRES";
const ORIGEN_2 = "ROSARIO";
const DESTINO_1 = "MISIONES";
const DESTINO_2 = "MENDOZA";
const DESTINO_3 = "SANTA CRUZ";
const DESTINO_4 = "SALTA";
const DESTINO_5 = "NEUQUEN";
const MILISEGDIA = 24 * 60 * 60 * 1000;



class Viaje {
    constructor(nombre, origen, destino, fechaIda, fechaVuelta, pasajeros, id, precio, estadia) {
        this.nombre = nombre.toUpperCase();
        this.origen = origen.toUpperCase();
        this.destino = destino.toUpperCase();
        this.fechaIda = fechaIda;
        this.fechaVuelta = fechaVuelta;
        this.estadia = estadia;
        this.pasajeros = pasajeros;
        this.precio = precio;
        this.id = id;
    }
    viajePrecio() {
        if (this.origen == ORIGEN_1) {
            switch (this.destino) {
                case DESTINO_1:
                    this.precio = Math.round(30000 * this.pasajeros * (this.estadia * 0.2));
                    break;
                case DESTINO_2:
                    this.precio = Math.round(38000 * this.pasajeros * (this.estadia * 0.2));
                    break;
                case DESTINO_3:
                    this.precio = Math.round(50000 * this.pasajeros * (this.estadia * 0.2));
                    break;
                case DESTINO_4:
                    this.precio = Math.round(53000 * this.pasajeros * (this.estadia * 0.2));
                    break;
                case DESTINO_5:
                    this.precio = Math.round(25000 * this.pasajeros * (this.estadia * 0.2));
                    break;
            }
        }
        else if (this.origen == ORIGEN_2) {
            switch (this.destino) {
                case DESTINO_1:
                    this.precio = Math.round(27000 * this.pasajeros * (this.estadia * 0.1));
                    break;
                case DESTINO_2:
                    this.precio = Math.round(31000 * this.pasajeros * (this.estadia * 0.1));
                    break;
                case DESTINO_3:
                    this.precio = Math.round(45000 * this.pasajeros * (this.estadia * 0.1));
                    break;
                case DESTINO_4:
                    this.precio = Math.round(50000 * this.pasajeros * (this.estadia * 0.1));
                    break;
                case DESTINO_5:
                    this.precio = Math.round(27000 * this.pasajeros * (this.estadia * 0.1));
                    break;
            }
        }
    }
    viajeEstadia(fechaIda, fechaVuelta) {
        let fecha1 = new Date(fechaIda);
        let fecha2 = new Date(fechaVuelta);

        this.estadia = Math.round((Math.abs(fecha1.getTime() - fecha2.getTime()) / MILISEGDIA));
    }
}

const viajes = (JSON.parse(localStorage.getItem("viajes")) ?? []);


function crearViaje() {

    const data = document.querySelector("#form");
    data.addEventListener("submit", (e) => {
        e.preventDefault();
        let id = parseInt((localStorage.getItem("id"))) || 0;
        const datos = e.target.children;
        const viaje = new Viaje(
            datos["nombre"].value,
            datos["origen"].value,
            datos["destino"].value,
            datos["fechaIda"].value,
            datos["fechaVuelta"].value,
            datos["pasajeros"].value,
            id,
            0,
            0,
        )
        viajes.push(viaje);
        viaje.viajeEstadia(viaje.fechaIda, viaje.fechaVuelta);
        viaje.viajePrecio();
        id++;
        localStorage.setItem("viajes", JSON.stringify(viajes));
        localStorage.setItem("id",id);
        data.reset();
        verViaje(viaje);
        Swal.fire({
            title: 'viaje Ingresado!',
            text: 'Buenas vacaciones!!!',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
    })
}

function imprimirViaje() {
    
    viajes.forEach(viaje => {
        verViaje(viaje);
    });
}

function verViaje(viaje){
    let fecha1 = new Date(viaje.fechaIda);
    let fecha2 = new Date(viaje.fechaVuelta);

    const contenedorViajes = document.querySelector("#viajes");
    const tarjetaViaje = document.createElement("div");
        tarjetaViaje.className = "vuelos-tarjeta";
        tarjetaViaje.id = "viaje_tarjeta_" + viaje.id;
        tarjetaViaje.innerHTML = `
                                    <img src="./img/tarjeta_img.jpg" alt="img_tarjeta">
                                    <span class="form-title-barra"></span>
                                    <h3>Titular: ${viaje.nombre}</h3>
                                    <p>Origen: ${viaje.origen}</p>
                                    <p>Destino: ${viaje.destino}</p>
                                    <p>Fecha Ida: ${fecha1.toLocaleDateString("es-AR", {day:"numeric", month:"short", year: "2-digit"})}</p>
                                    <p>Fecha Vuelta: ${fecha2.toLocaleDateString("es-AR", {day:"numeric", month:"short", year: "2-digit"})}</p>
                                    <p>Estadia: ${viaje.estadia} Dias</p>
                                    <p>Cantidad de pasajeros: ${viaje.pasajeros}</p>
                                    <span>$${viaje.precio}</span>
                                `
        contenedorViajes.append(tarjetaViaje);
}

crearViaje();
imprimirViaje();

console.log(viajes);