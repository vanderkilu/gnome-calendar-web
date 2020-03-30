import React from "react";
import styled from "styled-components";
import moment from "moment";

interface CalendarProps {}

const StyledCalendar = styled.div`
  padding: 5rem;
`;
const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #f3f4f9;
  justify-items: center;
  padding: 2rem;
`;
const Day = styled.div`
  font-size: 1.5rem;
  color: #b8bac3;
`;
const CellContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const Cell = styled.div`
  height: 10rem;
  position: relative;
  border: 1px solid #f3f4f9;
`;
const CellText = styled.p<{ passed: boolean }>`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.7rem;
  color: ${props => (props.passed ? "#b71c1c" : "#b8bac3")};
`;
const StyledMonthPicker = styled.div`
  position: relative;
  width: 15rem;
  height: 3rem;
  border-radius: 5px;
  border: 1px solid #b8bac3;
  font-size: 1.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
`;
const ControlLeft = styled.span`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  font-size: 2rem;
  transform: translateY(-50%);
  padding: 2rem 0;
  cursor: pointer;
`;
const ControlRight = styled.span`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  font-size: 2rem;
  transform: translateY(-50%);
  padding: 2rem 0;
  cursor: pointer;
`;

interface MonthPickerProps {
  month: string;
  setNextMonth: () => void;
  setPrevMonth: () => void;
}
const MonthPicker: React.FC<MonthPickerProps> = ({
  month,
  setNextMonth,
  setPrevMonth
}) => {
  return (
    <>
      <StyledMonthPicker>
        <ControlLeft onClick={() => setPrevMonth()}>&larr;</ControlLeft>
        {month}
        <ControlRight onClick={() => setNextMonth()}>&rarr;</ControlRight>
      </StyledMonthPicker>
    </>
  );
};

const CalendarHeader: React.FC<{}> = () => {
  const weekDays = moment.weekdaysShort();
  return (
    <>
      <Header>
        {weekDays.map(day => (
          <Day key={day}>{day}</Day>
        ))}
      </Header>
    </>
  );
};

interface ICell {
  day: number;
  passed: boolean;
}

interface CalendarCellProps {
  days: Array<ICell>;
  onClick?: () => void;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ days }) => {
  return (
    <>
      <CellContainer>
        {days.map(({ day, passed }) => (
          <Cell key={day}>
            <CellText passed={passed}>{day}</CellText>
          </Cell>
        ))}
      </CellContainer>
    </>
  );
};

const Calendar: React.FC<CalendarProps> = () => {
  const [date, setDate] = React.useState(moment());
  const firstDayOfMonth = (): number => {
    const day = moment(date)
      .startOf("month")
      .format("d");
    return parseInt(day);
  };
  const daysInMonth = (): number[] => {
    const daysCount = moment(date).daysInMonth();
    return Array.from(Array(daysCount).keys());
  };
  const formattedDays = daysInMonth().map(day => {
    return {
      day: day + 1,
      passed: day + 1 < firstDayOfMonth()
    };
  });

  const months = moment.months();
  const [index, setIndex] = React.useState(moment(date).month());
  const setNextMonth = () => {
    if (index < months.length - 1) {
      setIndex(index + 1);
      setDate(moment(date).set("month", index));
    } else {
      setIndex(months.length - 1);
      setDate(moment(date).set("month", index));
    }
  };
  const setPrevMonth = () => {
    if (index > 0) {
      setIndex(index - 1);
      setDate(moment(date).set("month", index));
    } else {
      setIndex(0);
      setDate(moment(date).set("month", index));
    }
  };

  return (
    <StyledCalendar>
      <MonthPicker
        month={months[index]}
        setPrevMonth={setPrevMonth}
        setNextMonth={setNextMonth}
      />
      <CalendarHeader />
      <CalendarCell days={formattedDays} />
    </StyledCalendar>
  );
};

export default Calendar;
