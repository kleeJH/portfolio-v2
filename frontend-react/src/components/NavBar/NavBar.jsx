import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

import "./NavBar.scss";
import { images } from "../../constants";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const navItem = [
    "home",
    "about",
    "education",
    "project",
    "skills",
    "contact",
  ];

  // FRAMER MOTION VARIANTS
  const variants = {
    visible: {
      opacity: 1,
      x: [200, 0],
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hidden: { opacity: 0 },
    exit: {
      x: [0, 200],
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <nav className="app__navbar no-select">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo"></img>
      </div>
      <ul className="app__navbar-links">
        {navItem.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul className="no-select">
                {navItem.map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavBar;
