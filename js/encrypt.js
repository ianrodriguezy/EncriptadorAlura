let encryptBtn = document.querySelector("#encrypt-btn");
let decryptBtn = document.querySelector("#decrypt-btn");
let msgToCryptTextArea = document.querySelector("#msgtocrypt");
let cont = 0;

function validations(check) {
  if (check.match(/[0-9]/g)) {
    return "El texto no puede contener numeros";
  } else if (check.match(/[A-Z]/g)) {
    return "El texto solo puede contener minúsculas";
  } else if (!check.match(/^[a-z\s]+$/g)) {
    return "El texto no puede contener caracteres especiales o acentos";
  }
  return "valid";
}

function encrypt(decryptedMsg) {
  const letters = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  let encryptedMsg = "";

  for (let letter of decryptedMsg) {
    if (letters[letter]) {
      encryptedMsg += letters[letter];
    } else {
      encryptedMsg += letter;
    }
  }

  return encryptedMsg;
}

function decrypt(encryptedMsg) {
  let res = "";
  const exp = [
    { e: /enter/g },
    { i: /imes/g },
    { a: /ai/g },
    { o: /ober/g },
    { u: /ufat/g },
  ];
  exp.forEach((e) => {
    encryptedMsg = encryptedMsg.replace(Object.values(e)[0], Object.keys(e)[0]);
    res = encryptedMsg;
  });
  return res;
}

function toggleCrypt() {
  if (this.classList.contains("lock")) {
    this.parentElement.parentElement.childNodes[1].textContent = decrypt(
      this.parentElement.parentElement.childNodes[1].textContent
    );
    this.childNodes[1].style.display = "none";
    this.childNodes[0].style.display = "block";
    this.classList.toggle("lock");
    this.classList.toggle("unlock");
  } else {
    this.parentElement.parentElement.childNodes[1].textContent = encrypt(
      this.parentElement.parentElement.childNodes[1].textContent
    );
    this.childNodes[0].style.display = "none";
    this.childNodes[1].style.display = "block";
    this.classList.toggle("lock");
    this.classList.toggle("unlock");
  }
}

function deleteMsg() {
  newAlert("Mensaje eliminado exitosamente.", "var(--secondary-color)");
  //console.log(this.parentElement.contadorH1.toString);
  this.parentElement.parentElement.remove();
  welcomeChecker();
  
}

async function copyMsg() {
  newAlert("Mensaje copiado al portapapeles", "var(--secondary-color)");
  await navigator.clipboard.writeText(
    this.parentElement.parentElement.childNodes[1].textContent
  );
}

function generarBotones(lockIcon) {
  if (lockIcon != "unlock" && lockIcon != "lock") {
    return undefined;
  } else {
    let newMsgAction = document.createElement("div");
    newMsgAction.classList.add("new-msg-action");

    let newMsgDecryptBtn = document.createElement("button");
    let newMsgCopyBtn = document.createElement("button");
    let newMsgDeleteBtn = document.createElement("button");

    let copyIcon = document.createElement("img");
    let deleteIcon = document.createElement("img");
    let encryptIcon = document.createElement("img");
    let decryptIcon = document.createElement("img");

    copyIcon.src = "img/icons/copy_icon.svg";
    deleteIcon.src = "img/icons/delete_icon.svg";
    encryptIcon.src = "img/icons/unlock_icon.svg";
    decryptIcon.src = "img/icons/lock_icon.svg";

    newMsgDecryptBtn.classList.add("btn");
    newMsgDecryptBtn.onclick = toggleCrypt;
    newMsgCopyBtn.classList.add("btn");
    newMsgCopyBtn.onclick = copyMsg;
    newMsgDeleteBtn.classList.add("btn");
    newMsgDeleteBtn.onclick = deleteMsg;

    if (lockIcon == "lock") {
      newMsgDecryptBtn.classList.add("lock");
      newMsgDecryptBtn.append(encryptIcon, decryptIcon);
      encryptIcon.style.display = "none";
    }
    if (lockIcon == "unlock") {
      newMsgDecryptBtn.classList.add("unlock");
      newMsgDecryptBtn.append(encryptIcon, decryptIcon);
      decryptIcon.style.display = "none";
    }

    newMsgCopyBtn.appendChild(copyIcon);
    newMsgDeleteBtn.appendChild(deleteIcon);

    newMsgAction.append(newMsgDecryptBtn, newMsgCopyBtn, newMsgDeleteBtn);
    return newMsgAction;
  }
}



function newEncryption() {
  //ESTA FUNCION ES LLAMADA POR EL BOTON ENCRYPT DEL FORMULARIO DEL INDEX
  // GENERA UN NUEVO CONTENEDOR CON UN MENSJAE Y BOTONES QUE ES AGREGADO AL DIV #encrypted-msg

  // VARIABLES PARA LA FUNCION
  let encryptedMsgContainer = document.querySelector("#encrypted-msg"); // ES EL CONTENEDOR PADRE DE LOS MENSAJES

  // ACA CREAMOS EL DIV QUE VA A CONTENER EL CONTADOR, EL MENSAJE ENCRIPTADO, Y LOS RESPECTIVOS BOTONES;
  let newMsgContainer = document.createElement("div");

  
  let encryptedMsg = encrypt(msgToCryptTextArea.value); //RECUPERAMOS EL TEXTO ENCRIPTADO

  cont++;


  let contadorH1=document.createElement("h1");
  contadorH1=cont;
  
  let encryptedMsgP = document.createElement("p");
  encryptedMsgP.innerHTML = encryptedMsg;
  newMsgContainer.append(contadorH1, encryptedMsgP, generarBotones("lock"));
  newMsgContainer.classList.add("msg");
  if(encryptedMsg.length<130){
    init(encryptedMsg, encryptedMsgP);
  }
 encryptedMsgContainer.append(newMsgContainer);
 newMsgContainer.scrollIntoView();
 welcomeChecker();
}

function newDecryption() {
  //ESTA FUNCION ES LLAMADA POR EL BOTON ENCRYPT DEL FORMULARIO DEL INDEX
  // GENERA UN NUEVO CONTENEDOR CON UN MENSJAE Y BOTONES QUE ES AGREGADO AL DIV #encrypted-msg

  // VARIABLES NECESARIAS PARA LA FUNCION
  let encryptedMsgContainer = document.querySelector("#encrypted-msg"); // ES EL CONTENEDOR PADRE DE LOS MENSAJES

    // ACA CREAMOS EL DIV QUE VA A CONTENER EL CONTADOR, EL MENSAJE ENCRIPTADO, Y LOS RESPECTIVOS BOTONES;
  let newMsgContainer = document.createElement("div");


  let encryptedMsg = decrypt(msgToCryptTextArea.value); //RECUPERAMOS EL TEXTO ENCRIPTADO


  cont++;
  
  let contadorH1=document.createElement("h1");
  contadorH1=cont;

  let encryptedMsgP = document.createElement("p");
  encryptedMsgP.innerHTML = encryptedMsg;

  newMsgContainer.append(contadorH1, encryptedMsgP, generarBotones("unlock"));
  newMsgContainer.classList.add("msg");
  if(encryptedMsg.length<130){
    init(encryptedMsg, encryptedMsgP);
  }
  

  encryptedMsgContainer.append(newMsgContainer);
  newMsgContainer.scrollIntoView();
  welcomeChecker();
}

encryptBtn.addEventListener("click", (e) => {
  if (msgToCryptTextArea.value) {
    if (validations(msgToCryptTextArea.value) === "valid") {
      newEncryption(msgToCryptTextArea.value);
      msgToCryptTextArea.value = "";
      window.scrollBy(0, window.innerHeight);
    } else {
      newAlert(validations(msgToCryptTextArea.value), "var(--primary-color)");
    }
  } else {
    newAlert("Por favor, ingresa un texto", "var(--primary-color)");
  }
});

decryptBtn.addEventListener("click", (e) => {
  if (msgToCryptTextArea.value) {
    if (validations(msgToCryptTextArea.value) === "valid") {
      newDecryption(msgToCryptTextArea.value);
      msgToCryptTextArea.value = "";
      window.scrollBy(0, window.innerHeight);
    } else {
      newAlert(validations(msgToCryptTextArea.value), "var(--primary-color)");
    }
  } else {
    newAlert("Por favor, ingresa un texto", "var(--primary-color)");
  }
});
