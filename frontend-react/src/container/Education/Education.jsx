import React, { useState, useEffect } from "react";
import Timeline from "../../components/Timeline/Timeline";

import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Education.scss";

// const testObject = [
//   {
//     text: "Wrote my first blog post ever on Medium",
//     date: "March 03 2017",
//     category: {
//       tag: "medium",
//       color: "#018f69",
//     },
//     link: {
//       url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
//       text: "Read more",
//     },
//   },
//   {
//     text: "Wrote my first blog post ever on Medium",
//     date: "March 03 2017",
//     category: {
//       tag: "medium",
//       color: "#018f69",
//     },
//     link: {
//       url: "https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2",
//       text: "Read more",
//     },
//   },
// ];

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const query = '*[_type == "education"]';
    client.fetch(query).then((data) => {
      setEducation(data.sort((a, b) => (a.dateRange < b.dateRange ? -1 : 1)));
    });
  }, []);

  return (
    <>
      <h2 className="head-text no-select">
        My <span>Education </span>Journey
      </h2>
      <Timeline timelineData={education} />
    </>
  );
};

export default AppWrap(
  MotionWrap(Education, "app__education"),
  "education",
  "app__whitebg"
);
