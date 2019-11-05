const fs = require("fs");
var rimraf = require("rimraf");
const readlineSync = require('readline-sync');
const componentsRootDir = "components_work_dir";
const templatesRootDir = "templates";
const templatePaths = {
    component: `${templatesRootDir}/componentTmpl.tsx`,
    sass: `${templatesRootDir}/sassTmpl.scss`
}
const defaultComponentName = "MyComponent";

rimraf.sync(componentsRootDir);
fs.mkdirSync(componentsRootDir);

// Component name
let componentName = readlineSync.question(`Enter a name for the new component (default ${defaultComponentName}): `);
componentName = componentName || defaultComponentName;

//The first version will just generate the files under components.
//let componentDir = readlineSync.question('Directory for the new component: ');

const componentDir = `${componentsRootDir}/${componentName}`;
fs.mkdir(componentDir, () => {
    fs.readFile(templatePaths.component, "utf8", (err, data) => {        
        fs.writeFile(`${componentsRootDir}/${componentName}/${componentName}.tsx`, data, (err) => {
            if (err) throw err;
        });
    });
    fs.readFile(templatePaths.sass, "utf8", (err, data) => {        
        fs.writeFile(`${componentsRootDir}/${componentName}/${componentName}.scss`, data, (err) => {
            if (err) throw err;
        });
    });
})

//Enter a name for the new component and hit Enter (default MyComponent):