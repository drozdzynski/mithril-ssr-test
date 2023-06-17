import m from "mithril";

type Context<T> = {
  state: () => T;
  Provider: () => {
    view: (
      vnode: m.Vnode<T>
    ) => (m.ChildArrayOrPrimitive | m.Vnode<unknown, unknown>)[];
  };
};

export const useContext = <T>(context: Context<T>): T => context.state();

export default function createContext<T>(
  defaultValue: T | undefined
): Context<T> {
  let providedContext = defaultValue;

  const state = (): T | undefined => providedContext;

  const Provider = () => {
    return {
      view: (vnode: m.Vnode<T>) => {
        providedContext = vnode.attrs;

        return [
          vnode.children,

          m({
            view: () => {}
          })
        ];
      }
    };
  };

  return {
    state,
    Provider
  };
}
