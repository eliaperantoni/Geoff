import styled from "styled-components";
import PopupLib from "reactjs-popup";

const Popup = styled(PopupLib).attrs(props => ({
    modal: true,
    closeOnDocumentClick: true,
    ...props,
}))`
    &-content {
        background: none !important;
        border: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }

    &-overlay {
        background: rgba(68,84,100,0.61) !important;
    }
`;

export default Popup;
