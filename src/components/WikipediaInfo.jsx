import React from 'react';
import { Block, BlockTitle, Sheet } from 'framework7-react';
import '../css/WikipediaInfo.css';

/**
 * WikipediaInfo component displays information in a sheet modal.
 * @param {string} query - Search query text.
 * @param {boolean} opened - Whether the sheet is opened.
 * @param {function} onClose - Function to close the sheet.
 * @param {string} info - Information to display.
 */
const WikipediaInfo = ({ query, opened, onClose, info }) => {
    return (
        <Sheet
            className="my-sheet-swipe-to-step wikipedia-sheet"
            opened={opened}
            backdrop={false}
            onSheetClosed={onClose}
            swipeToClose
            swipeToStep
        >
            <div className="sheet-modal-inner">
                <div className="sheet-modal-swipe-step" id="wikipedia-info">
                    <div className="wikipedia-sheet-header">
                        <div className="wikipedia-sheet-title">{query}</div>
                    </div>
                </div>
                <div className="page-content wikipedia-info">
                    <BlockTitle>{query}</BlockTitle>
                    <Block>{info}</Block>
                </div>
            </div>
        </Sheet>
    );
};

export default WikipediaInfo;
