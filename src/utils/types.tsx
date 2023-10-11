export type IPhysicalEvent = {
  type: "physical";
  venue: string;
  country: string;
  state: string;
};

export type IOnlineEvent = {
  type: "online";
  link: string;
};
