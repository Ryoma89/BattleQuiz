-- Quizテーブルの作成
CREATE TABLE Quiz (
    quiz_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(255),
    created_by UUID REFERENCES "Profiles"(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questionテーブルの作成
CREATE TABLE Question (
    question_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES Quiz(quiz_id),
    question_text TEXT NOT NULL,
    question_type VARCHAR(50),
    time_limit INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AnswerOptionテーブルの作成
CREATE TABLE AnswerOption (
    option_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES Question(question_id),
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- UserQuizテーブルの作成
CREATE TABLE UserQuiz (
    user_quiz_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "Profiles"(user_id),
    quiz_id UUID REFERENCES Quiz(quiz_id),
    score INT,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- UserAnswerテーブルの作成
CREATE TABLE UserAnswer (
    user_answer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_quiz_id UUID REFERENCES UserQuiz(user_quiz_id),
    question_id UUID REFERENCES Question(question_id),
    selected_option_id UUID REFERENCES AnswerOption(option_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--useranswerテーブルの作成
-- user_answer_id,user_quiz_id,question_id,selected_option_id