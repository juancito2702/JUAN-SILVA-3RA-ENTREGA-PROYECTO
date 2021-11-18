// JUAN LUIS SILVA RIOS
//TERCERA ENTREGA DE MI PROYECTO FINAL ----------------------------------------------------------------------------------------------------------------------------


//ARRAY DE MIS SILICONAS CON JQUERY----------------------------------------------------------------------------------------------------------------------------
let carrito = [];
let productosJSON = [];
mostrarSiliconas();

$("#miSeleccion").on('change', function() {
    ordenar();
});
$("#miSeleccion option[value='pordefecto']").attr("selected", true);



//FUNCIÓN PARA MOSTRAR MIS PRODUCTOS---------------------------------------------------------------------------------------------------------------------------

function mostrarSiliconas() {
    for (const producto of productosJSON) {
        $(".siliconasTop10").append(`<li class="col-sm-2 md-6 mx-3 my-4 list-group-item">
        <h3 style="display: none"> ID: ${producto.id} </h3>
        <img src=${producto.foto} class="col-sm-9 md-9 mx-4 my-4 width="200" height="200">
        <p> Producto: ${producto.nombre}</p>
        <p><strong> $ ${producto.precio} </strong></p>
        <button class='btn btn-danger' id='btn${producto.id}'>Comprar</button>
        </li>`);


        $(`#btn${producto.id}`).on('click', function() {
            agregarAlCarrito(producto);
        });
    }
}


class productoCarrito {
    constructor(obj) {
        this.id = obj.id;
        this.foto = obj.foto;
        this.nombre = obj.nombre;
        this.precio = obj.precio;
        this.cantidad = 1;
    }
}


//FUNCIÓN DE AGREGAR AL CARRITO USANDO LA LIBRERÍA DE JQUERY----------------------------------------------------------------------------------------------------

function agregarAlCarrito(productoNuevo) {
    let encontrado = carrito.find(prod => prod.id == productoNuevo.id);
    if (encontrado == undefined) {
        let productoNuevos = new productoCarrito(productoNuevo);
        carrito.push(productoNuevos);
        console.log(carrito);
        Swal.fire(
            'Nuevo producto agregado al carro',
            productoNuevo.nombre,
            'success'
        );
        $("#listaDeProductos").append(`
    <tr id='fila${productoNuevos.id}'>
        <td>${productoNuevos.id}</td>
        <td>${productoNuevos.nombre}</td>
        <td id='${productoNuevos.id}'>${productoNuevos.cantidad}</td>
        <td>${productoNuevos.precio}</td>
        <td><button class='btn btn-light' id='elimina${productoNuevos.id}'>🗑️</button>
    </tr>`);
        $(`#elimina${productoNuevos.id}`).click(function() {

            let posEliminar = carrito.findIndex(p => p.id == productoNuevos.id);
            carrito.splice(posEliminar, 1);
            $(`#fila${productoNuevos.id}`).remove();
            console.log(carrito);
        });

    } else {
        let posicion = carrito.findIndex(p => p.id == productoNuevo.id);
        carrito[posicion].cantidad += 1;
        $(`#${productoNuevo.id}`).html(carrito[posicion].cantidad);
        console.log(carrito);
    }
    $("#gastoTotal").html(`Tu Total en soles Peruanos: $${calcularMontoTotal()}`);
}

//FUNCIÓN PARA ORDENAR MIS SILICONAS POR CATEGORÍAS----------------------------------------------------------------------------------------------------------

function ordenar() {
    let seleccion = $("#miSeleccion").val();

    if (seleccion == "menor") {

        productosJSON.sort(function(a, b) { return a.precio - b.precio });
    } else if (seleccion == "mayor") {

        productosJSON.sort(function(a, b) { return b.precio - a.precio });
    } else if (seleccion == "alfabetico") {

        productosJSON.sort(function(a, b) {
            return a.nombre.localeCompare(b.nombre);
        });
    }
    $("li").remove();
    mostrarSiliconas();
}


//BOTÓN PARA FINALIZAR LA COMPRA DE MI CARRITO, USANDO LA LIBRERÍA DE JQUERY--------------------------------------------------------------------------------

$("#boton").prepend("<button class='btn btn-danger' onclick='finalizar();'>FINALIZAR COMPRA.</button>");

const finalizar = () => {
    Swal.fire(
        'DIOS JESÚS Te Bendiga 💖 Gracias por tu compra!',
    )
}


//APLIACIÓN DE ANIMACIÓN CONCATENADA EN INFORMACIÓN DE SILICONAS--------------------------------------------------------------------------------------------


$("#muestraParrafo").click(function() {
    $("#parrafo").fadeIn("slow");
});

$("#ocultaParrafo").click(function() {
    $("#parrafo").fadeOut("fast", function() {});
});


//APLICACIÓN DE AJAX- UTILIZANDO UN API DE PERSONAS---------------------------------------------------------------------------------------------------------------


function clientesFrecuentes() {
    const URLGET = "https://reqres.in/api/users?page=2";
    $.get(URLGET).done(function(respuesta, estado) {
        console.log("La Api de Clientes Frecuentes es: " + estado);

        if (estado == "success") {
            let arrayLibros = respuesta.data;
            arrayLibros.forEach(empleado => {
                $("#equipo").append("<tr><td>" + empleado.first_name + "<tr><td>" + empleado.email + "</td><td><img src=" + empleado.avatar + "></td></tr>");
            });
        }
    });
}
clientesFrecuentes();



// MI JSON LOCAL DE MI EQUIPO DE TRABAJO-------------------------------------------------------------------------------------------------------------------------


const miJSON = "colaboradores.json";
$("#empleados").prepend('<button id="miBoton">CONOCE AL EQUIPO DE TRABAJO.</button>');
$("#miBoton").click(() => {
    $.getJSON(miJSON, function(respuesta, estado) {
        if (estado == "success") {
            let misEmpleados = respuesta.usuarios;
            for (const empleado of misEmpleados) {
                $("#empleados").prepend(`<div>
                <h3>${empleado.nombre}</h3>
                <p>${empleado.puesto}</p>
                <h4>${empleado.foto}</h4>
                </div>`);
            }
        }
    });
});


//APLICACIÓN DE ANIMACIÓN CON IMÁGEN DE SALUDO-----------------------------------------------------------------------------------------------------------------

$("#juancito27").hide();

$("#muestraOculta").click(function() {
    $("#juancito27").fadeToggle(1000, function() {
        if ($("#muestraOculta").html() == "Ocultar Imagen") {
            $("#muestraOculta").html("Mostrar Imagen");
        } else {
            $("#muestraOculta").html("Ocultar Imagen");
        }
    });
})




// NUEVO ARRAY CON PRODUCTOS.JSON---------------------------------------------------------------------------------------------------------

const AJAX = "siliconas.json";
$.getJSON(AJAX, function(respuesta, estado) {
    if (estado == "success") {
        productosJSON = respuesta;
        console.log(productosJSON);
        mostrarSiliconas();
    }
});




//FUNCIÓN PARA CALCULAR EL MONTO TOTAL A PAGAR POR LOS PRODUCTOS-------------------------------------------------------------------------

function calcularMontoTotal() {
    let suma = 0;
    for (const elemento of carrito) {
        suma = suma + (elemento.precio * elemento.cantidad);
    }
    return suma;
}