
import { a, button, div, hr, input, text, textarea } from '../lib/vnodes/html'
import link from '../lib/routerLink'
import main from './_main'

//
//
//

const addSection = ({ guide }) => {
  const section = {
    title: '',
    content: [
      { type: 'heading', value: '' },
      { type: 'textarea', value: '' }
    ]
  }
  guide.unshift(section)
  return { guide }
}

const removeSection = ({ guide }, data) => {
  guide.splice(data.section, 1)
  return { guide }
}

//
//
//

const removeContent = ({ guide }, data) => {
  guide[data.section].content.splice(data.content, 1)
  return { guide }
}

const swapContent = ({ guide }, data) => {
  const content = guide[data.section].content
  const tmp = content[data.from]

  content[data.from] = content[data.to]
  content[data.to] = tmp

  guide.content = content

  return { guide }
}

const addHeading = ({ guide }, data) => {
  const item = { type: 'heading', value: '' }
  guide[data].content.push(item)
  return { guide }
}

const addTextarea = ({ guide }, data) => {
  const item = { type: 'textarea', value: '' }
  guide[data].content.push(item)
  return { guide }
}

//
//
//

const dropSelect = ({ drop }, data) => {
  drop.section = data.section
  drop.active = data.active
  return { drop }
}

const dropReset = ({ drop }) => {
  drop.active = null
  drop.hover = null
  drop.section = null
  return { drop }
}

const dropHover = ({ drop }, data) => {
  drop.section = data.section
  drop.hover = data.hover
  return { drop }
}

//
//
//

const Card = (state, dispatch, data) => {
  const expand = e => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 2 + 'px'
  }

  const list = []

  for (let i = 0; i < data.section.content.length; i++) {
    const item = data.section.content[i]

    let classList = 'editor-drag'

    if (state.drop.section === data.index) {
      if (state.drop.active === i) {
        classList += ' -opaque'
      }

      if (state.drop.hover === i) {
        classList += ' -active'
      }
    }

    const props = {
      class: classList,
      draggable: true,
      ondragstart: () => {
        dispatch(dropSelect, {
          section: data.index,
          active: i
        })
      },
      ondragend: () => {
        dispatch(swapContent, {
          section: data.index,
          from: state.drop.active,
          to: state.drop.hover
        })
        dispatch(dropReset)
      },
      ondragover: () => {
        if (state.drop.hover === i) {
          // do nothing
        } else {
          dispatch(dropHover, {
            section: data.index,
            hover: i
          })
        }
      }
    }

    if (item.type === 'heading') {
      const foo = div(props, [
        input({
          type: 'text',
          placeholder: 'Heading',
          value: item.value
        }),
        button({
          onclick: () => {
            dispatch(removeContent, {
              section: data.index,
              content: i
            })
          }
        })
      ])

      list.push(foo)

      continue // go next
    }

    if (item.type === 'textarea') {
      const bar = div(props, [
        textarea({
          placeholder: 'Lorem ipsum dolor sit amet...',
          onfocus: expand,
          oninput: expand
        }, [
          text(item.value)
        ]),
        button({
          onclick: () => {
            dispatch(removeContent, {
              section: data.index,
              content: i
            })
          }
        })
      ])

      list.push(bar)
    }
  }

  return div({ class: 'editor-card' }, [
    input({ type: 'text', placeholder: 'Title', value: data.section.title }),
    div({ class: 'editor-sub' }, [
      ...list,
      div({ class: 'editor-control' }, [
        hr(),
        button({
          onclick: () => {
            dispatch(addHeading, data.index)
          }
        }, [
          text('Add Heading')
        ]),
        button({
          onclick: () => {
            dispatch(addTextarea, data.index)
          }
        }, [
          text('Add Textarea')
        ])
      ])
    ]),
    div({ class: 'editor-control' }, [
      button([text('Move Up')]),
      button([text('Move Down')]),
      hr(),
      button({
        class: '-red',
        onclick: () => {
          const title = state.guide[data.index].title
          const message = `Are you sure you want to the section "${title}"?`
          const result = window.confirm(message)

          if (result === true) {
            dispatch(removeSection, {
              section: data.index
            })
          }
        }
      }, [
        text('Delete Section')
      ])
    ])
  ])
}

const Editor = (state, dispatch) => {
  const cardList = []

  for (let i = 0; i < state.guide.length; i++) {
    const card = Card(state, dispatch, {
      index: i,
      section: state.guide[i]
    })

    cardList.push(card)
  }

  return div({ class: 'editor' }, [
    div({ class: 'editor-main' }, [
      div({ class: 'editor-control' }, [
        button({
          class: '-red',
          onclick: () => {
            link({ to: '/' })
          }
        }, [
          text('Save and Upload')
        ]),
        // a({
        //   href: 'data:text/json,' + JSON.stringify(state.guide), // doesn't update
        //   download: 'valorant-guide.json'
        // }, [
        //   text('Download Data')
        // ]),
        // button({
        //   onclick: () => {
        //     dispatch(() => {
        //       console.log('import from file')
        //     })
        //   }
        // }, [
        //   text('Import from File')
        // ]),
        hr(),
        button({
          onclick: () => {
            dispatch(addSection)
          }
        }, [
          text('Add Section')
        ])
      ]),
      ...cardList
    ])
  ])
}

export default {
  view: main(Editor),
  onroute: () => {
    console.log('hello from editor')
  }
}
