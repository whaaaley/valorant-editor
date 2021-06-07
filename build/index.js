#!/usr/bin/env node

const esbuild = require('esbuild')
const typescript = require('typescript')
const uglify = require('uglify-js')

const sass = require('sass')
const CleanCSS = require('clean-css')

const config = require('./config')

const [,, fn, entry] = process.argv
const { NODE_ENV } = process.env

function esb (options) {
  let data = esbuild.buildSync({
    entryPoints: [entry],
    ...config.esbuild.general,
    ...options
  })

  data = data.outputFiles[0].contents.buffer
  data = Buffer.from(data).toString()

  if (NODE_ENV === 'production') {
    data = typescript.transpileModule(data, config.typescript)
    data = uglify.minify(data.outputText, config.uglify)
  }

  process.stdout.write(data)
}

function css () {
  let data = sass.renderSync({ file: entry, ...config.sass }).css

  data = NODE_ENV === 'production'
    ? new CleanCSS(config.cleancss).minify(data)
    : Buffer.from(data).toString()

  process.stdout.write(data)
}

function html () {
  esb(config.esbuild.html)
}

function js () {
  esb(config.esbuild.js)
}

({ css, html, js })[fn]()
