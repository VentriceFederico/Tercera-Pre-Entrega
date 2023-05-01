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

const viajesLiterales = (JSON.parse(localStorage.getItem("viajes")) ?? []);
const viajes = [];

viajesLiterales.forEach((viaje) => {
    viajes.push(new Viaje(
        viaje.nombre,
        viaje.origen,
        viaje.destino,
        viaje.fechaIda,
        viaje.fechaVuelta,
        viaje.pasajeros,
        viaje.id,
        viaje.precio,
        viaje.estadia
    ))
})

console.log(viajes);

function imprimirViaje() {
    const contenedorViajes = document.querySelector("#viajes");
    viajes.forEach(viaje => {
        const tarjetaViaje = document.createElement("div");
        tarjetaViaje.className = "vuelos-tarjeta";
        tarjetaViaje.id = "viaje_tarjeta_" + viaje.id;
        tarjetaViaje.innerHTML = `
                    <img src="./img/tarjeta_img.jpg" alt="img_tarjeta">
                    <span class="form-title-barra"></span>
                    <form id="form_editar_${viaje.id}" class="vuelos-tarjeta-formulario">
                        <label for="nombre">Titular</label>
                        <input id="nombre" type="text" class="vuelos-tarjeta-formulario-input" value="${viaje.nombre}">
                        <label for="fechaIda">Fecha Ida</label>
                        <input id="fechaIda" type="date" class="vuelos-tarjeta-formulario-input" value="${viaje.fechaIda}">
                        <label for="fechaVuelta">Fecha Vuelta</label>
                        <input id="fechaVuelta" type="date" class="vuelos-tarjeta-formulario-input" value="${viaje.fechaVuelta}">
                        <label for="origen">Origen</label>
                        <input id="origen" list="Origen" class="form-input" value="${viaje.origen}">
                        <datalist id="Origen">
                            <option value="BUENOS AIRES"></option>
                            <option value="ROSARIO"></option>
                        </datalist>
                        <label for="destino">Destino</label>
                        <input id="destino" list="Destino" class="form-input" value="${viaje.destino}">
                        <datalist id="Destino">
                            <option value="MISIONES"></option>
                            <option value="MENDOZA"></option>
                            <option value="SANTA CRUZ"></option>
                            <option value="SALTA"></option>
                            <option value="NEUQUEN"></option>
                        </datalist>
                        <label for="pasajeros">Pasajeros</label>
                        <input id="pasajeros" type="number" class="vuelos-tarjeta-formulario-input" value="${viaje.pasajeros}">
                        <p>Estadia: ${viaje.estadia} Dias</p>
                        <button class="btn">Editar</button>
                    </form>
                    <button id="btn_Borrar_${viaje.id}" class="btn">Borrar</button>
                    <span class="precio">$${viaje.precio}</span>
                                `
        contenedorViajes.append(tarjetaViaje);
        borrarViaje(viaje.id);
        editarViaje(viaje.id);
    });
}

function borrarViaje(id) {
    const borrarViajeBtn = document.querySelector("#btn_Borrar_" + id);
    borrarViajeBtn.addEventListener("click", () => {
        const index = viajes.findIndex((e) => e.id == id);
        viajes.splice(index,1);
        console.log(viajes);
        localStorage.setItem("viajes", JSON.stringify(viajes));
        const borrarTarjeta = document.querySelector("#viaje_tarjeta_" + id);
        borrarTarjeta.remove();
        Swal.fire({
            title: 'Se elimino con exito',
            icon: 'success',
            timer: 2000
          })
    })
}

function editarViaje(id){
    const editarViajeBtn = document.querySelector("#form_editar_" + id);
    editarViajeBtn.addEventListener("submit", (e) => {
        let fecha1, fecha2;
        const index = viajes.findIndex((e) => e.id == id);
        const data = e.target.children;
        fecha1 = data["fechaIda"].value;
        fecha2 = data["fechaVuelta"].value;
        console.log(fecha1, fecha2);
        viajes[index].nombre = (data["nombre"].value).toUpperCase();
        viajes[index].origen = data["origen"].value;
        viajes[index].destino = data["destino"].value;
        viajes[index].pasajeros = data["pasajeros"].value;
        viajes[index].fechaIda = fecha1;
        viajes[index].fechaVuelta = fecha2;
        viajes.forEach(viaje => {
            viaje.viajeEstadia(fecha1, fecha2);
            viaje.viajePrecio();
        })

        localStorage.setItem("viajes", JSON.stringify(viajes));
        Swal.fire({
            title: 'Cambios en su viaje!',
            icon: 'info',
            confirmButtonText: 'Cool'
          })
    })
}

console.log(viajes);
imprimirViaje();