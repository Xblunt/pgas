import styled from "styled-components";

interface BlockContainerProps {
    $clickable?: boolean;
}

export const BlockWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const BlockTitle = styled.h2`
    margin: 0 0 10px 0;
    font-family: var(--fontfamily);
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);
    
    @media (max-width: 768px) {
        font-size: 18px;
        margin-bottom: 8px;
    }
`;

export const BlockContainer = styled.div<BlockContainerProps>`
    background: var(--color-white);
    border: 1px solid var(--color-primary);
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    transition: background-color 0.2s ease;
    min-height: 72px; /* Минимальная высота как у DropdownBlock */
    height: auto;
    box-sizing: border-box;

    ${props => props.$clickable && `
        cursor: pointer;
        
        &:hover {
            background: rgba(38, 49, 69, 0.04);
        }
    `}

    @media (max-width: 768px) {
        padding: 12px 16px;
        gap: 12px;
        min-height: 64px;
    }
`;

export const BlockContent = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;

    @media (max-width: 768px) {
        gap: 12px;
    }
`;

export const NumberBox = styled.div`
    width: 44px;
    height: 44px;
    border: 1px solid var(--color-secondary);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--fontfamily);
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 36px;
        height: 36px;
        font-size: 18px;
    }
`;

export const InfoText = styled.div`
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const InfoPrimary = styled.div`
    font-family: var(--fontfamily);
    font-size: 16px;
    font-weight: 700;
    color: var(--color-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

export const InfoSecondary = styled.div`
    font-family: var(--fontfamily);
    font-size: 14px;
    font-weight: 500;
    color: rgba(38, 49, 69, 0.75);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const BlockActions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    @media (max-width: 768px) {
        gap: 8px;
        flex-direction: column;
        
        button {
            width: 100%;
            min-width: 100px;
        }
    }
`;