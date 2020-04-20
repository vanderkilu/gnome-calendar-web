import React, { useReducer, useContext } from "react";
import {
  EventAction,
  EventState,
  EventInitialState,
  EventReducer
} from "../reducers/events";

type ContextProps = {
  state: EventState;
  dispatch: React.Dispatch<EventAction>;
};

const EventContext = React.createContext<ContextProps>({
  state: EventInitialState,
  dispatch: () => EventInitialState
});

export const EventProvider = (props: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(EventReducer, EventInitialState);
  return (
    <EventContext.Provider
      value={{ state, dispatch }}
      {...props}
    ></EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents should be called within Event Provider");
  }
  return context;
};
