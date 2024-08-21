
import {
  Cart,
  ClipBoard,
  DashBoard,
  Graph,
 
} from "@/components/svg";


export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  isHeader?: boolean;
  megaMenu?: MenuItemProps[];
  multi_menu? : MenuItemProps[]
  nested?: MenuItemProps[]
  onClick: () => void;
}

export const menusConfig = {
  mainNav: [
    {
      title: "Administration",
      icon: DashBoard,
      href: "/blank",
      child: [
        {
          title: "Campus Registration",
          href: "/campus",
          icon: Graph,
        },
      ],
    },
  ],
  sidebarNav: {
    modern: [
      {
          title: "Administration",
          icon: DashBoard,
          //href: "/blank",
          child: [
            {
              title: "Campus Registration",
              href: "/campus",
              icon: Graph,
            },
          ],
        },
    ],
    classic: [
      //  {
      //   isHeader: true,
      //   title: "menu",
      // },
      {
        title: "Administration",
        icon: DashBoard,
        //href: "/blank",
        child: [
          {
            title: "Campus Registration",
            href: "/campus",
            icon: Graph,
          },
        ],
      },
    ],
  },
};


export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number]
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number]
export type MainNavType = (typeof menusConfig.mainNav)[number]