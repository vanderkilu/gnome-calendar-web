import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";

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

export const StyledPickerGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledPickerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type PickerType = moment.unitOfTime.All;

interface PickerProps {
  setDate: (type: PickerType, index: number) => void;
  date: string | moment.Moment;
  type: PickerType;
}

const Picker: React.FC<PickerProps> = ({ setDate, date, type }) => {
  const [isVisible, setVisible] = useState(false);
  const months = moment.months();
  let [index, setIndex] = useState(moment(date).month());
  const setNextMonth = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (index < months.length - 1) {
      setIndex(index + 1);
      setDate("month", index + 1);
    } else {
      setIndex(months.length - 1);
      setDate("month", index);
    }
  };
  const setPrevMonth = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (index > 0) {
      setIndex(index - 1);
      setDate("month", index - 1);
    } else {
      setIndex(0);
      setDate("month", index);
    }
  };
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
      setDate("year", index + 1);
    } else {
      setYear(parseInt(nextTen));
      setDate("year", parseInt(nextTen));
    }
  };

  const setPrevYear = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    const currentYear = parseInt(getCurrentYear());
    if (year > currentYear) {
      setYear(year - 1);
      setDate("year", year - 1);
    } else {
      setYear(year);
      setDate("year", year);
    }
  };

  const valueList = type === "month" ? months : nextYears;
  const value = type === "month" ? months[index] : year;
  return (
    <>
      <StyledPicker onClick={() => setVisible(isVisible => !isVisible)}>
        <ControlLeft
          onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
            type === "month" ? setPrevMonth(e) : setPrevYear(e)
          }
          role="button"
        >
          &larr;
        </ControlLeft>
        {value}
        <ControlRight
          onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
            type === "month" ? setNextMonth(e) : setNextYear(e)
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

export default Picker;
