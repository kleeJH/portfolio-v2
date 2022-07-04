import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Col, Divider, Modal, Row } from "antd";
import SkillItem from "../../components/SkillItem";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Skills.scss";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [skills, setSkills] = useState([]);
  const [filterSkills, setFilterSkills] = useState([]);

  const skillList = [
    "All",
    "Technical Skill",
    "Soft Skill",
    "Backend Development",
    "Design Pattern",
    "Mobile Development",
    "Programming Language",
    "Source Control",
    "Web Development",
  ];

  useEffect(() => {
    const experienceQuery = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';
    client.fetch(experienceQuery).then((data) => {
      setExperiences(data);
    });
    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
      setFilterSkills(data);
    });
  }, []);

  const handleSkillsFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });
    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      if (item === "All") {
        setFilterSkills(skills);
      } else {
        setFilterSkills(skills.filter((skill) => skill.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className="head-text no-select">
        <span>Skills</span> & <span>Experience</span>
      </h2>
      <div className="app__skills-container">
        <div className="app__skills-section">
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="app__skills-filter no-select"
          >
            {skillList.map((item, index) => (
              <div
                key={`${item}${index}`}
                onClick={() => handleSkillsFilter(item)}
                className={` p-text app__skills-filter-item app__flex no-select ${
                  activeFilter === item ? "item-active" : ""
                }`}
              >
                {item}
              </div>
            ))}
          </motion.div>
          <motion.div
            className="app__skills-list no-select"
            animate={animateCard}
            transition={{ duration: 0.5, delayChildren: 0.5 }}
          >
            {filterSkills.length === 0 ? (
              <div className="app__skills-noitem no-select p-text">
                No skills under this category yet...
              </div>
            ) : (
              filterSkills.map((skill) => (
                <SkillItem skill={skill} key={skill.name} />
              ))
            )}
          </motion.div>
        </div>

        <div className="app__skills-exp no-select">
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="app__skills-exp-info"
          >
            <InfoOutlinedIcon style={{ color: "var(--information-blue)" }} />
            &nbsp;&nbsp;&nbsp;Click each job entry for more information
          </motion.div>
          {experiences.map((experience) => (
            <div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <div className="app__skills-exp-works">
                {experience.works.map((work, index) => (
                  <div key={`${experience.year}${work.jobPosition}${index}`}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.jobPosition}
                      onClick={() => {
                        Modal.info({
                          icon: "",
                          title: (
                            <>
                              <h2 style={{ color: "var(--secondary-color)" }}>
                                {work.jobPosition}
                              </h2>
                              <h5>{work.company}</h5>
                              <Row justify="start">
                                <Col span={24}>
                                  <h6>{work.dateRange}</h6>
                                </Col>
                              </Row>
                              <Divider />
                            </>
                          ),
                          content: (
                            <div>
                              <h2
                                style={{
                                  color: "black",
                                  fontWeight: "700",
                                  marginBottom: "10px",
                                }}
                              >
                                Achievements & Tasks
                              </h2>
                              <ul>
                                {work.achievements.map((achievement, idx) => (
                                  <li
                                    key={idx}
                                    style={
                                      idx !== 0 ? { marginTop: "5px" } : {}
                                    }
                                  >
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ),
                          style: { fontFamily: "var(--font-base)" },
                          okButtonProps: {
                            style: {
                              backgroundColor: "var(--secondary-color)",
                              borderColor: "var(--secondary-color)",
                            },
                          },
                        });
                      }}
                    >
                      <h4 className="bold-text">{work.jobPosition}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
