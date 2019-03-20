import { parse, TextNode } from "node-html-parser";
import * as stringifyObj from "stringify-object";

export type TurbinizeOptions = {
  elementNamespace?: string;
  indentWith?: string;
  singleQuotes?: boolean;
};

export function turbinizeHTMLString(
  htmlString: string,
  opt: TurbinizeOptions = {}
): string {
  const html = parse(htmlString);
  // @ts-ignore
  return turbinizeHTMLAst(opt, html.firstChild);
}

export function turbinizeHTMLAst(
  opt: TurbinizeOptions,
  html: ReturnType<typeof parse>
) {
  if (html instanceof TextNode) {
    if (html.rawText.trim() === "") {
      return undefined;
    }
    return `"${html.text}"`;
  }

  const children = html.childNodes
    .map(turbinizeHTMLAst.bind(undefined, opt))
    .filter(a => a !== undefined)
    .join(", ");
  const hasChild = children.length > 0;
  const childString = hasChild ? `[${children}]` : "";

  const hasPrefix = opt.elementNamespace === undefined;
  const prefix = hasPrefix ? "" : opt.elementNamespace + ".";

  const hasAttributes = Object.keys(html.rawAttributes).length > 0;
  const attrString = hasAttributes
    ? stringifyObj(html.rawAttributes, {
        indent: opt.indentWith || "  ",
        singleQuotes: opt.singleQuotes === true
      })
    : "";

  const separator = hasAttributes && hasChild ? ", " : "";

  return `${prefix}${html.tagName}(${attrString}${separator}${childString})`;
}
