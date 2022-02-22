// https://stackoverflow.com/questions/44847749/explain-export-and-export-as-namespace-syntax-in-typescript

// export = React;
// export as namespace React;

// The first form is used for CommonJS and AMD module systems.
// You have to match the export = React with import React = require('./React')
// export = ZipCodeValidator;
// import zip = require("./ZipCodeValidator");

// The export as namespace form creates a global variable so it can be used without importing,
// , but you may still import it with the import { name } from "some-library" form of import
