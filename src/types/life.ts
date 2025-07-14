import { HOLIDAY_NAMES, LIFE_MODES } from "../constatns";

export enum EWeekType {
  Past = 'past',
  Present = 'present',
  Future = 'future',
}

export enum ESeason {
  Winter = 'winter',
  Spring = 'spring',
  Summer = 'summer',
  Autumn = 'autumn',
}

export type THolidayName = (typeof HOLIDAY_NAMES)[keyof typeof HOLIDAY_NAMES];


export type TWeekZodiac =
  | 'rat'
  | 'ox'
  | 'tiger'
  | 'rabbit'
  | 'dragon'
  | 'snake'
  | 'horse'
  | 'goat'
  | 'monkey'
  | 'rooster'
  | 'dog'
  | 'pig';

  export type TZodiacIconSet = Record<TWeekZodiac, string>;

  export type TLifeMode = (typeof LIFE_MODES)[keyof typeof LIFE_MODES];

// Type for a week entity
export interface IWeek {
  id: string;
  dateStart: string;
  dateEnd: string;
  type: EWeekType;
  month: number;
  year: number;
  dateYear: string;
  dateMonth: string;
  dateSeason: ESeason | null;
  numberOfDays: number;
  isFirst: boolean;
  isLast: boolean;
  isFirstInYear: boolean;
  isLastInYear: boolean;
  isFirstInMonth: boolean;
  isLastInMonth: boolean;
  isExpandedByYear: boolean;
  isExpandedByDateSeason: boolean;
  isExpandedByDateMonth: boolean;
  isPartialByYear: boolean;
  isPartialByDateSeason: boolean;
  isPartialByDateMonth: boolean;
  isLeapYear: boolean;
  holidays: THolidayName[] | null;
  yearZodiacLabel: TWeekZodiac | null;
  photoUrl?: string;
  photoLocal?: string;
}