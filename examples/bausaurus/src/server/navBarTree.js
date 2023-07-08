import assert from "assert";
import rubico from "rubico";
import rubicox from "rubico/x/index.js";
import fs from "fs/promises";
import Path from "path";
import matter from "gray-matter";
import { ExcludeFiles } from "./utils.js";

const { pipe, tap, map, get, switchCase, all, assign, tryCatch, eq } = rubico;
const { callProp, find, isEmpty, unless, filterOut, isIn, pluck } = rubicox;

const isMarkdownFile = callProp("endsWith", ".md");

// If a navbav.json is present, use it to filter and order the markown files.

const readNavBarJson = pipe([
  (directory) => Path.resolve(directory, "navbar.json"),
  tryCatch(
    pipe([(path) => fs.readFile(path, "utf-8"), JSON.parse]),
    () => undefined
  ),
]);

const getDirEntries = (directory) =>
  pipe([
    () => directory,
    all({
      navbarData: pipe([readNavBarJson]),
      dirents: pipe([() => fs.readdir(directory, { withFileTypes: true })]),
    }),
    switchCase([
      get("navbarData"),
      ({ navbarData, dirents }) =>
        pipe([
          () => navbarData,
          get("children"),
          map((treeItem) =>
            pipe([
              () => dirents,
              find(eq(get("name"), treeItem.data.name)),
              tap((params) => {
                assert(true);
              }),
              // TODO display an error if the name if the navbar.json does not match a file
              unless(isEmpty, (dirent) => ({ dirent, treeItem })),
            ])()
          ),
          filterOut(isEmpty),
        ])(),
      // No navbarData
      pipe([get("dirents"), map((dirent) => ({ dirent }))]),
    ]),
    tap((params) => {
      assert(true);
    }),
  ])();

const isIndexFile = pipe([get("data.href", ""), callProp("endsWith", "index")]);

const processDir =
  ({ directory, tree, base, pathsNested }) =>
  ({ dirent: { name }, treeItem }) =>
    pipe([
      () => Path.resolve(directory, name),
      walkTree({
        base,
        tree: { children: [], data: { name }, ...treeItem },
        pathsNested: [...pathsNested, name],
      }),
      unless(pipe([get("children"), isEmpty]), (subTree) =>
        pipe([
          () => subTree.children,
          find(isIndexFile),
          switchCase([
            isEmpty,
            () => subTree,
            ({ data }) => ({ ...subTree, ...treeItem, data }),
          ]),
          assign({ children: pipe([get("children"), filterOut(isIndexFile)]) }),
        ])()
      ),
      tap((subTree) => tree.children.push(subTree)),
    ])();

const processFile =
  ({ directory, tree, base, pathsNested }) =>
  ({ dirent, treeItem }) =>
    pipe([
      () => dirent,
      switchCase([
        pipe([get("name"), isMarkdownFile]),
        pipe([
          all({
            frontmatter: pipe([
              ({ name }) => Path.resolve(directory, name),
              (path) => fs.readFile(path, "utf-8"),
              matter,
              get("data"),
            ]),
            fileName: pipe([get("name"), callProp("replace", ".md", "")]),
          }),
          all({
            name: ({ frontmatter, fileName }) => frontmatter.title ?? fileName,
            href: pipe([
              ({ fileName }) => Path.join(base, ...pathsNested, fileName),
            ]),
          }),
          tap((data) => tree.children.push({ ...treeItem, data })),
        ]),
        // Not a markdown
        () => undefined,
      ]),
    ])();

const walkTree =
  ({ base, tree = { children: [] }, pathsNested = [] }) =>
  (directory) =>
    pipe([
      tap(() => {
        assert(base);
        assert(tree);
        assert(directory);
      }),
      () => directory,
      getDirEntries,
      filterOut(pipe([get("dirent.name"), isIn(ExcludeFiles)])),
      map.series(
        pipe([
          switchCase([
            pipe([get("dirent"), callProp("isDirectory")]),
            processDir({ directory, tree, base, pathsNested }),
            processFile({ directory, tree, base, pathsNested }),
          ]),
        ])
      ),
      tap((params) => {
        assert(true);
      }),
      () => tree,
    ])();

export const buildNavBarTree = ({ base, rootDir, srcDir }) =>
  pipe([
    tap(() => {
      assert(rootDir);
      assert(srcDir);
      assert(base);
    }),
    () => Path.resolve(rootDir, srcDir),
    walkTree({ base }),
    tap((tree) => {
      assert(true);
    }),
  ])();

export const writeNavBarTree = ({ site: { rootDir, outDir }, navBarTree }) =>
  pipe([
    tap(() => {
      assert(rootDir);
      assert(outDir);
      assert(navBarTree);
    }),
    () => navBarTree,
    JSON.stringify,
    (navBarTreeString) =>
      fs.writeFile(
        Path.resolve(rootDir, outDir, "navBarTree.json"),
        navBarTreeString
      ),
  ])();