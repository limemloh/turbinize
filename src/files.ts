import * as fs from "fs";
import { promisify } from "util";
import { turbinizeHTMLString, TurbinizeOptions } from "./index";

const readFile = promisify(fs.readFile);

export async function turbinizeHTMLFile(path: string, opt?: TurbinizeOptions) {
  const file = await readFile(path);
  return turbinizeHTMLBuffer(file, opt);
}

export function turbinizeHTMLFileSync(path: string, opt?: TurbinizeOptions) {
  const file = fs.readFileSync(path);
  return turbinizeHTMLBuffer(file, opt);
}

function turbinizeHTMLBuffer(buffer: Buffer, opt?: TurbinizeOptions) {
  return turbinizeHTMLString(buffer.toString("utf8"), opt);
}
