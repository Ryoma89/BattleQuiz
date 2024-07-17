import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { categories } from "@/constants/quizCategory";


interface CategoryDropdownProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}
const Dropdown: React.FC<CategoryDropdownProps> = ({ selectedCategories, onCategoryChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCheckboxItemClick = (event: React.MouseEvent<HTMLDivElement>, category: string) => {
    event.preventDefault();
    onCategoryChange(category);
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-1"
          onClick={toggleDropdown}
        >
          <FilterIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Filters</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category.value}
            checked={selectedCategories.includes(category.value)}
            onClick={(event) => handleCheckboxItemClick(event, category.value)}
          >
            {category.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
