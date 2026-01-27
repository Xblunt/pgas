"use client"

import React from 'react';
import { PaginationContainer, PagesContainer, PageButton, Ellipsis, PageInfo } from './Pagination.styles';
import { IconButton } from '../buttons';

export interface PaginationProps {
  totalItems: number;
  limit: number;
  offset: number;
  onChange: (offset: number) => void;
  visiblePages?: number;
  prevIcon?: string;
  nextIcon?: string;
  className?: string;
  disabled?: boolean;
  showInfo?: boolean;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const currentPage = Math.floor(props.offset / props.limit) + 1;
  const totalPages = Math.ceil(props.totalItems / props.limit);
  const visiblePages = props.visiblePages || 5;
  const disabled = props.disabled || false;
  const showInfo = props.showInfo || false;

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || disabled) return;
    const newOffset = (page - 1) * props.limit;
    props.onChange(newOffset);
  };

  const handlePrev = () => {
    if (currentPage <= 1 || disabled) return;
    const newOffset = props.offset - props.limit;
    props.onChange(Math.max(0, newOffset));
  };

  const handleNext = () => {
    if (currentPage >= totalPages || disabled) return;
    const newOffset = props.offset + props.limit;
    props.onChange(Math.min(newOffset, (totalPages - 1) * props.limit));
  };

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = props.offset + 1;
  const endItem = Math.min(props.offset + props.limit, props.totalItems);

  return (
    <PaginationContainer className={props.className}>
      {showInfo && (
        <PageInfo>
          {startItem}-{endItem} из {props.totalItems}
        </PageInfo>
      )}
      
      <IconButton
        icon={props.prevIcon || '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>'}
        onClick={handlePrev}
        disabled={currentPage <= 1 || disabled}
        size={32}
      />

      <PagesContainer>
        {pageNumbers[0] > 1 && (
          <>
            <PageButton
              $active={currentPage === 1}
              onClick={() => handlePageChange(1)}
              disabled={disabled}
            >
              1
            </PageButton>
            {pageNumbers[0] > 2 && <Ellipsis>...</Ellipsis>}
          </>
        )}

        {pageNumbers.map((page) => (
          <PageButton
            key={page}
            $active={currentPage === page}
            onClick={() => handlePageChange(page)}
            disabled={disabled}
          >
            {page}
          </PageButton>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <Ellipsis>...</Ellipsis>
            )}
            <PageButton
              $active={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
              disabled={disabled}
            >
              {totalPages}
            </PageButton>
          </>
        )}
      </PagesContainer>

      <IconButton
        icon={props.nextIcon || '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'}
        onClick={handleNext}
        disabled={currentPage >= totalPages || disabled}
        size={32}
      />
    </PaginationContainer>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;