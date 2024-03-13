import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Dashboard from "./Dashboard";
import UsersList from "./Users/UsersList";
import User from "./Users/Users";
import FileList from "./FileUpload/FileList";
import FileUpload from "./FileUpload/FileUpload";

export const SIDEBAR_DATA = [
  {
    id: 1,
    name: "dashboards",
    path: "dashboards",
    component: Dashboard,
    visible: true,
    icon: <HomeOutlinedIcon />,
  },
  {
    id: 4,
    name: "users",
    path: "users",
    component: UsersList,
    visible: true,
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    id: 5,
    name: "Add users",
    path: "add-user",
    component: User,
    visible: false,
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    id: 6,
    name: "roles & permissions",
    path: "roles",
    visible: false,
    icon: <GppGoodOutlinedIcon />,
  },
  {
    id: 7,
    name: "File Upload",
    path: "files",
    component: FileList,
    visible: true,
    icon: <CalendarTodayOutlinedIcon />,
  },
  {
    id: 8,
    name: "Add File",
    path: "add-file",
    component: FileUpload,
    visible: false,
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    id: 9,
    name: "authentication",
    path: "authentication",
    visible: false,
    icon: <AdminPanelSettingsOutlinedIcon />,
  },
  
];
