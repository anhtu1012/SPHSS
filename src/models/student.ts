export interface User {
  id: string;
  userCode: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  roleCode: string;
}

export interface Category {
  categoryId: string;
  name: string;
  description: string;
}

export interface BlogData {
  id: string;
  contentHtml: string;
  contentMarkdown: string;
  imgageUrl: string;
  title: string;
  hashtag: string[];
  description: string;
  user_id: string;
  category_id: string;
  createdAt: string;
  user: User;
  category: Category;
}

export interface UpdateUser {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  image: string;
  email: string;
}

export interface Survey {
  surveyId: string;
  title: string;
  description: string;
  categoryId: string;
}

export interface QuestionAndAnswer {
  questionId: string;
  questionText: string;
  options: Options[];
}

interface Options {
  optionId: string;
  value: number;
  optionText: string;
}

export interface UserProgram {
  userId: number;
  programIds: number[];
}
