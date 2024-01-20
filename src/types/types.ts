export type TUser = {
  id: number;
  full_name: string;
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
