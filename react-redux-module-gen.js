#!/usr/local/bin/node

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
let actionTypes_contents = `
export const ACTION_NAME = "${module_name}/ACTION_NAME";
`;

fs.writeFileSync(path.join(currDir, module_name,"actionTypes.js"), actionTypes_contents);

// generate actions
let actions_contents = `
import * as actions from './actionTypes';

export function actionName() {
  return {
    type: actions.ACTION_NAME
  };
}
`;

fs.writeFileSync(path.join(currDir, module_name,"actions.js"), actions_contents);


// generate constants
let constants_contents = `
export const name = '${module_name}';
`;

fs.writeFileSync(path.join(currDir, module_name,"constants.js"), constants_contents);

// generate index
let index_contents = `
import reducer from './reducer';
import * as constants from './constants';

export default {
  constants,
  reducer
};
`;

fs.writeFileSync(path.join(currDir, module_name,"index.js"), index_contents);

// generate reducer
let reducer_contents = `
import {
  ACTION_NAME
} from './actionTypes';

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

let selector_contents = `
//import { createSelector } from 'reselect';
// import from reselect if you're using it

import { name } from './constants';

export const exampleStateSelector = state => state[name].exampleState;
`;

fs.writeFileSync(path.join(currDir, module_name,"selectors.js"), selector_contents);


