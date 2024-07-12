import React from 'react';
import Hero from './hero/Hero';
import LatestQuiz from './quiz/LatestQuiz';
import PopularQuiz from './quiz/PopularQuiz';
import CreateQuiz from './quiz/CreateQuiz';
const HomePageClient = () => {

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
