let formulario = document.querySelector(".formulario");
let inputs = document.querySelectorAll(".input");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  clave: /^.{4,12}$/,
};

const campos = {
  nombre: false,
  apellido: false,
  email: false,
  clave: false,
};

let validarInputs = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampos(expresiones.nombre, e.target, "nombre");
      break;

    case "apellido":
      validarCampos(expresiones.apellido, e.target, "apellido");
      break;

    case "email":
      validarCampos(expresiones.email, e.target, "email");
      validarEmail();
      break;

    case "clave":
      validarCampos(expresiones.clave, e.target, "clave");
      break;

    default:
      break;
  }
};

let validarCampos = (expresion, objetivo, input) => {
  if (expresion.test(objetivo.value)) {
    document.querySelector(`.error-${input}`).classList.remove("error-activo");
    document.querySelector(`.parrafo-error-${input}`).classList.remove("contenedor-parrafo-error-activo");
    objetivo.classList.remove("input-error");
    campos[input] = true;
  } else {
    document.querySelector(`.error-${input}`).classList.add("error-activo");
    document.querySelector(`.parrafo-error-${input}`).classList.add("contenedor-parrafo-error-activo");
    objetivo.classList.add("input-error");
    campos[input] = false;
  }
};

let validarEmail = () => {
  if (expresiones.email.test(inputs[2].value)) {
    inputs[2].placeholder = "Email Address";
    inputs[2].classList.remove("input-error-email");
  } else {
    inputs[2].placeholder = "email@example/com";
    inputs[2].classList.add("input-error-email");
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarInputs, false);
  input.addEventListener("blur", validarInputs, false);
});

formulario.addEventListener("submit",
  (e) => {
    e.preventDefault();

    if (!campos.nombre) {
      document.querySelector(`.error-nombre`).classList.add("error-activo");
      document.querySelector(`.parrafo-error-nombre`).classList.add("contenedor-parrafo-error-activo");
      inputs[0].classList.add("input-error");
    }
    if (!campos.apellido) {
      document.querySelector(`.error-apellido`).classList.add("error-activo");
      document.querySelector(`.parrafo-error-apellido`).classList.add("contenedor-parrafo-error-activo");
      inputs[1].classList.add("input-error");
    }
    if (!campos.email) {
      document.querySelector(`.error-email`).classList.add("error-activo");
      document.querySelector(`.parrafo-error-email`).classList.add("contenedor-parrafo-error-activo");
      inputs[2].classList.add("input-error");
      validarEmail();
    }
    if (!campos.clave) {
      document.querySelector(`.error-clave`).classList.add("error-activo");
      document.querySelector(`.parrafo-error-clave`).classList.add("contenedor-parrafo-error-activo");
      inputs[3].classList.add("input-error");
    }

    if (campos.nombre && campos.apellido && campos.email && campos.clave) {
      formulario.reset();
      campos.nombre = false;
      campos.apellido = false;
      campos.email = false;
      campos.clave = false;
    }
  }, false);