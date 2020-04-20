import { IEvent } from "../types";

interface EventState {
  events: IEvent[];
  isFetchLoading: boolean;
  error: string | null;
}

type EventAction =
  | { type: "FETCH_EVENTS_BEGIN" }
  | { type: "FETCH_EVENTS_SUCCESS"; payload: { events: IEvent[] } }
  | { type: "FETCH_EVENTS_ERROR"; error: string }
  | { type: "ADD_EVENT_START"; payload: { event: IEvent } }
  | { type: "ADD_EVENT"; payload: { event: IEvent } }
  | { type: "UPDATE_EVENT"; payload: { event: IEvent } }
  | { type: "DELETE_EVENT"; payload: { id: string } };

export default function eventReducer(state: EventState, action: EventAction) {
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
    default:
      return state;
  }
}
