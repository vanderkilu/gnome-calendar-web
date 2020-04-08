import React, { useState } from "react";
import TaskForm, { ITask } from "../components/TaskForm";
import Calendar from "../components/Calendar";

interface IEvent {
  task: ITask;
  date: string;
}

const HomePage: React.FC<{}> = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [day, setDay] = useState(0);
  const [isFormVisible, toggleFormVisible] = useState(false);
  const toggleFormShow = () => toggleFormVisible(visible => !visible);
  const handleOnClick = (day: number) => {
    toggleFormShow();
    setDay(day);
  };
  const addTask = () => null;

  return (
    <>
      <Calendar onClick={handleOnClick} />
      <TaskForm
        isVisible={isFormVisible}
        onClose={toggleFormShow}
        onSave={addTask}
      />
    </>
  );
};

export default HomePage;
