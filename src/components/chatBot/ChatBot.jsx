import React, { useEffect, useState } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import "./chatBot.css";

const ChatBot = () => {
  const [showChatBox, setShowChatBox] = useState(false); // for chat box appear and disappear
  let [display, setDisplay] = useState("none");
  let [chat_entered, setChat_entered] = useState("");
  let [prev_chat, setPrev_chat] = useState("");

  // for chat box appear and disappear
  useEffect(() => {
    if (showChatBox == false) {
      setDisplay("none");
    } else {
      setDisplay("block");
    }
  }, [showChatBox]);

  function chatWithBot() {
    let element = document.createElement("p");
    let spanElement = document.createElement("p");
    spanElement.innerHTML = `Select the kind of products you are looking for ?`;
    element.appendChild(spanElement);
    let spanElement1 = document.createElement("p");
    spanElement1.innerHTML = `Electronics`;
    spanElement1.onclick = () => {
      console.log("go to electronics page");
    };
    element.appendChild(spanElement1);
    let spanElement2 = document.createElement("p");
    spanElement2.innerHTML = `Dress`;
    spanElement2.onclick = () => {
      console.log("go to Dress page");
    };
    element.appendChild(spanElement2);
    spanElement.className = "bot_ques";
    spanElement1.className = "bot_ans";
    spanElement2.className = "bot_ans";

    let parent = document.getElementById("chat_adding_node_id");
    parent.appendChild(element);
    let scroll_main = document.getElementById("main_chat_scrolling");
    scroll_main.scrollTo(0, 5000);
  }

  function chatWithAgents() {
    let element = document.createElement("p");
    element.innerHTML = `agent is typing...`;
    let parent = document.getElementById("chat_adding_node_id");
    parent.appendChild(element);
    let scroll_main = document.getElementById("main_chat_scrolling");
    scroll_main.scrollTo(0, 5000);

    setTimeout(() => {
      element.innerHTML = ``;
      let spanElement = document.createElement("span");
      element.appendChild(spanElement);
      if (chat_entered == "hello") {
        spanElement.innerHTML = `Hello, welcome to ShoppingKart `;
      } else if (prev_chat != "") {
        console.log("jfhg");
        spanElement.innerHTML = `you can find all sections in the home page`;
      } else {
        setPrev_chat("Hello welcome, i am prashath");
        spanElement.innerHTML = "Hello welcome, i am prashath";
      }
      element.className = "agent_chat_style";
      spanElement.className = "agent_chat_style_span";
      let scroll_main = document.getElementById("main_chat_scrolling");
      scroll_main.scrollTo(0, 5000);
    }, 500);
  }

  function handleSubmit() {
    let element = document.createElement("p");
    let spanElement = document.createElement("span");
    element.appendChild(spanElement);
    spanElement.innerHTML = `${chat_entered}`;
    element.className = "user_chat_style";
    spanElement.className = "user_chat_style_span";
    let parent = document.getElementById("chat_adding_node_id");
    parent.appendChild(element);
    setChat_entered("");
    let scroll_main = document.getElementById("main_chat_scrolling");
    scroll_main.scrollTo(0, 5000);
    chatWithAgents();
  }

  return (
    <>
      {/* chatbot is the floating chat icon */}
      <section className="chatbot" onClick={() => setShowChatBox(!showChatBox)}>
        <div className="chatbot-items">
          <span>
            <BiMessageRoundedDots />
          </span>{" "}
          {/* <span>Contact Us</span> */}
        </div>
      </section>
      {/* once we click on chat icon/bot, then chat box will appear for chatting */}
      <section className="chatbox" style={{ display: `${display}` }}>
        <article className="chatbox_content">
          <nav>
            <span>Message Us</span>
            <span className="nav_controls">
              <span onClick={() => setShowChatBox(!showChatBox)}>_</span>
              <span onClick={() => setShowChatBox(!showChatBox)}>X</span>
            </span>
          </nav>
          <hr style={{ margin: "0" }} />
          <main
            style={{ overflow: "scroll" }}
            className="main_chat_window"
            id="main_chat_scrolling"
          >
            <article className="">
              <h2 style={{ color: "#1D2C4E", marginLeft: "0" }}>
                ShoppingKart Chats
              </h2>
              <h4>Chat with our Bots and customer supports</h4>
              <p>Choose mode of chatting : </p>
              <p className="chat_with_bot" onClick={chatWithBot}>
                1.) chat with bots for quick guide
              </p>
              <p className="chat_with_agents" onClick={chatWithAgents}>
                2.) chat with customer support agents
              </p>
              <p className="chat_adding_node" id="chat_adding_node_id"></p>
              {/* adding chats here */}
            </article>
          </main>
          <hr style={{ margin: "0" }} />
          <footer>
            <span className="More_chat_options">
              <AiOutlinePlus />
            </span>
            <input
              type="text"
              placeholder="Type your message"
              id="chat_input"
              value={chat_entered}
              onChange={e => setChat_entered(e.target.value)}
              style={{ padding: "10px" }}
            />
            <span className="chat_send_arrow" onClick={handleSubmit}>
              <BsArrowRight />
            </span>
          </footer>
        </article>
      </section>
    </>
  );
};

export default ChatBot;
