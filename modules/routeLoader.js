const { findJSFilesInFolder } = require(`../functions/routeLoaderFunction`)
const path = require('path');
const fs = require('fs');
const loadedRoutes = [];

const routes = findJSFilesInFolder(path.join(__dirname, '../routes/app'), `routes/app`);

routes.forEach(routePath => {
    let routeObject = {
        name: path.basename(routePath, '.js'),  // Extracting the route name from the file name
        path: routePath,
        status: 'Not Loaded'
    };

    try {
        let routeModule = require(path.join(__dirname, '..') + `/` + routePath);
        app.use(routeModule);
        routeObject.status = 'Loaded';
    } catch (error) {
        console.error(`Error loading route module: ${routePath}`, error);
        routeObject.status = 'Error';
    }

    loadedRoutes.push(routeObject);
});

console.table(loadedRoutes, ['name', 'path', 'status']);



//  FOR EXAMPLE -> [ TO LOAD ANOTHER ROUTE ]

// const apiLoadedRoutes = [];

// const apiRoutes = findJSFilesInFolder(path.join(__dirname, '../api'), `api`);

// apiRoutes.forEach(routePath => {
//     let routeObject = {
//         name: path.basename(routePath, '.js'),  // Extracting the route name from the file name
//         path: routePath,
//         status: 'Not Loaded'
//     };

//     try {
//         let routeModule = require(path.join(__dirname, '..') + `/` + routePath);
//         app.use(routeModule);
//         routeObject.status = 'Loaded';
//     } catch (error) {
//         console.error(`Error loading route module: ${routePath}`, error);
//         routeObject.status = 'Error';
//     }

//     apiLoadedRoutes.push(routeObject);
// });

// console.table(apiLoadedRoutes, ['name', 'path', 'status']);
