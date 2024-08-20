let dictionary = "0123456789qwertyuiopasdfghjklzxcvbnm!?></\a`~+*=@#$%".split('');
let ran = function() {
 return Math.floor(Math.random() * dictionary.length)
}

let ranString = function(amt) {
  let string = '';
  for(let i = 0; i < amt; i++) {
    string += dictionary[ran()];
  }
  
  return string;
  
}

let init = function(str, place) {
  let count = str.length;
  let delay = 10;
  place.innerHTML = '';
  
  let gen = setInterval(function() {
    let msgContainer = document.querySelector('#encrypted-msg')
    place.setAttribute('data-before', ranString(count));
    place.setAttribute('data-after', ranString(count));
    if(delay > 0) {
      delay--;

    }
    else {
      if(count < str.length) {
       
        place.innerHTML += str[str.length - count-1];
       
      }
      count--;
      if(count === -1) {
        msgContainer.scrollTop = msgContainer.scrollHeight
        clearInterval(gen);
      }
    }
  }, 32);
 
}


function newAlert(message, color) {
  let newAlert = document.querySelector("#alert");
  newAlert.style.opacity = "1";
  newAlert.classList.add("activeAnimation");
  let pushed = `<p class="newAlert" style="background-color: ${color};">${message}</p>`;
  newAlert.innerHTML = pushed;
  setTimeout(() => {
    newAlert.style.opacity = "0";
    newAlert.classList.remove("activeAnimation");
  }, 3000);
}

function welcomeChecker() {
  let msgSection = document.querySelector("#encrypted-msg");
  let welcomeMsg = document.querySelector("#welcome-msg");

  if (msgSection.childElementCount != 0) {
    welcomeMsg.style.display = "none";
    msgSection.style.display = "flex";
    msgSection.style.flexDirection = "column";
  } else {
    msgSection.style.display = "none";
    welcomeMsg.style.display = "flex";
    cont =0;
  }

}

welcomeChecker();