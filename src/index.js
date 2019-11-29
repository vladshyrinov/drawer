/** @jsx Drawer.createElement */

import '@babel/polyfill';
import Book from './components/Book';
import Drawer from './drawer/drawer';
import createRoot from './scripts/root-creator';
import './app';

document.body.appendChild(createRoot());
Drawer.render(<Book/>, document.getElementById("root"));


// const element = {
//     type: "div",
//     props: {
//         id: "container",
//         children: [
//             { type: "input", props: { value: "foo", type: "text" } },
//             { type: "a", props: { href: "/bar" } },
//             {
//                 type: "span", props: {
//                     children: [
//                         {
//                             type: "TEXT ELEMENT",
//                             props: { nodeValue: "Foo" }
//                         }
//                     ]
//                 }
//             }
//         ]
//     }
// };

// function tick() {
//     const date = new Date().toLocaleString();
//     const dateElem = <h1>{date}</h1>;
//     render(dateElem, document.getElementById("root"));
// }

// setInterval(tick, 1000);

// render(element, document.getElementById("root"));

