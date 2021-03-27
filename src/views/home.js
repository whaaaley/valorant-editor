
import { div, h1, h2, hr, li, p, text, ul } from '../lib/vnodes/html'

import main from './_main'

const Legend = () => {
  return div({ class: 'legend' }, [
    h1([text('Gameplay')]),
    ul([
      li([text('General')]),
      li([text('Communication')]),
      li([text('Economy')]),
      li([text('Team Composition')])
    ]),
    hr(),
    h1([text('Settings')]),
    ul([
      li([text('Sensitivity')]),
      li([text('Crosshair')])
    ])
  ])
}

const Card = data => {
  const target = [
    h1([
      text(data.title)
    ])
  ]

  for (let i = 0; i < data.content.length; i++) {
    const section = data.content[i]

    const heading = h2([
      text(section.title)
    ])

    target.push(heading)

    for (let i = 0; i < section.content.length; i++) {
      const words = section.content[i]

      const paragraph = p([
        text(words)
      ])

      target.push(paragraph)
    }
  }

  return div({ class: 'card' }, target)
}

const CardExample = () => {
  return div({ class: 'card' }, [
    h1([
      text('Gameplay Tips')
    ]),
    h2([
      text('General')
    ]),
    p([
      text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    ]),
    p([
      text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    ]),
    p([
      text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    ])
  ])
}

const Home = (state, dispatch) => {
  return div({ class: 'home' }, [
    div({ class: 'main' }, [
      div([
        Legend()
      ]),
      div([
        Card({
          title: 'Gameplay',
          content: [
            {
              title: 'General',
              content: [
                '1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                '2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                '3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              ]
            }
          ]
        }),
        CardExample(),
        CardExample()
      ])
    ])

  ])
}

export default {
  view: main(Home),
  onroute: () => {
    console.log('hello from home')
  }
}
