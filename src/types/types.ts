// USER ==>
export type TUser = {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  telegram_nickname: string;
  email: string;
  is_team_lead: boolean;
};
export type TuserDataTemp = {
  username: string;
  email: string;
  password: string;
  is_team_lead: boolean;
};

// Надо узнать почему с Бэка приходят разные юзеры
export type TUser2 = {
  email: string;
  first_name: string;
  is_team_lead: boolean;
  last_name: string;
  telegram_nickname: string;
  username: string | null;
  id: number;
};

export type Tusers = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TUser2[];
};
// USER <==
export type TSystemState = {
  isLoggedIn: boolean;
  isLoading: boolean;
};
// типы для Task
export type TTask = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TResults[];
};
export type TResults = {
  id: number;
  description: string;
  status: string;
  create_date: string;
  inprogress_date: string;
  done_date: string;
  deadline_date: string;
  archive_date: string;
  link: string;
  creator: TCreator;
  performers: TPerformers[];
  is_expired: string;
  resolved_status: string;
};
export type TCreator = {
  id: number;
  full_name: string;
  telegram_nickname: string;
  email: string;
  is_team_lead: boolean | null;
};
export type TPerformers = {
  id: number;
  full_name: string;
  telegram_nickname: string;
  email: string;
  is_team_lead: boolean | null;
};
// конец типов Task

export type TCreateTask = {
  description: string;
  status: string;
  deadline_date: string;
  link: string;
  performers: number[];
};

export enum TaskStatus {
  TO_DO = 'to do',
  IN_PROGRESS = 'in progress',
  HOLD = 'hold',
  DONE = 'done',
  ARCHIVED = 'archived',
}
