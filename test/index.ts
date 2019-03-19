import * as assert from "assert";
import * as T from "../src";

describe("HTML", () => {
  it("simpel div", () => {
    const html = "<div>Some text</div>";
    const tHtml = T.turbinizeHTMLString(html);
    assert.strictEqual(tHtml, 'div(["Some text"])');
  });

  it("support namespace", () => {
    const html = "<div>Some text</div>";
    const tHtml = T.turbinizeHTMLString(html, { elementNamespace: "E" });
    assert.strictEqual(tHtml, 'E.div(["Some text"])');
  });

  it("should add attributes", () => {
    const html = '<div id="123" title="test"></div>';
    const tHtml = T.turbinizeHTMLString(html);
    assert.strictEqual(tHtml, 'div({\n  id: "123",\n  title: "test"\n})');
  });

  it("nested tags", () => {
    const html = "<section><header></header><footer></footer></section>";
    const tHtml = T.turbinizeHTMLString(html);
    assert.strictEqual(tHtml, "section([header(), footer()])");
  });

  it("nested tags with namespace", () => {
    const html = "<section><header></header><footer></footer></section>";
    const tHtml = T.turbinizeHTMLString(html, { elementNamespace: "E" });
    assert.strictEqual(tHtml, "E.section([E.header(), E.footer()])");
  });
});
