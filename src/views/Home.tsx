import React, { useState } from "react";
import TaskForm, { ITask } from "../components/TaskForm";
import CalendarContainer from "../components/CalendarContainer";

interface IEvent {
  task: ITask;
  date: string;
}

interface IPosition {
  top: number;
  right: number;
  left: number;
  width: number;
}

const HomePage: React.FC<{}> = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isFormVisible, toggleFormVisible] = useState(false);
  const toggleFormShow = () => toggleFormVisible(visible => !visible);
  const handleOnClick = (date: string, position?: IPosition) => {
    toggleFormShow();
    setSelectedDate(date);
  };
  const handleOnSave = (task: ITask) => {
    const event: IEvent = {
      task: task,
      date: selectedDate
    };
    console.log(event);
    setEvents([...events, event]);
    toggleFormShow();
  };

  return (
    <>
      <CalendarContainer onClick={handleOnClick} events={events} />
      <TaskForm
        isVisible={isFormVisible}
        onClose={toggleFormShow}
        onSave={handleOnSave}
      />
    </>
  );
};

export default HomePage;
