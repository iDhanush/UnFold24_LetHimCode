import "./Hero.scss";
//images
import TAB01 from "../../assets/images/tab02.png";
import TAB02 from "../../assets/images/tab01.png";
import TAB03 from "../../assets/images/tab03.png";
import TAB04 from "../../assets/images/tab04.png";
//gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import Popup from "../popup/Popup";

const Hero = () => {
  const [popup, setPopup] = useState(false);
  //gsap
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".main-txt h1 span",
      {
        scale: 0,
      },
      {
        scale: 1,
        ease: "back.inOut",
        duration: 0.5,
      }
    );
    tl.fromTo(
      ".tab",
      {
        scale: 0,
        rotate: 20,
      },
      {
        scale: 1,
        rotate: 0,
        stagger: 0.1,
        ease: "back.inOut",
      }
    );
  });

  return (
    <div className="hero">
      <div className="main-txt">
        <div className="head-container">
          <h1 className="main-head">Blockchain</h1>
        </div>
        <div className="head-container">
          <div className="tab01 tab">
            <img src={TAB01} alt="tab" />
          </div>
          <h1 className="main-head">
            <span>Deployment</span> Made
          </h1>
          <div className="tab02 tab">
            <img src={TAB02} alt="tab" />
          </div>
        </div>
        <div className="head-container">
          <div className="tab03 tab">
            <img src={TAB03} alt="tab" />
          </div>
          <h1 className="main-head">Simple</h1>
          <div className="tab04 tab">
            <img src={TAB04} alt="tab" />
          </div>
        </div>
      </div>
      <button onClick={() => setPopup(!popup)} className="create-btn">
        Build Project
      </button>
      {popup && <Popup setPopup={setPopup} popup={popup} />}
    </div>
  );
};
export default Hero;
