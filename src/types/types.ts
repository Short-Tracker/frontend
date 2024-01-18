export type TUser = {
  id: number;
  username: string;
  telegram_nickname: string;
  email: string;
  first_name: string;
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
