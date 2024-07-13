import React from 'react';
import {Block, Button, Icon, Page, Sheet, Toolbar} from 'framework7-react';
import '../css/WikipediaInfo.css'; // Import the CSS file

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
            <div className="sheet-modal-swipe-step">
                <Toolbar>
                    <div className="left"><h1>{query}</h1></div>
                    <div className="right">
                        <Button small fill sheetClose onClick={onClose} className="wikipedia-sheet-close-button">
                            <Icon f7="xmark" size="24px"/>
                        </Button>
                    </div>
                </Toolbar>
            </div>
            <Page style={{padding: '16px'}}>
                <Block >
                    {info}
                </Block>
            </Page>
        </Sheet>
    );
};

export default WikipediaInfo;
