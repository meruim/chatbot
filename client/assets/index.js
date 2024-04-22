function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value.trim();
  //If empty no return
  if (message !== "") {
    const chatLog = document.getElementById("chat-log");
    const xhr = new XMLHttpRequest();
    //ika duha
    xhr.open("POST", "/chat");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText).message;
        console.log(response);
        //
        const userMessageContainer = document.createElement("div");
        userMessageContainer.classList.add(
          "message-container",
          "user-message-container",
        );
        //
        const userMessage = document.createElement("div");
        userMessage.innerHTML = `<strong>You:</strong> ${message}`;
        //
        userMessage.classList.add("user-message");
        userMessageContainer.appendChild(userMessage);
        chatLog.appendChild(userMessageContainer);
        //
        const botMessageContainer = document.createElement("div");
        botMessageContainer.classList.add(
          "message-container",
          "bot-message-container",
        );
        // display bot message
        const botMessage = document.createElement("div");
        botMessage.innerHTML = `<strong>Kiem:</strong> ${response}`;
        //
        botMessage.classList.add("bot-message");
        botMessageContainer.appendChild(botMessage);
        chatLog.appendChild(botMessageContainer);
        //
        chatLog.scrollTop = chatLog.scrollHeight;

        document.getElementById("message").value = "";
      }
    };
    xhr.send(
      JSON.stringify({
        message: message,
      }),
    );
  }
}
