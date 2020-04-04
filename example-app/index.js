/** @jsx Drawer.createElement */

import '@babel/polyfill';
import App from './app';
import Drawer from '../lib/drawer';
import createRoot from './scripts/root-creator';
import './app';

document.body.appendChild(createRoot());
Drawer.render(<App/>, document.getElementById("root"));
