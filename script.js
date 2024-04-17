document.getElementById("domainForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const apiKey = '';
  const domain = document.getElementById("domain").value;
  const respostaDiv = document.querySelector(".resposta");

  const apiUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`;

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data);
      const whoisData = response.data;

      
      if (whoisData.dataError === "MISSING_WHOIS_DATA") {
        respostaDiv.innerHTML = `Não há informações WHOIS disponíveis para o domínio ${domain}. Pode estar disponível.`;
      } else if (
        whoisData.WhoisRecord &&
        whoisData.WhoisRecord.registryData &&
        whoisData.WhoisRecord.registryData.rawText.includes(
          "No match for domain"
        )
      ) {
        respostaDiv.innerHTML = `O domínio ${domain} está disponível.`;

        setTimeout(() => {
          
          respostaDiv.innerHTML = "";
          document.getElementById("domain").value = ""; 
        }, 2000);
        
      } else if (
        whoisData.WhoisRecord &&
        whoisData.WhoisRecord.registryData &&
        whoisData.WhoisRecord.registryData.domainName
      ) {
        respostaDiv.innerHTML = `O domínio ${domain} está registrado.`;
        console.log(`Detalhes WHOIS:`, whoisData.WhoisRecord);
        setTimeout(() => {
         
          respostaDiv.innerHTML = "";
          document.getElementById("domain").value = ""; 
        }, 2000);
        
      } else {
        respostaDiv.innerHTML = `Não foi possível determinar o status do domínio ${domain}.`;
        setTimeout(() => {
         
          respostaDiv.innerHTML = "";
          document.getElementById("domain").value = ""; 
        }, 2000);
        
      }
    })
    .catch((error) => {
      console.error("Erro ao consultar a API WhoisXMLAPI:", error.message);
      respostaDiv.innerHTML = "Não foi possível realizar a consulta. Chave não registrada. Para ver a funcionalidade, favor entrar em contato."
    });
});

let email = document.getElementById("email");
let nameForm = document.getElementById("name");
let message = document.getElementById("message");
let btnMessage = document.getElementById("btn-message");
let validationEmail = document.getElementById("validationEmail");
let validationMessage = document.getElementById("validationMessage");
let validationForm = document.getElementById("validationForm");

btnMessage.addEventListener("click", (e) => {
  e.preventDefault();

  if (email.value == "" || message.value == "" || nameForm.value == "") {
    validationForm.textContent = "Preencha todos os campos para poder enviar";
  } else if (validatorEmail(email.value) === true) {
    validationEmail.textContent = "";
    validationMessage.textContent = "";
    validationForm.textContent = "Mensagem enviada! (Ou não, rs)";

    email.value = "";
    nameForm.value = "";
    message.value = "";

    setTimeout(() => {
      validationForm.textContent = "";
    }, 2000);
  } else {
    validationForm.textContent = "Oops, algo deu errado...";
  }
});

email.addEventListener("keyup", () => {
  if (validatorEmail(email.value) !== true) {
    validationEmail.textContent =
      "Por favor, digite um e-mail válido. Ex: nome@abc.com";
  } else {
    validationEmail.textContent = "";
  }
});

function validatorEmail(email) {
  let emailRegex =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailRegex.test(email);
}

//Menu Scroll

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    document.getElementById("header").classList.add("hidden");
  } else {
    document.getElementById("header").classList.remove("hidden");
  }

  lastScrollTop = currentScroll;
});

//menu mobile
const btnMobile = document.getElementById('btn-mobile');
const menu = document.querySelectorAll('.navbar-items a');

function toggleMenu() {
  const nav = document.querySelector('.navbar-container');
  nav.classList.toggle('active');
}

function closeMenu() {
  const nav = document.querySelector('.navbar-container');
  nav.classList.remove('active');
}

btnMobile.addEventListener('click', toggleMenu);

menu.forEach(item => {
  item.addEventListener('click', closeMenu);
});