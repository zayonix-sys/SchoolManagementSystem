import { Cart, ClipBoard, DashBoard, Graph, Users, DocsCheck, Building, Campus, ClipBoard2, Book, CalenderCheck, User } from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  isHeader?: boolean;
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick?: () => void;
}

// Centralized menu configuration
const menuItems: MenuItemProps[] = [
  {
    title: "Administration",
    icon: DashBoard,
    child: [
      {
        title: "Manage Campus",
        href: "/campuses",
        icon: Campus,
      },
      {
        title: "Manage Classes",
        href: "/classrooms",
        icon: ClipBoard2,
      },
      {
        title: "Manage Employees",
        href: "/employees",
        icon: Users,
      },
      {
        title: "Manage Sponsor",
        href: "/sponsors",
        icon: User,
      },
    ],
  },
  {
    title: "Academic",
    icon: DashBoard,
    child: [
      {
        title: "Applicants",
        href: "/applicant",
        icon: Graph,
      },
      {
        title: "Time Tables",
        href: "/timetables",
        icon: CalenderCheck,
      },
      {
        title: "Manage Subjects",
        href: "/subjects",
        icon: Book,
      },
      {
        title: "Manage Exams",
        href: "/examPaper",
        icon: Book,
      },
    ],
  },
  // Add more menu items here
];

// Utility function to generate specific menu styles
const generateMenus = (menuItems: MenuItemProps[]) => {
  return {
    mainNav: menuItems.map(item => ({
      ...item,
    })),
    sidebarNav: {
      modern: menuItems.map(item => ({
        ...item,
      })),
      classic: menuItems.map(item => ({
        ...item,
      })),
    },
    mobileMenu: menuItems.map(item => ({
      ...item,
    })),
  };
};

// Generate menus from the centralized configuration
export const menusConfig = generateMenus(menuItems);

// Type definitions
export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
