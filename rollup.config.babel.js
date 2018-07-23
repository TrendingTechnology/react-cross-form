import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';


// export default {
//     input: 'src/main.js',
//     output: {
//       file: 'bundle.js',
//       format: 'cjs'
//     }
// };

export default {
  input: './src/index.js',
  moduleName: 'ReactCrossForm',
  sourcemap: true,

  // output: {
  //   file: './build/rrpm.js',
  //   format: 'umd',
  //   name: 'ReactCrossForm',
  //   sourcemap: true
  // },

  targets: [
    {
      dest: './build/rrpm.js',
      format: 'umd'
    },
    {
      dest: 'build/rrpm.module.js',
      format: 'es'
    }
  ],

  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ],

  external: ['react'],

  globals: {
    react: 'React',
  }
};