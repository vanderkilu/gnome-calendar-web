export interface ITask {
  name?: string;
  duration?: string;
  startTime?: string;
  date?: string;
  time?: string;
  repeat?: string;
  reminders?: string;
  notes?: string;
}

export interface IEvent {
  task: ITask;
  date: string;
  id: string;
  weekRow?: number;
}

export interface IPosition {
  top: number;
  right: number;
  left: number;
  width: number;
  bottom: number;
}

export interface IWeek {
  days: number[];
  weekDays: string[];
}

export interface ICell {
  day: number;
  passed: boolean;
  dateStr: string;
  events: IEvent[];
}
