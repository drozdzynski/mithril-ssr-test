import toHTML from 'mithril-node-render'
import component from './src/component'
import m from 'mithril'
import baseView from './src/baseView';

export default {
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/index.js') {
      return new Response(Bun.file("./dist/index.js"))
    }

    const rootNode = m(baseView(component));

    return new Response(await toHTML(rootNode), {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
};
