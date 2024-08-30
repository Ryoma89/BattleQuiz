"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Profiles } from "@/types/custom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { QuizData } from "@/types/Quiz";
import { formatDate } from "@/lib/formatDate";

const QuizHistory = ({ profiles }: { profiles: Profiles }) => {
  const [profile, setProfile] = useState<Profiles>(profiles);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("Profiles")
        .select("*")
        .eq("user_id", profiles.user_id)
        .single();
      if (error) {
        console.log(error);
      } else {
        setProfile(data);
      }
    };
    const fetchQuizData = async (userId: string) => {
      const { data, error } = await supabase
        .from('userquiz')
        .select(`
        user_quiz_id,
        score,
        completed_at,
        quiz:quiz_id (
          title,
          category
        )
      `)
      .eq('user_id', userId);

      if (error) {
        console.error(error);
      } else {
        const formattedData = (data as unknown as QuizData[]).map(item => ({
          id: item.user_quiz_id,
          quiz: item.quiz?.title,
          score: item.score,
          date: formatDate(item.completed_at),
        }));
        setData(formattedData);
      }
      setLoading(false);
    };

    fetchProfile().then(() => {
      if (profile?.user_id) {
        fetchQuizData(profile.user_id);
      }
    });
  }, [profiles.user_id, profile?.user_id]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
        <CardHeader>
          <CardTitle>Quiz History</CardTitle>
          <CardDescription>
            View your past quiz results and performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizHistory;
