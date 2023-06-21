import toHTML from 'mithril-node-render'
import component from './src/component'
import m from 'mithril'
import baseView from './src/baseView';
import { SheetContextProvider } from './src/SheetContext';
import { createStyleSheet } from '../../teiler/packages/core/src/index'

export default {
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/index.js') {
      return new Response(Bun.file("./dist/index.js"))
    }

    const sheet = createStyleSheet();
    const rootNode = m(SheetContextProvider({ sheet }), m(baseView(component, sheet)));
    const html = await toHTML(rootNode);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
};
