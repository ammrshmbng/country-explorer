import {
  Tag,
  Globe,
  LucideIcon,
  Calculator
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    
    {
      groupLabel: "Contents",
      menus: [
       
        {
          href: "/countries",
          label: "Countries",
          icon: Globe
        },
        {
          href: "/tags",
          label: "Tags",
          icon: Tag
        },
        {
          href: "/redux-counter",
          label: "Redux Counter",
          icon: Calculator
        }
      ]
    },
    
  ];
}
