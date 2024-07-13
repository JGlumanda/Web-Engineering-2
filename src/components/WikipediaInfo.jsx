import React from 'react';
import {Block, BlockTitle, Sheet} from 'framework7-react';
import '../css/WikipediaInfo.css';

const WikipediaInfo = ({query, opened, onClose, info}) => {
    return (
        <Sheet
            className="my-sheet-swipe-to-step wikipedia-sheet"
            opened={opened}
            backdrop={false}
            onSheetClosed={onClose}
            swipeToClose
            swipeToStep
        >
            <div className="sheet-modal-inner" style={{width:'100%'}}>
                <div className="sheet-modal-swipe-step" id="wikipedia-info">
                    <div className="wikipedia-sheet-header">
                        <div className="wikipedia-sheet-title">{query}</div>
                    </div>
                </div>
                <div className="page-content wikipedia-info">
                    <BlockTitle>
                        {query}
                    </BlockTitle>
                    <Block>{info}</Block>
                </div>
            </div>
        </Sheet>
    );
};

export default WikipediaInfo;
