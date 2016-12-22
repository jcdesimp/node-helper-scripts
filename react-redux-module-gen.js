#!/usr/local/bin/node
"use strict";

const fs = require('fs');
const path = require('path');

const usageString = "usage: react-redux-module-gen <module_name>";

const currDir = process.cwd();

const args = process.argv;

let module_name = args[2];

if(!module_name) {
    console.log(usageString);
    process.exit();
}

fs.mkdirSync(path.join(currDir, module_name))

// generate components folder
fs.mkdirSync(path.join(currDir, module_name, "components"))


// generate actionTypes
let actionTypes_contents = `"use strict";

export const ACTION_NAME = "${module_name}/ACTION_NAME";
`;

fs.writeFileSync(path.join(currDir, module_name,"actionTypes.js"), actionTypes_contents);

// generate actions
let actions_contents = `"use strict";

import * as actions from './actionTypes';

export function actionName() {
    return {
        type: actions.ACTION_NAME
    };
}
`;

fs.writeFileSync(path.join(currDir, module_name,"actions.js"), actions_contents);


// generate constants
let constants_contents = `"use strict";

export const name = "${module_name}";
`;

fs.writeFileSync(path.join(currDir, module_name,"constants.js"), constants_contents);

// generate index
let index_contents = `"use strict";

import reducer from './reducer';
import * as constants from './constants';

export default {
    constants,
    reducer
};
`;

fs.writeFileSync(path.join(currDir, module_name,"index.js"), index_contents);

// generate reducer
let reducer_contents = `"use strict";

import {
    ACTION_NAME
} from "./actionTypes";

const defaultState = {
    exampleState: 0
};


export default function (state = defaultState, action) {
    switch (action.type) {
    case ACTION_NAME:
        return Object.assign({}, state, {
            exampleState: state.exampleState + 1
        });
    default:
        return state;
    }
}
`;

fs.writeFileSync(path.join(currDir, module_name,"reducer.js"), reducer_contents);


