// ----SELECTORES----
$('.encabezado').hide()
$('.encabezado').slideDown(1500)
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('.carrito_compras')
const divProductos = document.querySelector('#divProductos')
const listaProductos = document.querySelector(".lista_productos")
const comprarButton = document.querySelector('.comprarButton');
let articulosCarrito = [];

// ----LISTENERS----
$('.shopping-cart').hide()

listaProductos.addEventListener('click', agregarProductos)
document.addEventListener('DOMContentLoaded', () =>{

  $.ajax({
    url: './stock.json',
    success: function (data, status, xhr) {
      stockProductos = data;
      cargarListaProductos(data);
      console.log("bien")
      // console.log(xhr)
    },
    error: function (xhr, status, errorThrown) {
      console.log(xhr)
      console.log(status)
      console.log(errorThrown)
    }
  });
 
  articulosCarrito = JSON.parse(localStorage.getItem('carrito')) ||[];
  insertarCarritoHTML()

})
carrito.addEventListener('click', quitarProducto);


// ---FUNCIONES---

function cargarListaProductos(productos) {
 
  $('#lista-productos').hide();
  productos.forEach((producto) => {

    // const { nombre, imagen, precio, id, vendedor } = producto;

    const divCard = document.createElement('div');
   
    divCard.innerHTML = `
    <div class="col mb-4">
    <div class="item card producto">
        <div class="cover cover-small" style="background-image: ${producto.imagen}">
        </div>
        <div class="card-body">
            <h3 class="card-title">${producto.nombre}</h3>
            <p class="descripcion">${producto.descripcion}</p>
            <h4 class="precio_producto"><strong>$${producto.precio}</strong></h4>
            <button class="agregar"data-id="${producto.id}">Agregar al carrito</button>
            <div class="elegir">
                <label>Color</label">
                    <select data-id="${producto.value}"name="color" id="color">
                        <option value="rojo">Rojo</option>
                        <option value="amarillo">Amarillo</option>
                        <option value="cyan">Cyan</option>
                        <option value="magenta">Magenta</option>
                    </select>
            </div>
        </div>
    </div>
</div>
    `
      const row = document.querySelector('#prueba');
      row.appendChild(divCard);
     
  })

}

function quitarProducto(e) {
  if (e.target.classList.contains('buttonDelete')) {
    const productoId = e.target.getAttribute('data-id');
   
    articulosCarrito = articulosCarrito.filter(producto => producto.id != productoId);

    insertarCarritoHTML();
    updateShoppingCartTotal();
    guardarStorage();
  }
}

function agregarProductos (e) {
  $('.shopping-cart').show()
  $('.btn-cart').hide()
  e.preventDefault();
  if(e.target.classList.contains('agregar')){
    const productoSeleccionado = e.target.parentElement.parentElement;
    obtenerDatos(productoSeleccionado);
    updateShoppingCartTotal();
  }
}

function obtenerDatos (producto){
 
   const productoAgregado = {
     nombre: producto.querySelector('.card-title').textContent,
     precio: producto.querySelector('.precio_producto').textContent,
     descripcion: producto.querySelector('.descripcion').textContent,
     id: producto.querySelector('.agregar').getAttribute('data-id'),
     cantidad: 1
     
   }
   
   const existe = articulosCarrito.some(producto => producto.id == productoAgregado.id);

   if (existe) {
   
     const productos = articulosCarrito.map(producto => {
       if (producto.id === productoAgregado.id) {
         producto.cantidad++;
         return producto;
       } else {
         return producto;
       }
     });
     articulosCarrito = [...productos];
   } else {
 
     articulosCarrito.push(productoAgregado);
   }
 
   insertarCarritoHTML();
   guardarStorage()
   updateShoppingCartTotal()
 }

 function guardarStorage() {
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
 
}


function    insertarCarritoHTML() {
  limpiarCarrito ();

  articulosCarrito.forEach (producto => {
    const {nombre, precio, cantidad, id} = producto
  const crearDiv = document.createElement('div')
  crearDiv.innerHTML= `
  <div class="row shoppingCartItem">
         <div class="col-6">
             <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">

                 <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${nombre}</h6>
             </div>
         </div>
         <div class="col-2">
             <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                 <p class="item-price mb-0 shoppingCartItemPrice">${precio}</p>
             </div>
         </div>
         <div class="col-4">
             <div
             class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
             <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                 value=${cantidad}>
                <button class="btn  buttonDelete" data-id="${id}"type="button">X</button>
               
             </div>
             
         </div>
     </div>`;
 
  contenedorCarrito.appendChild(crearDiv)

  crearDiv.querySelector('.buttonLess')
  crearDiv.addEventListener('change', quantityChanged);
 
  })
 
}

function updateShoppingCartTotal() {
 
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );

    const shoppingCartItemPrice = parseInt(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    console.log(shoppingCartItemPrice)

    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = parseInt(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
  guardarStorage()
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}
function limpiarCarrito () {
  // contenedorCarrito.innerHTML=``;
  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}

$('.btn-cart').click(function(){
  $('.shopping-cart').show()
  if($('.shopping-cart').show()) {
    $('.btn-cart').hide()
  }
});

$('#btn-llamar').click(function(){
  $('#modalform').modal({backdrop:'static', keyboard:false})
});

$('.btn-cerrar, .btn-modal-finalizado').click(function() {
 setTimeout(function(){
location.reload()

 })
})


// -------GALERIA-----
document.querySelectorAll('.contenedor-modal .overlay').forEach((el) => {
  el.addEventListener('click', function (ev) {
    ev.stopPropagation();
    this.parentNode.classList.add('active');
  });
});
document.querySelectorAll('.contenedor-modal ').forEach((el) => {
  el.addEventListener('click', function (ev) {
    this.classList.remove('active');
  });
});

