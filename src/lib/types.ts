export type JobItem = {
  id: number;
  title: string;
  company: string;
  badgeLetters: string;
  daysAgo: number;
  relevanceScore: number;
};

export type JobItemExtended = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  companyURL: string;
  coverImgURL: string;
  duration: string;
  location: string;
  salary: string;
};
