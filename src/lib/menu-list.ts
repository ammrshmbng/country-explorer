import {
  Flag,
  Globe,
  LucideIcon,
  Calculator,
  Handshake
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
      groupLabel: "Menus",
      menus: [
        
       
        {
          href: "/countries",
          label: "Countries",
          icon: Globe
        },
        {
          href: "/country-details",
          label: "Country Details",
          icon: Flag
        },
        {
          href: "/cooperation-list",
          label: "Cooperation List",
          icon: Handshake
        }
      ]
    },
    
  ];
}
