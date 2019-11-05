import React from "react";
import "./PdfHistoryList.scss";
import { observer } from "mobx-react-lite";

interface IPdfHistoryListProps {
    fileList: any[];
}

function PdfHistoryList(props: IPdfHistoryListProps) {
    console.log(props);
    return(
        <div className="pdf-history-list-container">
            (TODO history of previously generated PDF files)
        </div>
    );
}

export default observer(PdfHistoryList);