'use client'
import React, { useEffect } from 'react';
import Hero from './hero/Hero';
import LatestQuiz from './quiz/LatestQuiz';
import PopularQuiz from './quiz/PopularQuiz';
import CreateQuiz from './quiz/CreateQuiz';
import { useProfileStore } from '@/store/profileStore';
import { User } from '@/types/User';

const HomePageClient = ({ profileInfo }: { profileInfo: User }) => {
  const { Profile, setProfile } = useProfileStore();

  useEffect(() => {
    console.log("Setting profileInfo in Zustand:", profileInfo);
    setProfile(profileInfo);
  }, [profileInfo, setProfile]);

  useEffect(() => {
    console.log("Profile in Zustand after set:", Profile);
  }, [Profile]);

  console.log("HomePageClient rendered");

  return (
    <>
      <Hero />
      <LatestQuiz />
      <PopularQuiz />
      <CreateQuiz />
    </>
  );
};

export default HomePageClient;
