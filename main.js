document.addEventListener("DOMContentLoaded", () => {
  let materiales = JSON.parse(localStorage.getItem("materiales")) || [];
  let contador = parseInt(localStorage.getItem("contador")) || 1;

  let materialForm = document.getElementById("material-form");
  let materialesList = document.getElementById("material-list");

  materialForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    let nombreMaterial = document.getElementById("nombre").value;
    let cantidad = parseFloat(document.getElementById("cantidad").value);
    let temperaturaUso = document.getElementById("temperatura").value;

    if (isNaN(cantidad) || cantidad <= 0) {
      alert("La cantidad ingresada no es válida.");
      return;
    }

    let unidadMedida = nombreMaterial.toLowerCase() === "resina" ? "ml" : "kg";

    if (!temperaturaUso || temperaturaUso.trim() === "") {
      alert("Debes ingresar la temperatura máxima de uso del material.");
      return;
    }

    let materialExistente = materiales.find(
      (mat) => mat.nombre === nombreMaterial
    );

    if (materialExistente) {
      materialExistente.stock += cantidad;
    } else {
      let nuevoMaterial = {
        id: contador,
        nombre: nombreMaterial,
        stock: cantidad,
        unidad: unidadMedida,
        temperatura: temperaturaUso,
      };
      materiales.push(nuevoMaterial);
      contador++;
    }

    localStorage.setItem("materiales", JSON.stringify(materiales));
    localStorage.setItem("contador", contador);

    pintarMateriales();
    materialForm.reset();
  });

  const pintarMateriales = () => {
    materialesList.innerHTML = "";

    materiales.forEach((material) => {
      let item = document.createElement("li");
      item.className = "material-card";
      item.innerHTML = `<span>${material.nombre}</span> 
              <span>Stock: ${material.stock} ${material.unidad}</span>
              <span>Temperatura máxima de uso: ${material.temperatura}</span>
              <button class="delete-button">Borrar</button>`;

      let deleteButton = item.querySelector(".delete-button");

      deleteButton.addEventListener("click", () => {
        deleteMaterial(material);
      });

      materialesList.appendChild(item);
    });
  };

  const deleteMaterial = (material) => {
    materiales = materiales.filter((mat) => mat.id !== material.id);
    localStorage.setItem("materiales", JSON.stringify(materiales));
    pintarMateriales();
  };

  pintarMateriales(); // Llama a pintarMateriales para mostrar los materiales guardados al cargar la página
});
