// Dicionário de respostas
const responses = {
  "curso": ["Este curso é de ADS 😃", "Estamos aprendendo Chatbots com JS!"],
  "adeus": ["Tchau! Até logo!", "Foi bom conversar com você, volte sempre."],
  "tudo bem": ["Tudo ótimo, e você?", "Estou bem, obrigado por perguntar!"],
  "obrigado": ["De nada!", "Por nada! Estou aqui para ajudar."]
};

let userName = null; // memória do nome do usuário

// Respostas do chatbot
function getBotResponse(input) {
  input = input.toLowerCase();

  // Cumprimento com base no horário
  if (input.includes("oi") || input.includes("olá") || input.includes("ola")) {
    return greetingByTime();
  }

  // Guardar nome do usuário
  if (input.includes("meu nome é")) {
    userName = input.split("meu nome é")[1].trim();
    return `Prazer em conhecer você, ${userName}!`;
  }

  if (input.includes("quem sou eu") || input.includes("meu nome?")) {
    return userName ? `Você é ${userName}, claro! 😉` : "Ainda não sei seu nome.";
  }

  // Verificar no dicionário
  for (let key in responses) {
    if (input.includes(key)) {
      const possibleReplies = responses[key];
      return possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
    }
  }

  return "Ainda não sei responder isso... 🤔";
}

// Função para cumprimento com base no horário
function greetingByTime() {
  const hour = new Date().getHours();
  if (hour < 12) return "Olá, Bom dia! ☀️";
  if (hour < 18) return "Oi, Boa tarde! 🌤️";
  return "Oi, Boa noite! 🌙";
}

// Captura a mensagem do usuário
function sendMessage() {
  
  const inputField = document.getElementById("user-input");
  const userText = inputField.value.trim();

  if (userText === "") {
    return;
  }

  appendMessage(userText, "user-message");

  // Exibe "digitando..."
  setTimeout(() => {
    appendMessage("Digitando...", "bot-message temp");
  }, 300);

  // Gera resposta do bot
  setTimeout(() => {
    document.querySelector(".temp")?.remove();
    const botReply = getBotResponse(userText);
    appendMessage(botReply, "bot-message");
  }, 1500);

  inputField.value = "";
}

// Adiciona mensagens ao chat (limita 20 no máximo)
function appendMessage(text, className) {
  const chatBox = document.getElementById("chat-box");
  const message = document.createElement("div");
  message.className = className;
  message.innerText = text;
  chatBox.appendChild(message);

  // Limite de 20 mensagens
  if (chatBox.children.length > 20) {
    chatBox.removeChild(chatBox.firstChild);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Limpar chat
function clearChat() {
  const chatBox = document.getElementById("chat-box");
  const hasUserMessage = chatBox.querySelector(".user-message");
  if (!hasUserMessage) return; // não limpa se não houver mensagem do usuário
  chatBox.innerHTML = '<div class="bot-message">Chat limpo! 👋 Vamos recomeçar: olá!</div>';
  userName = null; // reseta memória
}

function sendwithEnter(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}