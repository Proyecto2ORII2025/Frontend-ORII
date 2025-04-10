import { useEffect, useState } from "react";
import { Movility } from "@/types/movilityType";
import { filterMovilities } from "@/types/filterMovilityType";

export interface FilterState {
  anio?: string;
  mes?: string;
  programa?: string;
  facultad?: string;
  semestre?: string;
}

export function useMovilityFilters(originalMovilities: Movility[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterState>({});
  const [filteredMovilities, setFilteredMovilities] = useState<Movility[]>(originalMovilities);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [originalMovilities, searchTerm, activeFilters]);

  const applyFiltersAndSearch = (
    search: string = searchTerm,
    filters: FilterState = activeFilters
  ) => {
    const hasSearch = search.trim() !== "";
    const hasFilters = Object.values(filters).some(Boolean);

    if (hasSearch && hasFilters) {
      applySearchAndFilters(search, filters);
    } else if (hasSearch) {
      applySearch(search);
    } else if (hasFilters) {
      applyFilters(filters);
    } else {
      resetToOriginal();
    }
  };

  const applySearch = (term: string) => {
    const filtered = originalMovilities.filter((mov) =>
      filterBySearchTerm(mov, term)
    );
    setFilteredMovilities(filtered);
    setIsSearching(true);
  };

  const applyFilters = (filters: FilterState) => {
    let filtered = originalMovilities;

    Object.entries(filters).forEach(([key, value]) => {
      filtered = filterMovilities(filtered, key, value ?? null);
    });

    setFilteredMovilities(filtered);
    setIsSearching(true);
  };

  const applySearchAndFilters = (term: string, filters: FilterState) => {
    let filtered = originalMovilities.filter((mov) =>
      filterBySearchTerm(mov, term)
    );

    Object.entries(filters).forEach(([key, value]) => {
      filtered = filterMovilities(filtered, key, value ?? null);
    });

    setFilteredMovilities(filtered);
    setIsSearching(true);
  };

  const resetToOriginal = () => {
    setFilteredMovilities(originalMovilities);
    setIsSearching(false);
  };

  const filterBySearchTerm = (mov: Movility, term: string): boolean => {
    const lowerTerm = term.toLowerCase();
    return (
      mov?.agreement?.institution?.toLowerCase().includes(lowerTerm) ||
      mov.direction?.toLowerCase().includes(lowerTerm) ||
      mov.destination?.toLowerCase().includes(lowerTerm)
    );
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    applyFiltersAndSearch(value);
  };

  const handleFilter = (filterType: keyof FilterState | "reset", value?: string) => {
    let newFilters: FilterState;

    if (filterType === "reset") {
      newFilters = {};
    } else if (activeFilters[filterType] === value) {
      newFilters = { ...activeFilters, [filterType]: undefined };
    } else {
      newFilters = { ...activeFilters, [filterType]: value };
    }

    setActiveFilters(newFilters);
    applyFiltersAndSearch(searchTerm, newFilters);
  };

  return {
    searchTerm,
    activeFilters,
    filteredMovilities,
    handleSearch,
    handleFilter,
    isSearching,
  };
}
