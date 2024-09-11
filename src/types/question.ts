interface QuestionBox {
  id: string;
  question: string;
  options: string[];
  answer: string;
  point: number;
  explanation: null | string;
  category: string;
  image: null | string;
}

export type { QuestionBox as QuestionBoxType };
