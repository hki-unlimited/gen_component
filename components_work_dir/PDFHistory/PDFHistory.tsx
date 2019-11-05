import React from "react";
import "./PDFHistory.scss";
import { observer } from "mobx-react-lite";

interface IPDFHistoryProps {
    someProp: any[];
}

function PDFHistory(props: IPDFHistoryProps) {
    console.log(props);
    return(
        <div className="pdf-history-container">
            
        </div>
    );
}

export default observer(PDFHistory);