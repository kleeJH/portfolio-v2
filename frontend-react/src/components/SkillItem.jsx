import React, { useState } from "react";
import { motion } from "framer-motion";
import { urlFor } from "../client";

import "../container/Skills/Skills.scss";

const SkillItem = ({ skill }) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="app__skills-item app__flex"
      key={skill.name}
    >
      <div
        className="app__flex"
        style={
          hover
            ? {
                boxShadow: `0 0 15px ${skill.bgColor}`,
                backgroundColor: skill.bgColor,
              }
            : { backgroundColor: skill.bgColor }
        }
      >
        <img src={urlFor(skill.icon)} alt={skill.name} />
      </div>
      <p className="p-text">{skill.name}</p>
    </motion.div>
  );
};

export default SkillItem;
