import styled from "styled-components";

export const ScoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
`;

export const ToolbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 0;

    @media (max-width: 768px) {
        padding: 14px 0;
        gap: 12px;
    }
`;

export const ToolbarTitle = styled.h1`
    margin: 0;
    font-family: var(--fontfamily);
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);

    @media (max-width: 768px) {
        font-size: 20px;
        text-align: center;
    }
`;

export const ToolbarActions = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;

    @media (max-width: 768px) {
        justify-content: center;
        flex-wrap: wrap;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    max-width: 600px;
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
    height: 40px;
`;

export const NameInput = styled.input`
    flex: 7;
    border: none;
    outline: none;
    padding: 0 12px;
    font-family: var(--fontfamily);
    font-size: 16px;
    background: transparent;
    width: 70%;
    
    &::placeholder {
        color: var(--color-text-secondary);
    }
`;

export const PointsInput = styled.input`
    flex: 2;
    border: none;
    outline: none;
    padding: 0 12px;
    font-family: var(--fontfamily);
    font-size: 16px;
    background: transparent;
    width: 20%;
    text-align: center;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    
    &[type=number] {
        -moz-appearance: textfield;
    }
`;

export const Divider = styled.span`
    color: var(--color-border);
    padding: 0 8px;
    font-weight: 300;
    user-select: none;
`;

export const PlusIcon = styled.span`
    font-size: 20px;
    font-weight: 500;
    line-height: 1;
`;

export const MinusIcon = styled.span`
    font-size: 20px;
    font-weight: 500;
    line-height: 1;
`;

export const ItemsList = styled.div`
    border: 1px solid var(--color-primary);
    border-radius: 12px;
    overflow: hidden;
`;

export const ItemRow = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-white);
    
    &:last-child {
        border-bottom: none;
    }
    
    &:hover {
        background: var(--color-toned);
    }
`;

export const ItemName = styled.div`
    flex: 7;
    font-family: var(--fontfamily);
    font-size: 16px;
    color: var(--color-primary);
    padding-right: 12px;
    width: 70%;
`;

export const ItemPoints = styled.div`
    flex: 2;
    font-family: var(--fontfamily);
    font-size: 16px;
    font-weight: 600;
    color: var(--color-primary);
    text-align: center;
    width: 20%;
`;

export const RemoveButton = styled.button`
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border: 1px solid var(--color-error);
    background: var(--color-white);
    color: var(--color-error);
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    
    &:hover {
        background: var(--color-error);
        color: var(--color-white);
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

export const DebugInfo = styled.div`
    margin-top: 20px;
    padding: 12px;
    background: var(--color-toned);
    border-radius: 12px;
    font-family: monospace;
    font-size: 12px;
    color: var(--color-text-secondary);
`;

export const Placeholder = styled.span`
    color: var(--color-text-secondary);
    opacity: 0.6;
    font-style: italic;
`;