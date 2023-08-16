import pageExample from "./pageExample";
import treeView, { type Tree } from "@grucloud/bau-ui/treeView";

import { Context } from "@grucloud/bau-ui/context";

import treeViewDefault from "./treeView/treeView-example-default.ts";
// @ts-ignore
import codeExampleDefault from "./treeView/treeView-example-default.ts?raw";

export const treeviewSpec = {
  title: "Tree View",
  package: "treeview",
  description: "A tree view displays a hierarchical list",
  sourceCodeUrl:
    "https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",
  importStatement: `import treeview from "@grucloud/bau-ui/treeview";`,
  examples: [
    {
      title: "Default",
      description: "A simple treeview.",
      code: codeExampleDefault,
      createComponent: treeViewDefault,
    },
  ],
  gridItem: (context: Context) => {
    const { bau } = context;
    const { a } = bau.tags;
    const menu: Tree = {
      data: { name: "Root Menu" },
      children: [
        {
          data: { name: "Menu 1", href: "#menu" },
          expanded: true,
          children: [
            { data: { name: "Sub Menu 1", href: "#menusub2" } },
            { data: { name: "Sub Menu 2", href: "#menusub1" } },
          ],
        },
        {
          data: { name: "Menu 2", href: "#menu2" },
          children: [{ data: { name: "Sub Menu 21", href: "#menusub21" } }],
        },
      ],
    };

    const renderMenuItem = ({ name, href }: any) =>
      a(
        {
          href,
        },
        name
      );
    const TreeView = treeView(context, { renderMenuItem });
    return (props: any) => TreeView({ ...props, tree: menu });
  },
};

export default (context: Context) => {
  const PageExample = pageExample(context);
  return () => PageExample(treeviewSpec);
};
