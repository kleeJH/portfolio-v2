export default {
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    {
      name: "certification",
      title: "Certification",
      type: "string",
    },
    {
      name: "dateRange",
      title: "Date Range",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "object",
      fields: [
        {
          name: "tag",
          title: "Tag",
          type: "string",
        },
        {
          name: "color",
          title: "Color",
          type: "string",
        },
      ],
    },
    {
      name: "educationFacility",
      title: "Education Facility",
      type: "string",
    },
    {
      name: "result",
      title: "Result",
      type: "string",
    },
    {
      name: "hasGraduated",
      title: "Has Graduated",
      type: "boolean",
    },
  ],
};
