/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};

// const modulePaths = require('./modulePaths');
// const resolve = require('path').resolve;
// const fs = require('fs');

// // Update the following line if the root folder of your app is somewhere else.
// const ROOT_FOLDER = resolve(__dirname, '..');

// // const config = {
// //   transformer: {
// //     getTransformOptions: () => {
// //       const moduleMap = {};
// //       modulePaths.forEach((path) => {
// //         if (fs.existsSync(path)) {
// //           moduleMap[resolve(path)] = true;
// //         }
// //       });
// //       return {
// //         preloadedModules: moduleMap,
// //         transform: { inlineRequires: { blockList: moduleMap } }
// //       };
// //     }
// //   },
// //   projectRoot: ROOT_FOLDER
// // };
// const config = {
//   transformer: {
//     getTransformOptions: () => {
//       const moduleMap = {};
//       modulePaths.forEach(path => {
//         if (fs.existsSync(path)) {
//           moduleMap[resolve(path)] = true;
//         }
//       });
//       return {
//         preloadedModules: moduleMap,
//         transform: { inlineRequires: { blacklist: moduleMap } },
//       };
//     },
//   },
// };

// module.exports = config;