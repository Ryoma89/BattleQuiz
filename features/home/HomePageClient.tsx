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
    setProfile(profileInfo);
  }, [profileInfo, setProfile]);


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
