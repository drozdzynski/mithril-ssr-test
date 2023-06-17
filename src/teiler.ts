import m from 'mithril'
import { useSheetContext } from './SheetContext';
import styled, { hire, type Compile, type Expression, type Style, type HireOptions, type Sheet } from '../../../teiler/packages/core/src/index'

const createComponent = <Props>(compile: Compile, tag: string, styles: Array<Style<Props>>): m.ClassComponent<Props> => {
  return {
    view(vnode) {
      const sheetContext = useSheetContext()
      console.log('sheetContext', sheetContext)
      return m(tag, {
          className: compile(styles, vnode.attrs).join(' '),
          ...vnode.attrs
        }, vnode.children)
    }
  }
}

type Component = {
  <Component extends m.ClassComponent<unknown>>(binded: Component): <Props extends object>(
    string: TemplateStringsArray,
    ...expressions: Expression<Component extends m.ClassComponent<infer P> ? P & Props : Props>[]
  ) => m.ClassComponent<Component extends m.ClassComponent<infer P> ? P & Props : Props>
  <Props>(string: TemplateStringsArray, ...expressions: Expression<Props>[]): m.ClassComponent<Props>
}

function construct(tag: string, compile: Compile) {
  const binded = createComponent.bind(null, compile, tag)

  return <Type, Props>(stringOrBinded: TemplateStringsArray, ...expressions: Expression<Props>[]) => {
    return styled<Type, Props>(binded, stringOrBinded, ...expressions)
  }
}

function hireMithril(options: HireOptions): {
  sheet: Sheet
  component: Component
  global: Component
} {
  const hired = hire(options)

  const component = construct('div', hired.component)

  const global = construct(null, hired.global)

  return {
    sheet: hired.sheet,
    component: component,
    global,
  }
}

export default hireMithril