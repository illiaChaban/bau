import treeView from "./treeView";

export default (context) => {
  const { tr, bau } = context;
  const { section, div, a, h2 } = bau.tags;

  const menu = {
    name: "Root Menu",
    children: [
      {
        name: "Menu 1",
        href: "#menu",

        children: [
          { name: "Sub Menu 1", href: "#menusub2" },
          { name: "Sub Menu 2", href: "#menusub1" },
        ],
      },
      {
        name: "Menu 2",
        href: "#menu2",
        children: [{ name: "Sub Menu 21", href: "#menusub21" }],
      },
    ],
  };

  const renderMenuItem = ({ name, href }) =>
    div(
      a(
        {
          href,
          onclick: (event) => {},
        },
        name
      )
    );

  const TreeView = treeView(context, { renderMenuItem });

  return () => section({ id: "treeview" }, h2(tr("TreeView")), TreeView(menu));
};
