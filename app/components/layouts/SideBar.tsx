'use client';
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Building,
  Edit,
  Home,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <section className="flex flex-col md:fixed mt-10 w-[230px]">
      <div className="flex items-center py-2">
        <Home className="w-5 h-5" />
        <Link href="/home" className="ml-2 lg:text-xl">
          Home
        </Link>
      </div>
      <div className="flex items-center py-2">
        <LayoutDashboard className="w-5 h-5" />
        <Link href="/dashboard" className="ml-2 lg:text-xl">
          Dashboard
        </Link>
      </div>
      <div className="flex items-center py-2">
        <BookOpen className="w-5 h-5" />
        <Link href="/quiz-list" className="ml-2 lg:text-xl">
          Quizzes
        </Link>
      </div>
      <div className="flex items-center py-2">
        <Edit className="w-5 h-5" />
        <Link href="/create-quiz" className="ml-2 lg:text-xl">
          Create Quizzes
        </Link>
      </div>
      <div className="flex items-center py-2">
        <MessageSquare className="w-5 h-5" />
        <Link href="/chat" className="ml-2 lg:text-xl">
          Chat
        </Link>
      </div>
      <div className="flex items-center py-2">
        <Building className="w-5 h-5" />
        <Link href="/organizations" className="ml-2 lg:text-xl">
          Organizations
        </Link>
      </div>
    </section>
  );
};

export default SideBar;