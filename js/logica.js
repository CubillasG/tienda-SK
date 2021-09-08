let producto = ''
let carrito = []
const listadoDeProductos = document.getElementById('listadoDeProductos')
const btnComprar = document.getElementById('btnComprar')
const cursosEnCarrito = document.getElementById('cursosEnCarrito')
const btnVerCarrito = document.getElementById('btnVerCarrito')
const grillaDetalleCheckOut = document.getElementById('grillaDetalleCheckOut')
const checkOut = document.getElementById('checkOut')
const btnVolver = document.getElementById('btnVolver')





//producto = new Producto(carrito)
 
document.addEventListener('DOMContentLoaded', () => {cargoProductos()})



const cargoProductos = () =>{
    //debugger
    listadoDeProductos.innerHTML = ''
      for(let producto of PRODUCTOS){
       let fila = `<div>
                        <img src="${producto.imagen}"/>
                        <p>${producto.tipo}</p>
                        <p>$ ${producto.precio}</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" onclick="agregoProductoAlCarrito(${producto.productoid})">Comprar</button>
                </div>`

                listadoDeProductos.innerHTML += fila
               

      } 
      producto = new Producto(carrito)   
 }

const agregoProductoAlCarrito = (id) =>{
    let r = PRODUCTOS.find(p =>p.productoid == id)
    carrito.push(r)
    console.table(r)
    actualizoCarrito()
    localStorage.setItem('agregoProductos', JSON.stringify(PRODUCTOS))
 }

 const actualizoCarrito = () => {
    let leyendaCarrito = `<span id="cursosEnCarrito">Productos agregados: ${carrito.length}</span>`
    cursosEnCarrito.innerHTML = leyendaCarrito
  }

  const armoCheckOut = () =>{
    //debugger
    let fila = ''
      grillaDetalleCheckOut.innerHTML = ''
      for(let producto of carrito){
        fila = ` <tr>
                   <td class="parte3">${producto.tipo}</td>
                   <td class="parte4">$ ${producto.precio}</td>

                </tr>`
                grillaDetalleCheckOut.innerHTML += fila

      }

        fila = `<tr>
                 <td class="parte3">Total de la compra:</td>
                 <td class="parte4">$ ${producto.calculoTotalCarrito()}</td>

            </tr>`
            grillaDetalleCheckOut.innerHTML += fila

      fila = `<tr>
                <td class="parte3">Total con descuento:</td>
                <td class="parte4">$ ${producto.calculoTotalCarrito() - producto.calculoDescuentoAplicado()}</td>

              </tr>`
              grillaDetalleCheckOut.innerHTML += fila

      fila = `<tr>
              <td class="parte3">Total a pagar:</td>
              <td class="parte4">$ ${producto.calculoDescuentoAplicado()}</td>

            </tr>`     
            grillaDetalleCheckOut.innerHTML += fila
            alternarListado()
  }

  const alternarListado = () =>{
    listadoDeProductos.classList.toggle('visually-hidden-focusable')
    checkOut.classList.toggle('visually-hidden-focusable')
  }

btnVerCarrito.addEventListener('click', armoCheckOut)
btnVolver.addEventListener('click',alternarListado)
    
const finalizarCompra = () =>{
  alert('Gracias por su compra, vuelva pronto!')
  setTimeout(() => {
    carrito = []
    actualizoCarrito()
    alternarListado() 
  }, 2500);
}
btnComprar.addEventListener('click', finalizarCompra)

//SUSCRIPCION:
let armarDOM = (elemento, tag)=>{
    const el = document.getElementById(elemento)
    el.appendChild(tag)
}

const inputCorreo = document.createElement('input')
      inputCorreo.id = 'correo',
      inputCorreo.type = 'email'
      inputCorreo.placeholder = 'ingrese su correo'
      armarDOM('formulario', inputCorreo)

      const buttonGuardar = document.createElement('button')
            buttonGuardar.id = 'btnGuardar'
            buttonGuardar.innerText = 'Guardar'
            buttonGuardar.classList = 'btn btn-primary'
            
          
            armarDOM('formulario', buttonGuardar)

            buttonGuardar.onclick = guardarDato

      function guardarDato() {
        const campoFormulaio = {email: ""}
              campoFormulaio.email = inputCorreo.value
           localStorage.setItem('campoFormulario', JSON.stringify(campoFormulaio))
      }


//JQuery:

const desplazarMe = (titulo) => {
  $('html, body').animate({
     scrollTop: $(`#${titulo}`).offset().top
  }, 200)
}

$('#link1').click(()=> {desplazarMe("titulo1")})
$('#link2').click(()=> {desplazarMe("titulo2")})
$('#link3').click(()=> {desplazarMe("titulo3")})

$('#titulo2').click(()=> {desplazarMe("link1")})
$('#titulo3').click(()=> {desplazarMe("link1")})

//VA A SALIR!

// Hola Fer!!!te comento que integre AJAX con Jquery, pero lo deje en esta porcion de codigo (NO ME MATES!!!!):

const obtengoProductos =()=> {
    $.ajax({
      url: "js/productos.json",
        success: function(response) {
        debugger
      let productJSON = response;
      listadoDeProductos.innerHTML = ''
      for(let ropa of productJSON){
                let fila = `<div>
                            <img src="${ropa.imagen}"/>
                            <p>${ropa.tipo}</p>
                            <p>$ ${ropa.precio}</p>
                            <button type="button" class="btn btn-primary" data-toggle="modal" onclick="agregoProductoAlCarrito(${ropa.productoid})">Comprar</button>
                            </div>`

                            listadoDeProductos.innerHTML += fila   
      }
      

    },
      error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}

