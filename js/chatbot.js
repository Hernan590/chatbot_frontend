function enviarPregunta() {
  const pregunta = document.getElementById("user_pregunta").value.trim()
  const chatBody = document.getElementById("chatBody")

  if (!pregunta) return; 

  const userMsg = document.createElement("div")
  userMsg.classList.add("message", "user-message")
  userMsg.textContent = pregunta
  chatBody.appendChild(userMsg)

  document.getElementById("user_pregunta").value = ""

  chatBody.scrollTop = chatBody.scrollHeight

  fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pregunta })
  })
    .then(res => res.json())
    .then(data => {
      const botMsg = document.createElement("div")
      botMsg.classList.add("message", "bot-message")
      botMsg.textContent = data.respuesta
      chatBody.appendChild(botMsg)

      chatBody.scrollTop = chatBody.scrollHeight
    })
    .catch(error => {
      console.error("Ocurrió un error:", error)
    });
}
