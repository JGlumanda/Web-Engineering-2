// WikipediaInfo.jsx
import React from 'react';
import { Sheet, Page, Block, Button, Icon, Toolbar } from 'framework7-react';
import '../css/WikipediaInfo.css'; // Import the CSS file

const WikipediaInfo = ({ query, opened, onClose, info }) => {
    return (
        <Sheet
            className="wikipedia-sheet"
            opened={opened}
            backdrop={false}
            onSheetClosed={onClose}
        >
            <Toolbar>
                <div className="left wikipedia-sheet-title">{query}</div>
                <div className="right">
                    <Button small fill sheetClose onClick={onClose} className="wikipedia-sheet-close-button">
                        <Icon f7="xmark" size="24px" />
                    </Button>
                </div>
            </Toolbar>
            <Page>
                <Block className="wikipedia-sheet-content">
                    <div>
                        {info}
                    </div>
                </Block>
            </Page>
        </Sheet>
    );
};

export default WikipediaInfo;
