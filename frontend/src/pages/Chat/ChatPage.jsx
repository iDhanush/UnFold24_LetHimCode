import React from "react";
import "./ChatPage.scss";
import { useEffect, useState, useRef } from "react";
import { baseUrl } from "../../constants";

import { ThreeDots } from "react-loader-spinner";
const ChatPage = () => {
  const [terminal, setTerminal] = useState([]);
  const [serverRes, setSereverRes] = useState([]);
  const bottomRef = useRef(null);
  const prevTerminalRef = useRef([]);
  const[chatLoad,setchatLoad]=useState(false);

  useEffect(() => {
    if (
      terminal.length !== prevTerminalRef.current.length ||
      (terminal.length > 0 &&
        JSON.stringify(terminal) !== JSON.stringify(prevTerminalRef.current))
    ) {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }

      prevTerminalRef.current = terminal;
    }
  }, [terminal]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        // setchatLoad(true);
        const response = await fetch(`${baseUrl}/comm/shell`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer your-auth-token",
            "ngrok-skip-browser-warning": "69420",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || "can't get profiles");
        }

        const result = await response.json();
        console.log("terminal done:", result.terminal);
        setTerminal(result.terminal);
        console.log(result.terminal);
        // setchatLoad(false);
      } catch (error) {
        console.error("terminal fetch error:", error);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`${baseUrl}/comm/ai_shell`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer your-auth-token",
            "ngrok-skip-browser-warning": "69420",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || "can't get profiles");
        }

        const result = await response.json();
        console.log("terminal done:", result.terminal);
        setSereverRes(result.terminal);
      } catch (error) {
        console.error("terminal fetch error:", error);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="chat-page">
      <div className="left-box">
        <div className="ai-res">
          <div className="ai-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={17}
              height={17}
              fill="none"
            >
              <g fill="#020000" clipPath="url(#a)">
                <path d="M6.419 7.332h1.233V3.023c0-.31.133-.607.369-.827s.555-.342.889-.342.653.123.889.342.368.517.368.827v.228l.72-.66q.267-.245.59-.424a2.56 2.56 0 0 0-1.073-1.28A2.87 2.87 0 0 0 8.715.482a2.82 2.82 0 0 0-1.606.634c-.446.37-.748.867-.859 1.413l-.023.085c0 .03 0 .058-.015.088s0 .083 0 .124a.1.1 0 0 0 0 .022v3.128H4.963zM16.596 7.687h-5.044l-.87.809 2.713 2.523.562.523.047.044v.016l.015.02.015.016.02.028v.036000000000000004q.01.023.024.043v.02a1 1 0 0 1 .03.066v.145a1 1 0 0 1 0 .094v.02q.005.071 0 .142.005.072 0 .144v.036000000000000004c0 .005 0 .046-.015.065a.1.1 0 0 1 0 .033v.017c0 .016 0 .052-.024.08v.016c0 .025-.02.052-.032.077l-.018.036-.027.044-.02.033v.014l-.033.044a.3.3 0 0 1-.038.046l-.074.075-.033.027-.032.028a1.32 1.32 0 0 1-.888.275 1.36 1.36 0 0 1-.84-.363l-.154-.146v1.17q0 .343-.089.679c.583.36 1.292.496 1.98.382a2.75 2.75 0 0 0 1.715-.996 2.4 2.4 0 0 0 .5-1.823 2.5 2.5 0 0 0-.994-1.638L13.327 9.03h3.254c.13-.44.135-.902.015-1.343" />
                <path d="M2.227 5.557q.038.09.085.182l.092.157.027.041.032.047.024.033q.147.21.34.385L5.07 8.49l-.888.826h2.071l.861-.81L3.86 5.454l-.048-.047-.014-.02V5.37l-.021-.027V5.3l-.027-.05v-.018a1 1 0 0 1-.03-.064v-.206a.1.1 0 0 0 0-.033v-.022a1 1 0 0 1 0-.138 1 1 0 0 1 0-.16v-.134l.024-.072v-.036000000000000004a1 1 0 0 1 .03-.068v-.017l.02-.041.018-.033a.2.2 0 0 1 .021-.036v-.016l.027-.036.038-.047a.8.8 0 0 1-.038-.272l.032-.028.033-.024a1.323 1.323 0 0 1 .902-.284c.304.017.591.136.808.336l.18.165v-.944q0-.344.086-.68a2.9 2.9 0 0 0-2.704.215l-.06.039q-.067.047-.138.101l-.027.017-.136.118q-.044.037-.083.077l-.044.066h-.033v.028l-.02.022-.057.066-.062.077-.03.041-.032.041-.026.039-.018.028-.05.066-.048.077v.016a1 1 0 0 1-.041.08l-.045.09c0 .031-.026.061-.038.092v.027l-.027.074a1 1 0 0 0-.02.07v.049a2 2 0 0 0-.042.17v.028a1 1 0 0 1 0 .066v.038c-.079.387-.06.785.053 1.164zM11.256 2.767l-.071.066-2.246 2.089-.872-.826v1.926l.438.449.405.377 1.257-1.17 1.456-1.353.562-.523.095-.077.1-.066.092-.053.068-.03h.015l.044-.016h.071l.071-.02h.299c.242-.003.48.058.684.177.206.119.37.29.472.494.103.203.14.43.108.653a1.13 1.13 0 0 1-.29.602 1 1 0 0 1-.078.08l-.565.523h-1.775v-1.24L10.14 6.181v1.15h3.846l.992-.922c.457-.42.739-.98.793-1.577a2.4 2.4 0 0 0-.498-1.678l-.12-.143-.027-.036a2.778 2.778 0 0 0-1.754-.858 3 3 0 0 0-.385 0h-.45299999999999996l-.095.055a1 1 0 0 0-.136.033l-.11.03-.189.066h-.017a3 3 0 0 0-.397.198h-.024l-.044.028-.062.041-.1.074q-.057.059-.104.124M12.856 11.022l-1.455-1.354h-1.234v4.314c0 .31-.132.608-.368.827-.236.22-.556.343-.89.343s-.652-.123-.888-.343a1.13 1.13 0 0 1-.369-.827v-.236l-.715.663a3 3 0 0 1-.592.42c.2.52.578.963 1.075 1.263s1.086.44 1.677.4a2.82 2.82 0 0 0 1.596-.625c.444-.364.748-.855.865-1.395a.3.3 0 0 0 0-.052v-.121a.1.1 0 0 0 0-.036.2.2 0 0 0 0-.047v.001-.078a.2.2 0 0 0 0-.044v-3.073z" />
                <path d="m6.457 14.329.122-.096.07-.064 2.26-2.113.888.826v-1.926l-.467-.438-.405-.377-1.258 1.167-1.47 1.367-.562.523-.095.08-.1.069h-.015l-.095.052-.068.03h-.068l-.071.025h-.06l-.058.014H4.78a1.3 1.3 0 0 1-.662-.199 1.2 1.2 0 0 1-.446-.495c-.097-.2-.13-.422-.097-.64.034-.217.132-.422.285-.59l.18-.165H3.022q-.37 0-.73-.082a2.37 2.37 0 0 0 .088 2.306c.211.35.51.648.87.87.36.22.772.358 1.201.4h.122q.188.015.375 0h.415l.127-.03.127-.038.095-.033h.017l.068-.027.042-.017.092-.085.032-.017.071-.033h.024l.089-.047h.014l.09-.052.043-.03.066-.041z" />
                <path d="M3.023 11.022h3.174v1.147l1.456-1.354V9.668h-4.63c-.17.008-.34-.017-.5-.072a1.3 1.3 0 0 1-.429-.25 1.2 1.2 0 0 1-.288-.385 1.1 1.1 0 0 1 0-.922q.102-.22.288-.386c.124-.109.27-.194.429-.249.16-.055.33-.08.5-.072h.245l-.71-.669a3 3 0 0 1-.456-.536c-.585.195-1.08.57-1.403 1.064a2.38 2.38 0 0 0-.369 1.65c.084.572.377 1.1.83 1.496a2.8 2.8 0 0 0 1.658.677z" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M.31.5h16.38v16H.31z" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="ai-txt">Building Your Project</div>
        </div>
        {serverRes.map((item) => (
          <div className="ai-generation-box">
            <div className="gen-txt">{item}</div>
          </div>
        ))}
      </div>
      <div className="right-box">
        <div className="terminal-ui">
          <div className="terminal-top">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={24}
              fill="none"
            >
              <path
                fill="#fff"
                d="M7.129 15.75c-.28 0-.54-.15-.67-.41a.745.745 0 0 1 .34-1.01c.87-.43 1.61-1.09 2.14-1.89.18-.27.18-.61 0-.88-.54-.8-1.28-1.46-2.14-1.89a.74.74 0 0 1-.34-1.01c.18-.37.63-.52 1-.33 1.1.55 2.04 1.38 2.72 2.4a2.3 2.3 0 0 1 0 2.54 7.1 7.1 0 0 1-2.72 2.4c-.1.05-.22.08-.33.08M17.239 15.75h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75"
              />
              <path
                fill="#fff"
                d="M15.239 22.75h-6c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75m-6-20c-4.61 0-6.25 1.64-6.25 6.25v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25z"
              />
            </svg>
            Terminal
          </div>
          <div className="content">
            {chatLoad && (
              <div className="chat-load">
                <ThreeDots
                  visible={true}
                  height="30"
                  width="30"
                  color="#000"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
            {terminal?.map((item, index) => (
              <div key={index} className="terminal-out">
                <div className="cmd-line">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={6}
                    height={11}
                    fill="none"
                  >
                    <path
                      fill="#020000"
                      d="M1.079 11a1.06 1.06 0 0 1-.961-.601 1.104 1.104 0 0 1 .487-1.481 7.95 7.95 0 0 0 3.069-2.771 1.17 1.17 0 0 0 0-1.29A8.16 8.16 0 0 0 .605 2.086C.061 1.822-.155 1.162.118.605A1.045 1.045 0 0 1 1.552.12a10.2 10.2 0 0 1 3.9 3.519 3.44 3.44 0 0 1 0 3.724 10.2 10.2 0 0 1-3.9 3.519 1.1 1.1 0 0 1-.473.117"
                    />
                  </svg>
                  {item.cmd}
                </div>
                <div className="res-line">{item.res}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
