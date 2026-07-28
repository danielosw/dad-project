export type Answer = {
    ga: string;
    questionNumber: number;
    topic: string;
    answered: string;
    questionDetails: {
        questionText: string;
        answerA: string;
        answerB: string;
        answerC: string;
        answerD: string;
        correctAnswer: string;
        reasoning: string;
    } | null;
};

export type Quiz = {
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    answers: Answer[];
};
