const fs = require('node:fs');
const path = require('node:path');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const { dts } = require('rollup-plugin-dts');

const input = path.resolve(__dirname, 'src/core/watermark.ts');
const distDir = path.resolve(__dirname, 'dist');
const typesDir = path.resolve(__dirname, 'types');

fs.rmSync(distDir, { recursive: true, force: true });
fs.rmSync(typesDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(typesDir, { recursive: true });

module.exports = [
  {
    input,
    output: [
      {
        file: path.join(distDir, 'index.esm.js'),
        format: 'es',
      },
      {
        file: path.join(distDir, 'index.umd.js'),
        format: 'umd',
        name: 'CommonWatermark',
      },
      {
        file: path.join(distDir, 'index.umd.min.js'),
        format: 'umd',
        name: 'CommonWatermark',
        plugins: [terser()],
      },
    ],
    plugins: [
      nodeResolve({
        browser: true,
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
      }),
    ],
  },
  {
    input,
    output: [
      {
        file: path.join(typesDir, 'index.d.ts'),
        format: 'es',
      },
    ],
    plugins: [
      dts({
        tsconfig: './tsconfig.build.json',
      }),
    ],
  },
];
