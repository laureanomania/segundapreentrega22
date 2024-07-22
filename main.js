let materiales = JSON.parse(localStorage.getItem("materiales")) || [];
let contador = parseInt(localStorage.getItem("contador")) || 1;

let addMaterialButton = document.getElementById("btn-add");
let materialesList = document.getElementById("material-list");

let addMaterial = () => {
  let nombreMaterial = prompt("Ingresa el nombre del material");
  let cantidad = parseFloat(
    prompt("Ingresa la cantidad de material a agregar")
  );

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("La cantidad ingresada no es válida.");
    return;
  }

  let unidadMedida;
  if (nombreMaterial.toLowerCase() === "resina") {
    unidadMedida = "ml";
  } else {
    unidadMedida = "kg";
  }

  let temperaturaUso = prompt(
    "Ingresa la temperatura máxima de uso del material"
  );

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
};

addMaterialButton.addEventListener("click", addMaterial);

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

pintarMateriales();
