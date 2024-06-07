import { basename } from "node:path";
import fg from "fast-glob";
import {
  sortBy,
  orderBy,
  cloneDeep,
  last as _last,
  first as _first,
  some as _some,
} from "lodash-es";
import * as colors from "colorette";
import { DefaultTheme } from "vitepress";
/**
 * 填入导航栏的路径比如：/docs/
 * @param {*} dirPath
 */
const autoSideBar = (dirPath) => {
  const files = fg.sync(`docs/markdown${dirPath}/**/[0-9]+-*.md`, {
    onlyFiles: true,
  });
  const _dirPathName = dirPath.split("/").filter((n) => n.trim())?.[1];
  const dirPathName = _dirPathName.slice(_dirPathName.indexOf("-") + 1);
  const sidebarObjs = {};
  console.log(files, "filesfilesfiles");
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(file);
    const fileArrs = file
      .replace(`docs/markdown${dirPath}`, "")
      .split("/")
      .map((text) => {
        const order = Number(0, text.slice(text.indexOf("-")));
        const name = text.slice(text.indexOf("-") + 1);
        return {
          order,
          name,
          defaultName: text,
          title: name.trim().replace(".md", ""),
        };
      });
    if (fileArrs.length === 1) {
      if (!sidebarObjs[dirPath]) {
        sidebarObjs[dirPath] = {
          id: dirPath,
          pid: "",
          text: `📁 ${dirPathName}`,
          collapsed: true,
          items: [
            {
              order: fileArrs[0].order,
              text: `📄 ${fileArrs[0].title}`,
              link: `${dirPath}${fileArrs[0].defaultName}`,
            },
          ],
        };
      } else {
        sidebarObjs[dirPath].items.push({
          order: fileArrs[0].order,
          text: `📄 ${fileArrs[0].title}`,
          link: `${dirPath}${fileArrs[0].defaultName}`,
        });
      }
    }
    if (fileArrs.length === 2) {
      if (!sidebarObjs[fileArrs[0].name]) {
        sidebarObjs[fileArrs[0].name] = {
          order: fileArrs[0].order,
          id: fileArrs[0].name,
          pid: dirPath,
          text: `📁 ${fileArrs[0].title}`,
          collapsed: true,
          items: [
            {
              order: fileArrs[1].order,
              text: `📄 ${fileArrs[1].title}`,
              link: `${dirPath}${fileArrs[0].defaultName}/${fileArrs[1].defaultName}`,
            },
          ],
        };
      } else {
        sidebarObjs[fileArrs[0].name].items.push({
          order: fileArrs[1].order,
          text: `📄 ${fileArrs[1].title}`,
          link: `${dirPath}${fileArrs[0].defaultName}/${fileArrs[1].defaultName}`,
        });
      }
    }
    console.log(fileArrs.length, sidebarObjs, "fileArrsfileArrsfileArrs");
  }

  console.log(sidebarObjs["/1-learning/1-learning-one/"], "outer");
  const treeSideBar = orderBy(
    Object.values(sidebarObjs).map((sideBar) => {
      sideBar.items = orderBy(sideBar.items, ["order", "asc"]);
      return sideBar;
    }),
    ["order"],
    "asc"
  );

  return treeSideBar;
};

// 设置侧边栏
const setNavAndSide = () => {
  const files = fg.sync(`docs/markdown/**/[0-9]+-*.md`, {
    onlyFiles: true,
    ignore: ["docs/markdown/public/**/*"],
  });
  const sideObjs: DefaultTheme.Sidebar | undefined = {};
  const navObjs = {};
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileEnd = file.replace(/^docs\/markdown/gi, "");
    const fileSplit = fileEnd.split("/").filter((name) => name);

    if (fileSplit.length < 3 || fileSplit.length > 4) {
      console.log(
        `${colors.redBright(fileEnd)} 请按照 ${colors.greenBright(
          "分类-[项目]-目录-文章"
        )} 的层级方式组织文件`
      );
      continue;
    }

    const [firstSplit, secondSplit] = fileSplit;
    const lastSplit = fileSplit[fileSplit.length - 1];

    const lastNumber = Number(lastSplit.slice(0, lastSplit.indexOf("-")));
    const firstNumber = Number(firstSplit.slice(0, firstSplit.indexOf("-")));
    const secondNumber = Number(secondSplit.slice(0, secondSplit.indexOf("-")));
    const navName = firstSplit.replace(/^\d+-/gi, "");
    const linkName = secondSplit.replace(/^\d+-/gi, "");
    const dirPath = `/${firstSplit}/${secondSplit}/`;

    // 设置导航下的擦边蓝
    if (sideObjs[dirPath] === undefined) {
      sideObjs[dirPath] = autoSideBar(dirPath);
    }

    // 如果是第一个，就作为顶部导航
    if (lastNumber === 1) {
      if (navObjs[firstSplit] === undefined) {
        navObjs[firstSplit] = {
          order: firstNumber,
          text: navName,
          items: [
            {
              order: secondNumber,
              text: linkName,
              link: fileEnd.replace(".md", ""),
            },
          ],
        };
      } else {
        if (_some(navObjs[firstSplit].items, { text: linkName }) === false) {
          navObjs[firstSplit].items.push({
            order: secondNumber,
            text: linkName,
            link: fileEnd.replace(".md", ""),
          });
        }
      }
    }
  }
  const navObjs2 = orderBy(
    Object.values(navObjs).map((nav) => {
      nav.items = orderBy(nav.items, ["order"], ["asc"]);
      return nav;
    }),
    ["order"],
    ["asc"]
  );
  return {
    navBar: navObjs2,
    sideBar: sideObjs,
  };
};

// 自动生成
const docsAuto = () => {
  const { sideBar, navBar } = setNavAndSide();
  return {
    sideBar: sideBar,
    navBar: navBar,
  };
};

export { docsAuto };
