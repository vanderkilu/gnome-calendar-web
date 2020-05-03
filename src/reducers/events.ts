import { IEvent } from "../types";

export interface EventState {
  events: IEvent[];
  isLoading: boolean;
  error: string | null;
}

export const EventInitialState = {
  events: [],
  isLoading: false,
  error: null
};

const transformEvents = (
  events: IEvent[],
  id: string,
  dateStr: string,
  weekRow: number
): IEvent[] => {
  console.log("weekRow", weekRow);
  const event = events.find(event => event.id === id);
  const newEvent = {
    ...event,
    ...{ date: dateStr, weekRow: weekRow }
  } as IEvent;
  return events.map(event => (event.id === id ? newEvent : event));
};

export type EventAction =
  | { type: "FETCH_EVENTS_BEGIN" }
  | { type: "FETCH_EVENTS_SUCCESS"; payload: { events: IEvent[] } }
  | { type: "FETCH_EVENTS_ERROR"; error: string }
  | { type: "ADD_EVENT_START"; payload: { event: IEvent } }
  | { type: "ADD_EVENT"; payload: { event: IEvent } }
  | { type: "UPDATE_EVENT"; payload: { event: IEvent } }
  | { type: "DELETE_EVENT"; payload: { id: string } }
  | {
      type: "SWAP_EVENT";
      payload: { id: string; dateStr: string; weekRow: number };
    };

export function EventReducer(
  state: EventState = EventInitialState,
  action: EventAction
): EventState {
  switch (action.type) {
    case "FETCH_EVENTS_BEGIN":
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case "FETCH_EVENTS_SUCCESS":
      return {
        ...state,
        error: null,
        isLoading: false,
        events: action.payload.events
      };
    case "FETCH_EVENTS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case "ADD_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload.event]
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload.id)
      };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.event.id ? action.payload.event : event
        )
      };
    case "SWAP_EVENT":
      return {
        ...state,
        events: transformEvents(
          state.events,
          action.payload.id,
          action.payload.dateStr,
          action.payload.weekRow
        )
      };
    default:
      return state;
  }
}
