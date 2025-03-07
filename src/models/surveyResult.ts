export interface SubmitResult {
  userId: number;
  surveyId: number;
  answers: AnswerData[];
}

interface AnswerData {
  questionId: number;
  optionId: number;
}
