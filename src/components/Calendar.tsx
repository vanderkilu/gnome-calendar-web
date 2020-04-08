import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
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
const Cell = styled.div<{ isToday: boolean }>`
  height: 10rem;
  position: relative;
  background-color: ${props => (props.isToday ? "#e8f5e9" : "transparent")};
  border: 1px solid #f3f4f9;
`;
const CellText = styled.p`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.7rem;
  color: "#b8bac3";
`;
const StyledPicker = styled.div`
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
  &:not(:last-child) {
    margin-right: 1rem;
  }
  cursor: pointer;
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
const StyledPickerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const H3 = styled.h3`
  font-size: 1.5rem;
  text-transform: capitalize;
  font-weight: bold;
  color: #212121;
`;
const StyledPickerGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledDropdown = styled.div`
  position: absolute;
  top: 3.2rem;
  left: auto;
  width: 100%;
  height: 10rem;
  overflow-y: scroll;
  background-color: #fafafa;
  display: grid;
  grid-template-columns: 1fr;
  padding: 2rem;
  grid-gap: 2rem;
  z-index: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const StyledDropdownItem = styled.button`
  font: inherit;
  border-radius: 3px;
  text-align: center;
  height: 3rem;
  background-color: #ffffff;
  border: none;
  border: 1px dashed #bdbdbd;
  color: #b8bac3;
  cursor: pointer;
`;

interface PickerProps<T> {
  valueList: T[];
  value: string | number;
  setNext: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  setPrev: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const Picker: React.FC<PickerProps<string | number>> = ({
  value,
  setNext,
  setPrev,
  valueList
}) => {
  const [isVisible, setVisible] = useState(false);
  return (
    <>
      <StyledPicker onClick={() => setVisible(isVisible => !isVisible)}>
        <ControlLeft
          onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
            setPrev(e)
          }
          role="button"
        >
          &larr;
        </ControlLeft>
        {value}
        <ControlRight
          onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
            setNext(e)
          }
          role="button"
        >
          &rarr;
        </ControlRight>
        {isVisible && (
          <StyledDropdown>
            {valueList.map(value => (
              <StyledDropdownItem>{value}</StyledDropdownItem>
            ))}
          </StyledDropdown>
        )}
      </StyledPicker>
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
  today: number;
  onClick: (day: number) => void;
}

const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const CalendarCell: React.FC<CalendarCellProps> = ({
  days,
  today,
  onClick
}) => {
  const handleClick = (passed: boolean) => {
    if (passed) return null;
    onClick(today);
  };
  return (
    <>
      <CellContainer>
        {days.map(({ day, passed }) => (
          <Cell
            key={ID()}
            isToday={day === today}
            onClick={() => handleClick(passed)}
          >
            {!passed && <CellText>{day}</CellText>}
          </Cell>
        ))}
      </CellContainer>
    </>
  );
};

interface CalendarProps {
  onClick: (day: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onClick }) => {
  let [date, setDate] = useState(moment());
  const firstDayOfMonth = (): number => {
    const day = moment(date)
      .startOf("month")
      .format("d");
    return parseInt(day);
  };
  const daysInMonth = (): number[] => {
    const daysCount = moment(date).daysInMonth();
    return Array.from(Array(daysCount), (_, i) => i + 1);
  };
  const dayStart = firstDayOfMonth();
  const days = [...Array<number>(dayStart).fill(0), ...daysInMonth()];
  const formattedDays = days.map(day => {
    return {
      day: day,
      passed: day === 0
    };
  });

  const months = moment.months();
  let [index, setIndex] = useState(moment(date).month());
  const setNextMonth = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (index < months.length - 1) {
      setIndex(index + 1);
      setDate(date => moment(date).set("month", index + 1));
    } else {
      setIndex(months.length - 1);
      setDate(moment(date).set("month", index));
    }
  };
  const setPrevMonth = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (index > 0) {
      setIndex(index - 1);
      setDate(date => moment(date).set("month", index - 1));
    } else {
      setIndex(0);
      setDate(moment(date).set("month", index));
    }
  };
  const todayDate = parseInt(date.format("D"));

  const getCurrentYear = () => moment().format("Y");

  const yearRange = (start: string, end: string) => {
    let startDate = moment(start);
    const endDate = moment(end);
    let nextYears: string[] = [];
    while (startDate < endDate) {
      nextYears = [
        ...nextYears,
        moment(startDate)
          .format("YYYY")
          .toString()
      ];
      startDate = moment(startDate).add("year", 1);
    }
    return nextYears;
  };
  const nextTen = moment()
    .set("year", parseInt(getCurrentYear()))
    .add("year", 12)
    .format("Y");

  const nextYears = yearRange(getCurrentYear(), nextTen);
  const [year, setYear] = useState(parseInt(getCurrentYear()));

  const setNextYear = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (year < parseInt(nextTen)) {
      setYear(year + 1);
      setDate(moment(date).set("year", year + 1));
    } else {
      setYear(parseInt(nextTen));
      setDate(moment(date).set("year", parseInt(nextTen)));
    }
  };

  const setPrevYear = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    const currentYear = parseInt(getCurrentYear());
    if (year > currentYear) {
      setYear(year - 1);
      setDate(moment(date).set("year", year - 1));
    } else {
      setYear(year);
      setDate(moment(date).set("year", year));
    }
  };

  return (
    <StyledCalendar>
      <StyledPickerWrapper>
        <H3>task calendar</H3>
        <StyledPickerGroup>
          <Picker
            valueList={months}
            value={months[index]}
            setPrev={setPrevMonth}
            setNext={setNextMonth}
          />
          <Picker
            value={year}
            setPrev={setPrevYear}
            setNext={setNextYear}
            valueList={nextYears}
          />
        </StyledPickerGroup>
      </StyledPickerWrapper>
      <CalendarHeader />
      <CalendarCell days={formattedDays} today={todayDate} onClick={onClick} />
    </StyledCalendar>
  );
};

export default Calendar;
