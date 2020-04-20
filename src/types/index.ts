export interface ITask {
  name: string;
  duration?: string;
  startTime?: string;
}

export interface IEvent {
  task: ITask;
  date: string;
  id: string;
}

export interface IPosition {
  top: number;
  right: number;
  left: number;
  width: number;
  bottom: number;
}
