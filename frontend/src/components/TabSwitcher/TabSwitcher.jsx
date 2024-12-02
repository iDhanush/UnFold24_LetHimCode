"use client";
import React, { useState } from "react";
import "./TabSwitcher.scss";
import { motion } from "motion/react";

const TabSwitcher = ({ tabs,osType, setOsType }) => {

  return (
    <div className="tab-switcher">
      {tabs.map((item) => (
        <div
          key={item.id}
          onClick={() => setOsType(item.name)}
          className={osType === item.name ? "tab highlight" : "tab"}
        >
          {osType === item.name && (
            <motion.span
              className="selected-tab"
              layoutId="bubble"
              transition={{
                type: "spring",
                duration: 0.6,
                bounce: 0.01,
              }}
            />
          )}
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default TabSwitcher;
