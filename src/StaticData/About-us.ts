import mem1 from "../assets/pages/aboutUs/team/mem1.jpg";
import mem2 from "../assets/pages/aboutUs/team/mem2.jpg";
import mem3 from "../assets/pages/aboutUs/team/mem3.jpg";
import mem4 from "../assets/pages/aboutUs/team/mem4.jpg";
import mem5 from "../assets/pages/aboutUs/team/mem5.jpg";
import mem6 from "../assets/pages/aboutUs/team/mem6.jpg";
import mem7 from "../assets/pages/aboutUs/team/mem7.jpeg";
import mem8 from "../assets/pages/aboutUs/team/mem8.webp";

const teamMembers = [
    {
      name: "Jane Doe",
      title: "Senior Developer",
      bio: "Jane is a Senior Developer with 10 years of experience in full-stack development. She specializes in JavaScript frameworks and cloud infrastructure. In her free time, she enjoys hiking and photography.",
      image: mem5,
      contact: {
        email: "jane.doe@example.com",
        linkedin: "https://www.linkedin.com/in/janedoe",
      },
    },
    {
      name: "John Smith",
      title: "Product Manager",
      bio: "John has a knack for bringing teams together to build successful products. With over 8 years of experience, he excels at project management and agile development. Outside work, he loves playing the guitar.",
      image: mem1,
      contact: {
        email: "john.smith@example.com",
        linkedin: "https://www.linkedin.com/in/johnsmith",
      },
    },
    {
      name: "Alice Johnson",
      title: "UX/UI Designer",
      bio: "Alice is a creative UX/UI designer who focuses on user-centered design. With a background in graphic design, she has been crafting beautiful and functional user interfaces for the past 6 years.",
      image: mem2,
      contact: {
        email: "alice.johnson@example.com",
        linkedin: "https://www.linkedin.com/in/alicejohnson",
      },
    },
    {
      name: "Mark Lee",
      title: "Marketing Lead",
      bio: "Mark is a results-driven marketing strategist with a passion for brand development. With 7 years of experience, he has worked on numerous global campaigns. Outside work, he enjoys photography and travel.",
      image: mem3,
      contact: {
        email: "mark.lee@example.com",
        linkedin: "https://www.linkedin.com/in/marklee",
      },
    },
    {
      name: "Emily Davis",
      title: "HR Manager",
      bio: "Emily is an experienced HR Manager specializing in talent acquisition and employee engagement. She has worked with tech startups and enjoys creating positive work environments. In her free time, she loves reading.",
      image: mem4,
      contact: {
        email: "emily.davis@example.com",
        linkedin: "https://www.linkedin.com/in/emilydavis",
      },
    },
    {
      name: "Chris Patel",
      title: "Operations Manager",
      bio: "Chris has over 5 years of experience managing operations in tech companies, ensuring smooth workflows and optimizing processes. He’s passionate about efficiency and enjoys playing tennis in his downtime.",
      image: mem6,
      contact: {
        email: "chris.patel@example.com",
        linkedin: "https://www.linkedin.com/in/chrispatel",
      },
    },
    {
      name: "Sophia Martinez",
      title: "Software Architect",
      bio: "Sophia is a Software Architect with over 12 years of experience in designing scalable software solutions. She is passionate about cloud computing and DevOps practices. She enjoys rock climbing and painting in her free time.",
      image: mem7,
      contact: {
        email: "sophia.martinez@example.com",
        linkedin: "https://www.linkedin.com/in/sophiamartinez",
      },
    },
    {
      name: "Liam Thompson",
      title: "Data Scientist",
      bio: "Liam is a Data Scientist with a focus on machine learning and AI. With a background in statistics and computer science, he has developed predictive models for various industries. In his spare time, he enjoys cycling and chess.",
      image: mem8,
      contact: {
        email: "liam.thompson@example.com",
        linkedin: "https://www.linkedin.com/in/liamthompson",
      },
    },
  ];

  export const getAllTeamMember = () => {
    return teamMembers;
  };

  const evalution = {
    year1:
      "In our first year, we expanded our services to include dedicated office spaces and introduced high-speed internet, making it easier for businesses to set up shop in our space.",
    year2:
      "By 2020, we had tripled in size, hosting over 100 different companies and freelancers. We also upgraded our facilities, adding state-of-the-art meeting rooms and video conferencing capabilities to meet the needs of a growing remote workforce.",
    year3:
      "In 2022, we introduced a hybrid working model that allowed members to split their time between home and our co-working space, providing ultimate flexibility. Our community now spans across several industries, from tech startups to creative agencies, and continues to grow.",
  };

  export const getEvalution=()=>{
    return evalution
  }