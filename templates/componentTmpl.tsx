import React from "react";
import "./{{componentName}}.scss";
import { observer } from "mobx-react-lite";

interface I{{componentName}}Props {
    someProp: any[];
}

function {{componentName}}(props: I{{componentName}}Props) {
    console.log(props);
    return(
        <div className="{{classNamePrefix}}-container">
            
        </div>
    );
}

export default observer({{componentName}});