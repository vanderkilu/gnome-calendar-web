import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import nextIcon from "../assets/next.svg";
import backIcon from "../assets/back.svg";

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

const StyledPickerIcon = styled.img`
  width: 1rem;
  height: 1rem;
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
  const getCurrentYear = () => moment(date).format("Y");

  const year = parseInt(getCurrentYear());

  const setNextYear = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setDate("year", year + 1);
  };

  const setPrevYear = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setDate("year", year - 1);
  };

  const value = type === "month" ? months[index] : year;
  return (
    <>
      <StyledPicker>
        <ControlLeft
          onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
            type === "month" ? setPrevMonth(e) : setPrevYear(e)
          }
          role="button"
        >
          <StyledPickerIcon src={backIcon} alt="back arrow icon" />
        </ControlLeft>
        {value}
        <ControlRight
          onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
            type === "month" ? setNextMonth(e) : setNextYear(e)
          }
          role="button"
        >
          <StyledPickerIcon src={nextIcon} alt="next arrow icon" />
        </ControlRight>
      </StyledPicker>
    </>
  );
};

export default Picker;
