const fs = require("fs");
const config = require('./config.json');
const readlineSync = require('readline-sync');
var changeCase = require('change-case')
const { componentsRootDir, templatesRootDir } = config;
const { componentTmpl, componentWithoutPropsTmpl, sassTmpl } = config.templateNames.component;
const templatePaths = {
    component: `${templatesRootDir}/${componentTmpl}`,
    componentWithoutProps: `${templatesRootDir}/${componentWithoutPropsTmpl}`,
    sass: `${templatesRootDir}/${sassTmpl}`
};
const defaultComponentName = "MyComponent";

process.chdir(__dirname); //Set working directory to the directory of the script

// Component name
let componentName = readlineSync.question(`Enter a name for the new component (default ${defaultComponentName}): `);
componentName = componentName || defaultComponentName;

let withPropsAnswer = readlineSync.question(`Does the component have props [Y/n]: `, { //readLineSync has an option keyInYN, but does not accept Enter as default(?)
    defaultInput: 'y'
});
let withProps = (withPropsAnswer.toLowerCase() === "n" || withPropsAnswer.toLowerCase() === "no") ? false : true;

let componentParentDirPath = readlineSync.question(`Parent directory for the new component, starting from ${componentsRootDir} (e.g. path/to/dir, default .): `, {
    defaultInput: '.'
});

const componentDir = componentParentDirPath === '.' ? `${componentsRootDir}/${componentName}` : `${componentsRootDir}/${componentParentDirPath}/${componentName}`;
if (fs.existsSync(componentDir)) {
    console.warn(`*** WARNING: Component directory ${componentDir} already exists, exiting. *** `);
    process.exit(1);
}

fs.mkdir(componentDir, () => {
    fs.readFile((withProps ? templatePaths.component : templatePaths.componentWithoutProps), "utf8", (err, data) => {
        data = data.replace(new RegExp("{{componentName}}", 'g'), componentName);
        data = data.replace(new RegExp("{{classNamePrefix}}", 'g'), changeCase.paramCase(componentName));
        fs.writeFile(`${componentDir}/${componentName}.tsx`, data, (err) => {
            if (err) throw err;
        });
    });
    fs.readFile(templatePaths.sass, "utf8", (err, data) => {        
        fs.writeFile(`${componentDir}/${componentName}.scss`, data, (err) => {
            if (err) throw err;
        });
    });
});