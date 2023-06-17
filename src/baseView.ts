import m from 'mithril'

const baseView = (component) => {
  return {
    view: (vnode) => [
      m('!doctype[html]'),
      m('html[lang=en]', [
        m('head', [
          // m('title', getTitle(vnode)),
          m('meta[charset=utf-8]'),
          m('script[src=/index.js]'),
        ]),
        m('body', [
          m(component)
        ]),
      ]),
    ]
  }
}

export default baseView