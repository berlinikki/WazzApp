
//Message is sent if 'Send' button is clicked or if 'Enter' key is pressed
$("#send_button").on("click", userTalks);
$("#user_entry").on("keyup", function (event) {
    if (event.keyCode === 13) {
      userTalks();
    }
});


//Message sent by a user followed by a reply from the chatbot
function userTalks() {

  const messageText = $("#user_entry").val();

  if (messageText.length === 0 || messageText.split(" ").length - 1 === messageText.length) {
    return;
  }
  
  sendMessage("user_message", messageText);
  $("#user_entry").val('');
  
  sendReplyWithDelay();
}


//Posts a message to the chat window
function sendMessage(senderType, messageTxt) {

  const newMessageWrap = $("<div>");
  newMessageWrap.addClass("message");
  const newMessage = $("<div>");
  newMessage.addClass(senderType);

  const messageSpan = $("<span>");
  messageSpan.addClass("message_text");
  const timestampSpan = $("<span>");
  timestampSpan.addClass("timestamp");

  messageSpan.text(messageTxt);
  timestampSpan.text(getCurrentTime());
  newMessage.append(messageSpan);
  newMessage.append(timestampSpan);
  newMessageWrap.append(newMessage);

  $("#chat_window").append(newMessageWrap);

  $("div.message")[$("div.message").length - 1].scrollIntoView();
}


//Gets current time in a local time zone
function getCurrentTime() {
  
  const now = new Date();
  const isoDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();

  return isoDate.substring(11, 19);
}


//Adds a delay to emulate a bit of chatbot 'thinking'
function sendReplyWithDelay() {

  const timeout = 500 + Math.random() * 2500;

  setTimeout(function () {
    sendMessage("comp_message", generatePhrase());
  }, timeout);

}


//Generates mindful phrases of the chatbot
function generatePhrase() {

  const pronouns = ['My', 'His', 'Her', 'Its', 'Our', 'Their'];

  const pi = Math.floor(Math.random() * pronouns.length);
  const ni = Math.floor(Math.random() * nouns.length);
  const ai = Math.floor(Math.random() * adjectives.length);

  const phrase = pronouns[pi] + ' ' + nouns[ni] + ' is ' + adjectives[ai];

  return phrase;
}


//Welcomes a user when a page is first loaded
function welcomeUser() {

  const messageText1 = "Hey, wanna talk? Me too! ";
  const messageText2 = "My answers might seem strange sometimes..... but they are always full of sense!";
  const messageText3 = "Just shoot your first message"

  setTimeout(function () {
    sendMessage("comp_message", messageText1);
    setTimeout(function () {
      sendMessage("comp_message", messageText2);
      setTimeout(function () {
        sendMessage("comp_message", messageText3);
      }, 2000);
    }, 2000);
  }, 1000);
}
