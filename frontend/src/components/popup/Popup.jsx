import React, { useState } from "react";
import "./Popup.scss";
import { motion } from "motion/react";
import TabSwitcher from "../TabSwitcher/TabSwitcher";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setUp } from "../../utils/utils";

const ostabs = [
  { id: 1, name: "windows" },
  { id: 2, name: "mac" },
  { id: 3, name: "linux" },
];

const chaintabs = [
  { id: 1, name: "base" },
  { id: 2, name: "other" },
];
const Popup = ({ popup, setPopup }) => {
  const [osType, setOsType] = useState("windows");
  const [chainType, setChainType] = useState("base");
  const [privateKey, setPrivateKey] = useState("");
  const [infuraKey, setInfuraKey] = useState("");
  const [buildType, setBuildType] = useState("");

  const navigate = useNavigate();

  const handleSubmitForm = async () => {
    if (privateKey.length > 0 && infuraKey.length > 0 && buildType.length > 0) {
      navigate("/chat");
      const res = await setUp(
        osType,
        chainType,
        privateKey,
        infuraKey,
        buildType
      );
    } else {
      toast.error("Please Enter Keys !");
    }
  };
  return (
    <motion.div className="popup-page">
      <div className="close-btn" onClick={() => setPopup(!popup)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={67}
          height={67}
          fill="none"
        >
          <rect width={66} height={66} x={0.5} y={0.5} fill="#fff" rx={33} />
          <rect
            width={66}
            height={66}
            x={0.5}
            y={0.5}
            stroke="#E3E3E5"
            rx={33}
          />
          <path
            fill="#4F4F4F"
            d="m34 31.5 8-8 2 1.833-8.167 8.167L44 41.667 41.667 44 33.5 35.833 25.333 44 23 41.667l8.167-8.167L23 25.333 25.333 23z"
          />
        </svg>
      </div>
      <motion.div
        className="form-wrapper"
        initial={{ scale: 0, rotate: "10deg" }}
        animate={{ scale: 1, rotate: "0deg" }}
        transition={{
          duration: 0.3,
          type: "spring",
        }}
      >
        <div className="label">Select Build</div>
        <input
          type="text"
          className="input-box"
          onChange={(e) => setBuildType(e.target.value)}
        />
        <div className="label">Select Chain</div>
        <TabSwitcher
          tabs={chaintabs}
          osType={chainType}
          setOsType={setChainType}
        />

        <div className="label">Select OS</div>
        <select name="" id="" onChange={(e) => setOsType(e.target.value)}>
          <option value="Windows">Windows</option>
          <option value="Linux">Linux</option>
          <option value="Mac">Mac</option>
        </select>
        <div className="label">Private key</div>
        <input
          type="text"
          className="input-box"
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <div className="label">Infura Private key</div>
        <input
          type="text"
          className="input-box"
          onChange={(e) => setInfuraKey(e.target.value)}
        />
        <div className="sub-btn" onClick={() => handleSubmitForm()}>
          Next
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
