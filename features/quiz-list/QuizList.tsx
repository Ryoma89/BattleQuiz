import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import QuizCard from "@/app/components/elements/QuizCard";
const QuizList = () => {
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-center">Quizzes</h1>
        <div className="flex items-center justify-center gap-2 mt-5 md:mt-0">
          <div className="relative flex-1 max-w-52">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search quizzes..."
              className="w-full rounded-lg bg-background pl-8 pr-4 py-2 text-sm max-w-52"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <FilterIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Filters</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>General</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Math</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Geography</DropdownMenuCheckboxItem>
              {/* 追加のカテゴリー... */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-2 md:mt-10 lg:grid-cols-3">
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </div>
    </>
  );
};

export default QuizList;
