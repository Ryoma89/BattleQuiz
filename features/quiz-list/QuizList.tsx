'use client';
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import QuizCard from "@/app/components/elements/QuizCard";
import { fetchQuizzes } from "@/lib/fetch/fetchQuiz";
import { Quiz } from "@/types/Quiz";
import Pagination from "@/app/components/elements/Pagination";
import { SearchIcon } from "lucide-react";
import Dropdown from "@/app/components/elements/Dropdown";
import { User } from "@/types/User";

const QuizList = ({ profileInfo }: { profileInfo: User }) => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setQuizzes([]);
      setFilteredQuizzes([]);
      const quizData = await fetchQuizzes('popular');
      setQuizzes(quizData);
      setFilteredQuizzes(quizData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = quizzes.filter((quiz) => {
      const matchesSearchTerm = quiz.title.toLowerCase().startsWith(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(quiz.category);
      return matchesSearchTerm && matchesCategory;
    });
    setFilteredQuizzes(filtered);
  }, [searchTerm, selectedCategories, quizzes]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuizzes = filteredQuizzes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dropdown
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-2 md:mt-10 lg:grid-cols-3">
        {currentQuizzes.map((quiz) => (
          <QuizCard key={quiz.quiz_id} quiz={quiz} user={profileInfo}/>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </>
  );
};

export default QuizList;
