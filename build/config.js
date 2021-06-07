
module.exports = {
  esbuild: {
    general: {
      bundle: true,
      write: false
    },
    js: {
      define: {
        NODE_ENV: false,
        STATIC: false
      }
    },
    html: {
      define: {
        NODE_ENV: process.env.NODE_ENV,
        STATIC: true
      },
      platform: 'node'
    }
  },
  typescript: {
    compilerOptions: {
      allowJs: true,
      lib: ['DOM', 'ES2015'],
      target: 'ES5'
    }
  },
  uglify: {
    toplevel: true,
    compress: {
      drop_console: true,
      passes: 3
    },
    mangle: {
      toplevel: true
    }
  },
  sass: {
    includePaths: ['node_modules']
  },
  cleancss: {
    level: 2
  }
}
