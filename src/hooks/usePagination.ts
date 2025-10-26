/**
 * usePagination Hook
 * 
 * Manages pagination logic for blog posts including:
 * - Current page tracking
 * - Items per page configuration
 * - Pagination calculations (total pages, start/end indices)
 * - Auto-reset when data changes
 * 
 * @param totalItems - Total number of items to paginate
 * @param itemsPerPage - Number of items per page
 * @param resetDeps - Dependencies that should trigger page reset
 * @returns Pagination state and computed values
 */

import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook for pagination logic
 * @param totalItems - Total number of items
 * @param itemsPerPage - Items to show per page
 * @param resetDeps - Dependencies that trigger page reset to 1
 * @returns Pagination state and computed values
 */
export const usePagination = (
  totalItems: number,
  itemsPerPage: number,
  resetDeps: React.DependencyList = []
) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when dependencies change
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetDeps);

  // Pagination calculations
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = useMemo(() => {
    return totalItems > 0 ? { startIndex, endIndex } : { startIndex: 0, endIndex: 0 };
  }, [startIndex, endIndex, totalItems]);

  // Navigation helpers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    startIndex: paginatedItems.startIndex,
    endIndex: paginatedItems.endIndex,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    setCurrentPage,
  };
};

