const catalogo = document.getElementById("catalogo-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalHTML = document.getElementById("total");

const carrito = {
  items: [],
  agregarItem(producto) {
    this.items.push(producto);
    this.renderizarCarrito();
  },
  calcularTotal() {
    return this.items.reduce((total, item) => total + item.price, 0).toFixed(2);
  },
  renderizarCarrito() {
    listaCarrito.innerHTML = "";
    this.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.title} - $${item.price}`;
      listaCarrito.appendChild(li);
    });
    totalHTML.textContent = `Total: $${this.calcularTotal()}`;
  },
};

// Aqui es donde sacamos los productos del api
async function cargarProductos() {
  try {
    const respuesta = await fetch("https://fakestoreapi.com/products");
    const productos = await respuesta.json();

    productos.forEach((producto, i) => {
      // Descripciones
      const descripciones = [
        "Genial para ir a una cita.",
        "La envidia de Balenciaga.",
        "Estilo Radiante.",
        "When estas con tu novia.",
        "Agotadas si no te apuras.",
        "Homero vas a Lecoltatalte.",
        "Como dejarla Impactada.",
        "When tu profe se llama eso a eso explica muchas cosas.",
        "Firma Sherk.",
      ];
      const descripcion = descripciones[i % descripciones.length];

      const card = document.createElement("div");
      card.classList.add("producto");
      card.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}">
        <h3>${producto.title}</h3>
        <p class="precio">$${producto.price}</p>
        <p>${descripcion}</p>
        <button class="agregar-carrito">Añadir al carrito</button>
      `;
      card.querySelector("button").addEventListener("click", () => {
        carrito.agregarItem(producto);
      });
      catalogo.appendChild(card);
    });
  } catch (error) {
    console.error("Error no se cargaron los productos productos", error);
  }
}

cargarProductos();