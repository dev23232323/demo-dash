import { IconProps } from "@/@types/IconType";
import {
  HomeIcon,
  BriefcaseBusiness,
  PencilLine,
  UserRoundSearch,
  Mail,
  GlobeIcon,
  Plus,
} from "@/components/UI/ui-icons";
import { FC } from "react";

export const SidebarLinks: SidebarLinksTypes[] = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Blogs",
    path: "/blog",
    icon: PencilLine,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: UserRoundSearch,
  },
  {
    name: "Newsletter",
    path: "/newsletter",
    icon: Mail,
  },
];

export const WorkLinks: SidebarLinksTypes[] = [
  {
    name: "Work",
    path: "/work",
    icon: BriefcaseBusiness,
  },
  {
    name: "Country",
    path: "/country",
    icon: GlobeIcon,
  },
  {
    name: "Add work",
    path: "/work/add",
    icon: Plus,
  },
  {
    name: "Add Country",
    path: "/country/add",
    icon: Plus,
  },
];

export interface SidebarLinksTypes {
  name: string;
  path: string;
  icon?: FC<IconProps> | ((props: IconProps) => JSX.Element);
}
