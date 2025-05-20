import { useEffect, useState, useRef } from "react";

interface Message {
  from: "bot" | "user";
  text: string;
}

const conversation: Message[] = [
  { from: "bot", text: "Hola! soy Windboot el asistente virtual de Instal Tancaments" },
  { from: "user", text: "Quería pedir un presupuesto" },
  { from: "user", text: "Quiero cambiar mis ventanas y no sé cuál es la mejor opción" },
  { from: "bot", text: "Claro, estoy programado para ayudarte." },
  { from: "bot", text: "Te voy a pedir los datos de tus ventanas y unas fotos. Después te comento las opciones que tienes" },
  { from: "bot", text: "Con los datos que me des te prepararé la oferta al instante." },
  { from: "user", text: "Gracias." },
];

const TYPING_DELAY = 1500;
const MESSAGE_DELAY = 1000;

export default function WhatsAppChatAuto() {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [index, setIndex] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index >= conversation.length) {
      setIsTyping(false);
      return;
    }

    const currentMsg = conversation[index];

    if (currentMsg.from === "bot") {
      setIsTyping(true);
      const typingTimeout = setTimeout(() => {
        setDisplayedMessages((msgs) => [...msgs, currentMsg]);
        setIsTyping(false);
        setIndex((i) => i + 1);
      }, TYPING_DELAY);
      return () => clearTimeout(typingTimeout);
    } else {
      const userTimeout = setTimeout(() => {
        setDisplayedMessages((msgs) => [...msgs, currentMsg]);
        setIndex((i) => i + 1);
      }, MESSAGE_DELAY);
      return () => clearTimeout(userTimeout);
    }
  }, [index]);

  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }, [displayedMessages, isTyping]);

  return (
    <div className="w-[316px] h-[684px] bg-white rounded-[36px] shadow-lg border border-gray-300 overflow-hidden flex flex-col">
      <div className="bg-green-600 text-white py-3 px-4 font-semibold text-base">
        WhatsApp
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-3 bg-whatsapp-pattern bg-repeat bg-[length:300px_300px] select-none overflow-hidden"
      >
        {displayedMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-1 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.from === "bot" && <BotAvatar />}
            <div
              className={`max-w-[75%] px-3 py-2 rounded-xl break-words whitespace-pre-wrap text-sm
              ${msg.from === "user"
                ? "bg-green-500 text-white rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
              }`}
            >
              {msg.text}
            </div>
            {msg.from === "user" && <UserAvatar />}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1">
            <BotAvatar />
            <div className="bg-white border border-gray-300 rounded-bl-none rounded-xl px-4 py-2 flex items-center gap-1">
              <TypingDots />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center space-x-1">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
    </div>
  );
}

function BotAvatar() {
  return (
    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white">
      🤖
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs text-white">
      🧑
    </div>
  );
}
