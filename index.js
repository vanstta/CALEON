//La app es de una tienda de productos de diseño
//La idea es crear un objeto donde se alojen las especificaciones de cada producto y una lista que los agrupe según tipo(todos los cuadernos, todos los cuadros)
//Por otro lado solicitar datos al usuario y guardarlos en un array
// ----------------PRODUCTOS------------------
function Producto(unNombre, unColor, unaMedida, unPrecio) {
  this.Nombre = unNombre;
  this.Color = unColor;
  this.Precio = unPrecio;
  this.Medida = unaMedida;
}

let producto1 = new Producto("cuaderno", "rojo", "A6", 699.99);
let producto2 = new Producto("cuaderno", "amarillo", "A6", 699.99);
let producto3 = new Producto("cuaderno", "cyan", "A6", 699.99);
let producto4 = new Producto("cuaderno", "magenta", "A6", 699.99);
let producto5 = new Producto("Cuadro", "rojo", "a4", 999.99);
let producto6 = new Producto("Cuadro", "amarillo", "a4", 999.99);
let producto7 = new Producto("Cuadro", "cyan", "a4", 999.99);
let producto8 = new Producto("Cuadro", "magenta", "a4", 999.99);
let producto9 = new Producto("Cuadro", "rojo", "a1", 1499.99);
let producto10 = new Producto("Cuadro", "amarillo", "a1", 1499.99);
let producto11 = new Producto("Cuadro", "cyan", "a1", 1499.99);
let producto12 = new Producto("Cuadro", "magenta", "a1", 1499.99);
let producto13 = new Producto("Lampara", "rojo", "unico", 1999.99);
let producto14 = new Producto("Lampara", "amarillo", "unico", 1999.99);
let producto15 = new Producto("Lampara", "cyan", "unico", 1999.99);
let producto16 = new Producto("Lampara", "magenta", "unico", 1999.99);
let producto17 = new Producto("Espejo", "rojo", "unico", 2499.99);
let producto18 = new Producto("Espejo", "amarillo", "unico", 2499.99);
let producto19 = new Producto("Espejo", "cyan", "unico", 2499.99);
let producto20 = new Producto("Espejo", "magenta", "unico", 2499.99);
let producto21 = new Producto("mesa", "rojo", "unico", 5499.99);
let producto22 = new Producto("mesa", "amarillo", "unico", 5499.99);
let producto23 = new Producto("mesa", "cyan", "unico", 5499.99);
let producto24 = new Producto("mesa", "magenta", "unico", 5499.99);
let producto25 = new Producto("silla", "rojo", "unico", 3499.99);
let producto26 = new Producto("silla", "amarillo", "unico", 3499.99);
let producto27 = new Producto("silla", "cyan", "unico", 3499.99);
let producto28 = new Producto("silla", "magenta", "unico", 3499.99);

let cuaderno = [producto1, producto2, producto3, producto4];
let cuadro = [
  producto5,
  producto6,
  producto7,
  producto8,
  producto9,
  producto10,
  producto11,
  producto12,
];
let lampara = [producto13, producto14, producto15, producto16];
let espejo = [producto17, producto18, producto19, producto20];
let mesa = [producto21, producto22, producto23, producto24];
let silla = [producto25, producto26, producto27, producto28];
let listaDeProductos = [cuaderno, cuadro, lampara, espejo, mesa, silla];
console.log(listaDeProductos);

//  let cliente = [nombreCliente, documento, correo]
//  let nombreCliente
//  nombreCliente = prompt ("Ingrese su nombre completo")
//  let documento
//  documento = prompt ("Ingrese su DNI")
//  let correo
//  correo = prompt ("Ingrese su e-mail")

//  console.log (cliente)
// --------------CARRITO-------------
$('.encabezado').hide()
$('.encabezado').slideDown(1500)
const agregarAlCarrito = document.querySelectorAll(".agregar");

agregarAlCarrito.forEach((botonAgregar) => {
  botonAgregar.addEventListener("click", productoAgregado);

});
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);
const divCarrito = document.querySelector(".cart");


function productoAgregado(event) {
  const boton = event.target;
  const item = boton.closest(".item");
  const tituloItem = item.querySelector(".card-title").textContent;
  const precioItem = item.querySelector(".precio_producto").textContent;
  $('.shopping-cart').show()
 agregarItem (tituloItem, precioItem);


}

function agregarItem (tituloItem, precioItem)  {
  
    const elementsTitle = divCarrito.getElementsByClassName(
        'shoppingCartItemTitle'
      );
      for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === tituloItem) {
          let elementQuantity = elementsTitle[
            i
          ].parentElement.parentElement.parentElement.querySelector(
            '.shoppingCartItemQuantity'
          );
          elementQuantity.value++;
          $('.toast').toast('show');
          updateShoppingCartTotal();
          return;
        }
      }

   const crearDiv = document.createElement('div');
   const contenidoCarrito =  `
   <div class="row shoppingCartItem">
         <div class="col-6">
             <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">

                 <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${tituloItem}</h6>
             </div>
         </div>
         <div class="col-2">
             <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                 <p class="item-price mb-0 shoppingCartItemPrice">${precioItem}</p>
             </div>
         </div>
         <div class="col-4">
             <div
                 class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                 <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                     value="1">
                 <button class="btn btn-danger buttonDelete" type="button">X</button>
             </div>
         </div>
     </div>`;

     crearDiv.innerHTML = contenidoCarrito;
     divCarrito.append(crearDiv);
     
  crearDiv
  .querySelector('.buttonDelete')
  .addEventListener('click', removeShoppingCartItem);

  crearDiv
  .querySelector('.shoppingCartItemQuantity')
  .addEventListener('change', quantityChanged);
    
  updateShoppingCartTotal()

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
  }
  
  function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
  }
  
  function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
  }
function comprarButtonClicked() {
    divCarrito.innerHTML = '';
    updateShoppingCartTotal();
    alert("Su compra se realizó correctamente")
  }


  // GALERIA

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

  // AGREGO CON JQUERY LA FUNCIONALIDAD DE OCULTAR EL CARRITO Y QUE SOLO APAREZCA AL AGREGAR UN PRODUCTO. LO HAGO MEDIANTE SHOW Y HIDE. EL SHOW SE ENCUENTRA EN LA FUNCIÓN productoAgregado. AGREGO UN ALERT AL CLICKEAR EN "COMPRAR". POR ÚLTIMO AÑADO UN EFECTO EN LOS ENCABEZADOS 
$('.shopping-cart').hide()
