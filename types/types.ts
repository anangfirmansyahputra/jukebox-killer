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
