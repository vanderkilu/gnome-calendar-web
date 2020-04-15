import React, { useState } from "react";
import TaskForm, { ITask } from "../components/TaskForm";
import CalendarContainer from "../components/CalendarContainer";
import moment from "moment";

interface IEvent {
  task: ITask;
  date: string;
}

const HomePage: React.FC<{}> = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isFormVisible, toggleFormVisible] = useState(false);
  const toggleFormShow = () => toggleFormVisible(visible => !visible);
  const handleOnClick = (date: string) => {
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
