"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { DefaultButton, IconButton } from "@/components/buttons";
import { ButtonSize, ButtonVariant, ScoreItem } from "@/models/types";
import { NameInput, Divider, PointsInput, PlusIcon, ItemsList, ItemRow, ItemName, ItemPoints, RemoveButton, MinusIcon, ScoreContainer, ToolbarActions, ToolbarContainer, ToolbarTitle } from "./Score.styles";

export interface Props {
    title?: string;
    onAddItem?: (item: ScoreItem) => void;
    onItemsChange?: (items: ScoreItem[]) => void;
    initialItems?: ScoreItem[];
    debounceDelay?: number;
}

const Score: React.FC<Props> = (props) => {
    const [items, setItems] = useState<ScoreItem[]>(props.initialItems || []);
    const lastSentItemsRef = useRef<ScoreItem[]>(props.initialItems);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const isItemFilled = (item: ScoreItem): boolean => {
        return item.name.trim() !== "" && item.points !== undefined && item.points !== 0;
    };

    const sendData = useCallback((currentItems: ScoreItem[]) => {
        const allFilled = currentItems.every(isItemFilled);
        
        if (allFilled && JSON.stringify(currentItems) !== JSON.stringify(lastSentItemsRef.current)) {
            props.onItemsChange?.(currentItems);
            lastSentItemsRef.current = [...currentItems];
        }
    }, [props.onItemsChange]);

    const debouncedSendData = useCallback((currentItems: ScoreItem[]) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            sendData(currentItems);
        }, props.debounceDelay || 100);
    }, [props.debounceDelay, sendData]);

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        debouncedSendData(items);
    }, [items, debouncedSendData]);

    const handleAddItem = () => {
        const newItem: ScoreItem = {
            name: "",
            points: 0
        };

        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        props.onAddItem?.(newItem);
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        
        if (JSON.stringify(updatedItems) !== JSON.stringify(lastSentItemsRef.current)) {
            props.onItemsChange?.(updatedItems);
            lastSentItemsRef.current = [...updatedItems];
        }
        
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
    };

    const handleUpdateItem = (index: number, field: keyof ScoreItem, value: string | number) => {
        const updatedItems = [...items];
        
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: field === 'points' ? Number(value) : value
        };
        
        setItems(updatedItems);
    };

    const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Enter") {
            const input = e.target as HTMLInputElement;
            const form = input.form;
            if (form) {
                const inputIndex = Array.prototype.indexOf.call(form, input);
                if (form.elements[inputIndex + 1]) {
                    (form.elements[inputIndex + 1] as HTMLElement).focus();
                }
            }
        }
    };

    return (
        <ScoreContainer>
            <ToolbarContainer>
                <ToolbarTitle>{props.title}</ToolbarTitle>
                <ToolbarActions>
                    <DefaultButton
                        variant={ButtonVariant.PRIMARY}
                        size={ButtonSize.SAMLL}
                        onClick={handleAddItem}
                    >
                        <PlusIcon>+</PlusIcon>
                    </DefaultButton>
                </ToolbarActions>
            </ToolbarContainer>

            {items.length > 0 && (
                <ItemsList>
                    {items.map((item, index) => (
                        <ItemRow key={index} as="form">
                            <NameInput 
                                type="text"
                                placeholder="Название"
                                value={item.name}
                                onChange={(e) => handleUpdateItem(index, 'name', e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                            />
                            <Divider>|</Divider>
                            <PointsInput 
                                type="number"
                                placeholder="0"
                                value={item.points || ''}
                                onChange={(e) => handleUpdateItem(index, 'points', e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                            />
                            <IconButton
                                icon="&minus;"
                                size={30}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRemoveItem(index);
                                }}
                            />
                        </ItemRow>
                    ))}
                </ItemsList>
            )}
        </ScoreContainer>
    );
};

export default Score;