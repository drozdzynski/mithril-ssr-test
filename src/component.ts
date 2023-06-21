import m from "mithril";
import store from "./store";
import component from "./teiler";

const test = component<{test: number}>`
  color: ${({test}) => test % 2 === 0 ? 'red' : 'blue'};
`

const ComponentWithState: m.ClosureComponent<{test: string}> = vnode => {
  const count = store(1);
  const double = count.value.map(value => value*2)

  return {
    oninit: (vnode) => {
      console.log("init a closure component");
    },
    view: (vnode) => {
      return m(
        "div",
        m(test, 
          {
            test: count.value()
          },
          [
          m(
            "p", 
            {
              // onclick: () => console.log('click', teiler.sheet.dump()),
            }, 
            "abc"
          )
        ]),
        m("p", "Test: " + count.value() + " | " + double()),
        m(
          "button",
          {
            onclick: function () {
              count.update((value) => value + 1);
            }
          },
          "Increment count"
        ),
      );
    }
  };
}

export default ComponentWithState