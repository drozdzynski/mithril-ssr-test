import m from "mithril";
import store from "./store";

const ComponentWithState: m.ClosureComponent<{test: string}> = vnode => {
  var count = store(1);
  var double = count.value.map(value => value*2)

  return {
    oninit: (vnode) => {
      console.log("init a closure component");
    },
    view: (vnode) => {
      return m(
        "div",
        m("p", "Test: " + count.value() + " | " + double()),
        m(
          "button",
          {
            onclick: function () {
              count.update((value) => value + 1);
            }
          },
          "Increment count"
        )
      );
    }
  };
}

export default ComponentWithState