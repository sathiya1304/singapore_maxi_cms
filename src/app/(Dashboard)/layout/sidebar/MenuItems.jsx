import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Enquiry List",
    href: "/enquiry_list",
    type: 1,
    icon: "/images/icons/Enquiry List.svg",
    submenu: [],
    requiredPrivilege: "viewDashboard",
  },
  {
    id: uniqueId(),
    title: "CMS",
    icon: "/images/icons/cms.svg",
    requiredPrivilege: "viewMasters",
    submenu: [
      {
        id: uniqueId(),
        title: "Page",
        href: "/page",
        type: 1,
        
      },
      {
        id: uniqueId(),
        title: "Section",
        href: "/section",
        type: 1,
      },
      {
        id: uniqueId(),
        title: "Content Blocks",
        href: "/content-blocks",
        type: 1,
      },
    ],
  },
  // {
  //   id: uniqueId(),
  //   title: "Page  ",
  //   href: "/page",
  //   type: 1,
  //   icon: "/images/icons/page.svg",
  //   submenu: [],
  //   requiredPrivilege: "viewAttendance",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Section  ",
  //   href: "/section",
  //   type: 1,
  //   icon: "/images/icons/section.svg",
  //   submenu: [],
  //   // requiredPrivilege:"viewAttendance"
  // },
  // {
  //   id: uniqueId(),
  //   title: "Content Blocks  ",
  //   href: "/content-blocks",
  //   type: 1,
  //   icon: "/images/icons/content.svg",
  //   submenu: [],
  //   // requiredPrivilege:"viewAttendance"
  // },
  {
    id: uniqueId(),
    title: "Masters",
    icon: "/images/icons/settings.svg",
    requiredPrivilege: "viewMasters",
    submenu: [
      {
        id: uniqueId(),
        title: "Model",
        href: "/model_master",
        type: 1,
        icon: "/images/icons/Car MODEL.png",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "User Management",
    href: "/user-management",
    icon: "/images/icons/user.svg",
    type: 1,

    submenu: [],
    // requiredPrivilege:"viewAttendance"
  },
  // {
  //   id: uniqueId(),
  //   title: "Student",
  //   type: 1,
  //   icon: "/images/icons/students.svg",
  //   requiredPrivilege:"viewStudent",
  //   submenu: [
  //     {
  //       id: uniqueId(),
  //       title: "Student Registration",
  //       href: "/student-registration",
  //       requiredPrivilege:"viewRegistration",

  //     },
  //     {
  //       id: uniqueId(),
  //       title: "Approved Students",
  //       href: "/approved-students",
  //       requiredPrivilege:"viewApprovedStudents",

  //     },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: "Competition",
  //   icon: "/images/icons/competition.svg",
  //   requiredPrivilege:"viewCompetition",
  //   submenu: [
  //     {
  //       id: uniqueId(),
  //       title: "Competition List",
  //       href: "/competition",
  //       requiredPrivilege:"viewCompetitionList",

  //     },
  //     {
  //       id: uniqueId(),
  //       title: "Registered Students",
  //       href: "/compt_registration",
  //       requiredPrivilege:"viewRegisteredStudents",

  //     },
  //   ],
  // },

  // {
  //   id: uniqueId(),
  //   title: "User",
  //   href: "/user-management",
  //   type: 1,
  //   icon: "/images/icons/user.svg",
  //   requiredPrivilege: "viewUser",
  //   submenu: [],
  // },
  // {
  //   id: uniqueId(),
  //   title: "Report",
  //   href: "/students-report",
  //   type: 1,
  //   icon: "/images/icons/report.svg",
  //   requiredPrivilege: "viewReport",
  //   submenu: [],
  // },
];

export default Menuitems;
