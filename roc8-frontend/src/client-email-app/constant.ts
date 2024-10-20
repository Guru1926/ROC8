export enum colorCodes {
  ACCENT = "#E54065",
  BACKGROUND = "#F4F9F5",
  BORDER = "#CFD2DC",
  TEXT = "#636363",
  ACTIVE_BUTTON = "#E1E4EA",
  INACTIVE = "#F2F2F2",
}

const sizes = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};

export const media = {
  mobile: `@media (max-width: ${sizes.mobile})`,
  tablet: `@media (max-width: ${sizes.tablet})`,
  desktop: `@media (max-width: ${sizes.desktop})`,
};

export enum filters {
  UNREAD = "Unread",
  READ = "Read",
  FAVORITES = "Favorites",
}

export type emailListDataType = {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
  statuses?:string[]
  formattedDate:string
  body?:string | TrustedHTML
};
