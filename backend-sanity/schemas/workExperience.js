export default {
  name: "workExperience",
  title: "Work Experience",
  type: "document",
  fields: [
    {
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      name: "jobPosition",
      title: "Job Position",
      type: "string",
    },
    {
      name: "dateRange",
      title: "Date Range (MM/YYYY - MM/YYYY (or Present))",
      type: "string",
    },
    {
      name: "achievements",
      title: "Achievements and Tasks",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
