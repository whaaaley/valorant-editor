
import { a, div, h1, h2, p, text } from '../lib/vnodes/html'

import main from './_main'
import link from '../lib/routerLink'

const h = (tag, data) => tag([text(data)])

const Item = data => {
  const onclick = event => {
    event.preventDefault() // prevent href
    link({ to: data.to })
  }

  const props = typeof data.href === 'string'
    ? { href: data.href, target: '_blank' }
    : { href: data.to, onclick }

  return a({ class: 'item', ...props }, [
    div({ class: 'icon ' + data.iconClass }),
    div({ class: 'body' }, [
      h(h1, data.title),
      h(p, data.body)
    ])
  ])
}

const Apps = (state, dispatch) => {
  return div({ class: 'apps' }, [
    div({ class: 'head' }, [
      h(h1, 'Apps')
    ]),
    // Item({
    //   to: '/insights',
    //   title: 'Onclick Insights',
    //   iconClass: '-insights',
    //   body: 'Connect your Facebook account to view Instagram analytics for business accounts.'
    // }),
    Item({
      href: 'https://resize-gg.netlify.app/',
      title: 'Resize.gg',
      iconClass: '-resize',
      body: 'Small utility to cacluate aspect ratio dimensions.'
    }),
    Item({
      href: 'https://discord-message-queue.netlify.app/',
      title: 'Discord Message Queue',
      iconClass: '-discord',
      body: 'Small app to queue messages before sending them to discord.'
    }),
    Item({
      href: 'https://state-sync-demo.netlify.app/',
      title: 'State Sync Demo',
      iconClass: '-sync',
      body: 'Syncs app state between iframes on a page. Useful for designing responsible mobile layouts.'
    }),
    // Item({
    //   to: '/wiki',
    //   title: 'Wiki Editor (wip)',
    //   iconClass: '-resize',
    //   body: 'A simple dashboard and editor to create wiki-like articles using markdown.'
    // }),
    Item({
      to: '/blog',
      title: 'Dustin\'s Blog',
      iconClass: '-blog',
      body: 'You can find all my software rants here. I think I\'m smart sometimes. '
    }),
    Item({
      to: '/resume',
      title: 'Dustin\'s Resume',
      iconClass: '-resume',
      body: 'I\'m a self taught developer and designer. See all of my skills and experience here.'
    }),
    Item({
      to: '/feedback',
      title: 'Feedback',
      iconClass: '-feedback',
      body: 'Send me feedback on how to improve my apps or maybe something cute.'
    }),
    // Item({
    //   to: '/counter',
    //   title: 'Counter Demo',
    //   iconClass: '-calculate',
    //   body: 'Demo page showcasing the framework all of my apps are built with.'
    // }),
    div({ class: '_footer -span' }, [
      p([
        text('© ' + state.footer.year + ' Dustin Dowell')
      ])
    ])
  ])
}

export default {
  view: main(Apps),
  onroute: () => {}
}
