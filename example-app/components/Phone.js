/* @jsx Drawer.createElement */

import Drawer from '../../lib/drawer';

// Functional component example

const Phone = (props) => {
    console.log('Phone component created');
    return <p>{`Mobile phone: ${props.name}`}</p>
}

export default Phone;

