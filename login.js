document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("loginMessage");


  try {
    const respuesta = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,   // DummyJSON Usa "username"
        password: password
      }),
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      // Esto ayuda a guardar el token 
      localStorage.setItem("token", data.token);

      mensaje.textContent = "Felicidades Iniciaste Secion ✔";
      mensaje.style.color = "blue";


      // Redirección
      setTimeout(() => {
        window.location.href = "pagina.html";
      }, 1500);
      
    } else {
      mensaje.textContent = "Las Credenciales son incorrectas ❌";
      mensaje.style.color = "green";
      console.log("Error:", data);
    }

  } catch (error) {
    console.error("Error de conexión:", error);
    mensaje.textContent = "Error al intentar conectarse con el servidor.";
  }
});
