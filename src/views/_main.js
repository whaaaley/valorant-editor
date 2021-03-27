
import { div, h1, h2, text } from '../lib/vnodes/html'

const Main = slot => (state, dispatch) => {
  const Slot = slot(state, dispatch)

  return div([
    div({ class: 'banner' }, [
      h1([
        text('× WØLVRAM\'s Guide To ×')
      ]),
      div(),
      h2([
        text('Gameplay And Settings Tips For New Players')
      ])
    ]),
    Slot
  ])
}

export default Main
