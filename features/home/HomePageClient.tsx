'use client'
import React from 'react';
import Hero from './hero/Hero';
import CreateQuiz from './quiz/CreateQuiz';
import { User } from '@/types/User';
import LatestQuiz from './quiz/LatestQuiz';
import PopularQuiz from './quiz/PopularQuiz';

const HomePageClient = ({ profileInfo }: { profileInfo: User }) => {

  return (
    <>
      <Hero />
      <LatestQuiz user={profileInfo}/>
      <PopularQuiz user={profileInfo}/>
      <CreateQuiz />
    </>
  );
};

export default HomePageClient;
