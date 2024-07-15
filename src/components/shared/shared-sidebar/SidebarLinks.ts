import { IconProps } from "@/@types/IconType";
import {
  HomeIcon,
  BriefcaseBusiness,
  PencilLine,
  UserRoundSearch,
  Mail,
} from "@/components/UI/ui-icons";

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
    name: "Works",
    path: "/work",
    icon: BriefcaseBusiness,
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

export interface SidebarLinksTypes {
  name: string;
  path: string;
  icon?: (props: IconProps) => JSX.Element;
}
