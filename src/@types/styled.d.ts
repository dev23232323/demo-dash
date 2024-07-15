import "styled-components";
import { CustomThemeTypes } from "@/styled-components/styled-theme";

declare module "styled-components" {
  export interface DefaultTheme extends CustomThemeTypes {}
}
