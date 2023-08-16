import { Context } from "@grucloud/bau-ui/context";

import pageExample from "./pageExample";

import drilldownMenuGridItem from "./drilldownMenu/drilldownMenu-grid-item.ts";

import drilldownMenuDefault from "./drilldownMenu/drilldownMenu-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./drilldownMenu/drilldownMenu-example-default.ts?raw";

export const drilldownMenuSpec = {
  title: "DrilldownMenu",
  package: "drilldownMenu",
  description:
    "The drilldown menu component helps navigate thought hierachical data.",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",
  importStatement: `import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";`,
  examples: [
    {
      title: "Default",
      description: "A simple drilldown menu.",
      code: codeExampleDefault,
      createComponent: drilldownMenuDefault,
    },
  ],
  gridItem: drilldownMenuGridItem,
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(drilldownMenuSpec);
};
