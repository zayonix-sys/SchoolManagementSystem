// // Old Code
// import {
//   Cart,
//   ClipBoard,
//   DashBoard,
//   Graph,
 
// } from "@/components/svg";


// export interface MenuItemProps {
//   title: string;
//   icon: any;
//   href?: string;
//   child?: MenuItemProps[];
//   isHeader?: boolean;
//   megaMenu?: MenuItemProps[];
//   multi_menu? : MenuItemProps[]
//   nested?: MenuItemProps[]
//   onClick: () => void;
// }

// export const menusConfig = {
//   mainNav: [
//     {
//       title: "Administration",
//       icon: DashBoard,
//       //href: "/blank",
//       child: [
//         {
//           title: "Manage Campus",
//           href: "/campuses",
//           icon: Graph,
//         },
//         {
//           title: "Manage Classes",
//           href: "/classrooms",
//           icon: Graph,
//         },
//       ],
//     },
//   ],
//   sidebarNav: {
//     modern: [
//       {
//           title: "Administration",
//           icon: DashBoard,
//           //href: "/blank",
//           child: [
//             {
//               title: "Manage Campus",
//               href: "/campuses",
//               icon: Graph,
//             },
//             {
//               title: "Manage Classes",
//               href: "/classrooms",
//               icon: Graph,
//             },
//           ],
//         },
//     ],
//     classic: [
//       //  {
//       //   isHeader: true,
//       //   title: "menu",
//       // },
//       {
//         title: "Administration",
//         icon: DashBoard,
//         //href: "/blank",
//         child: [
//           {
//             title: "Manage Campus",
//             href: "/campuses",
//             icon: Graph,
//           },
//           {
//             title: "Manage Classes",
//             href: "/classrooms",
//             icon: Graph,
//           },
//         ],
//       },
//     ],
//   },
// };


// export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number]
// export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number]
// export type MainNavType = (typeof menusConfig.mainNav)[number]

import { Cart, ClipBoard, DashBoard, Graph, Users, DocsCheck, Building, Campus, ClipBoard2 } from "@/components/svg";

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
      }
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
