import { DashBoard, Graph, Users, DocsCheck, Building, Campus, ClipBoard2, Book, CalenderCheck, User, Donation, List, ListFill, Cart, ClipBoard } from "@/components/svg";
import { Coins, CoinsIcon } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import { CalendarCheck2Icon, Coins, CoinsIcon } from "lucide-react";

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
export const menuItems: MenuItemProps[] = [
  {
    title: "Administration",
    icon: DashBoard,
    child: [
      {
        title: "DashBoard",
        href: "/",
        icon: DashBoard,
      },
      {
        title: "Manage Users",
        href: "/userManagement",
        icon: User,
      },
      {
        title: "Manage Campuses",
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
        href: "/manage-employees",
        icon: Users,
      },
      {
        title: "Employees Attendance",
        href: "/employee-attendance",
        icon: CalendarCheck2Icon,
      },
      {
        title: "Manage Sponsors",
        href: "/sponsors",
        icon: User,
      },
      {
        title: "Manage Sponsorships",
        href: "/sponsorship",
        icon: Donation,
      },
      {
        title: "Manage Inventories",
        href: "/manage-inventories",
        icon: ListFill,
      }
     
    ],
  },
  {
    title: "Academic",
    icon: Book,
    child: [
      {
        title: "Applicants",
        href: "/applicantManagement",
        icon: Graph,
      },
      {
        title: "Students",
        href: "/students",
        icon: Users,
      },
      {
        title: "Attendance",
        href: "/student-attendance",
        icon: CalenderCheck,
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
      {
        title: "Manage Results",
        href: "/examResults",
        icon: DocsCheck,
      },
      {
        title: "Grades",
        href: "/manage-grades",
        icon: Book,
      },
      {
        title: "Promoted Student",
        href: "/student-academic",
        icon: ClipBoard2,
      },

      
    ],
  },
  {
    title: "Account",
    icon: CoinsIcon,
    child: [
      {
        title: "Manage Payments",
        href: "/payments",
        icon: Coins,
      },

    ]
  }
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
