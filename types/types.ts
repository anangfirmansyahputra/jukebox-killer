type Breadcrumbs = {
  register: string;
  selectSong: string;
};

type Gender = {
  male: string;
  female: string;
};

export type ChooseLanguage = {
  firstName: string;
  lastName: string;
  age: string;
  gender: Gender;
  choose: string;
  flag: string;
  breadcrumbs: Breadcrumbs;
};

export type Event = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  languange: string;
};

export type Song = {
  id: number;
  title: string;
  artist: string;
  language: "en" | "fr" | "it" | "es";
  genre: string;
  duet: boolean;
  sameSong: string;
  available: boolean;
  // createdAt: Date;
  // updatedAt: Date;
};
