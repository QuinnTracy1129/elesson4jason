import {
  faAssistiveListeningSystems, faHouseUser, faPlusSquare, faWater
} from "@fortawesome/free-solid-svg-icons";
const auth = JSON.parse(localStorage.getItem("auth"));
const studentPortal = ["Student"];
const facultyPortal = ["Adviser", "fTracking"];
const headPortal = ["Adviser", "fTracking"];
const masterPortal = ["Adviser", "fTracking"];
const adminPortal = ["aTracking"];
const superadminPortal = ["Headquarter", "fTracking"];
const devPortal = ["Forbidden", "Headquarter"];
const portalList = {
  id: "portalList",
  defaultPlatform: auth ? auth.currentApp : undefined,
  options: [
    {
      name: "Classroom",
      code: "Student",
      text: "Class Management System",
      icon: faAssistiveListeningSystems,
      isPremium: false,
      dafaultUrl: "/cr/banner",
    },
    //Faculty
    {
      name: "Adviser",
      code: "Adviser",
      text: "Class Management System", // with Class Advisory
      icon: faAssistiveListeningSystems,
      isPremium: false,
      dafaultUrl: "/classroom/banner",
    },
    {
      name: "Elesson",
      code: "fTracking",
      text: "Document Management System",
      icon: faPlusSquare,
      isPremium: true,
      dafaultUrl: "/tracking/banner",
    },
    // Admin
    {
      name: "Settings",
      code: "Forbidden",
      text: "Pinagbabawal",
      icon: faWater,
      isPremium: false,
      dafaultUrl: "/forbidden/banner",
    },
    {
      name: "Headquarter",
      code: "Headquarter",
      text: "Headquarter Management System",
      icon: faHouseUser,
      isPremium: false,
      dafaultUrl: "/hq/banner",
    },
  ],
};

const customizedPlatforms = {
  studentPortal,
  facultyPortal,
  adminPortal,
  superadminPortal,
  devPortal,
  masterPortal,
  headPortal,
  portalList,
};
export function getCurrentPlatform(code) {
  const selectedPlatform = portalList.options.find((platform) => platform.code === code);
  return selectedPlatform ? selectedPlatform : portalList.options[1];
}
export default customizedPlatforms;
