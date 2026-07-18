import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaShippingFast } from "react-icons/fa";
import { useRouter } from "next/router";
import moment from "moment-timezone";

const FedexContainer = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  height: 100px;
  position: fixed;
  top: 60%;
  left: -270px;
  width: 320px;
  transition: all 1s ease;
  z-index: 2;
  & .left-content {
    background: var(--surface);
  }
  @media only screen and (max-width: 1280px) {
    display: none;
  }
  div.right-content {
    background: ${(props) => props.theme.palette.bg.primary};
  }
  &:hover {
    left: 0px;
    div.right-content {
      background: ${(props) => props.theme.palette.bg.primary};
      transform: scale(1.1);
    }
    div.left-content {
      background: var(--surface);
    }
  }
`;

const FedexRightContent = styled.div`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50px;
  font-size: 14px;
  & * {
    margin: 5px 0px;
  }
`;

const FedexLeftContent = styled.div`
  color: ${(props) => props.theme.palette.bg.primary};
  height: 100%;
  padding: 5px 15px;
  width: 270px;
  & .time-value {
    font-size: 15px;
    padding-bottom: 1px;
  }
  & .message {
    font-size: 12px;
    padding-bottom: 2px;
  }
  & div {
    font-size: 12px;
  }
`;

const SmallSpan = styled.span`
  font-size: 10px;
`;

function formatTime(value = 0, max = 2) {
  value = String(value);
  return value.length < max ? "0" + value : value;
}

const TimeValue = ({ diffHours, diffMinutes, diffSeconds, message }) => {
  return (
    <div className={"time-value"}>
      {!message ? (
        <>
          {formatTime(diffHours)}
          <SmallSpan>&nbsp;hh</SmallSpan> &nbsp;
          {formatTime(diffMinutes)}
          <SmallSpan>&nbsp;mm</SmallSpan> &nbsp;
          {formatTime(diffSeconds)}
          <SmallSpan>&nbsp;ss</SmallSpan> &nbsp;
        </>
      ) : (
        <div className={"message"}>{message}</div>
      )}
    </div>
  );
};

const OnlyTimeValue = ({ diffHours, diffMinutes, diffSeconds, message }) => {
  return (
    <div className={"time-value"}>
      {!message ? (
        <>
          {formatTime(diffHours)}
          <SmallSpan>:</SmallSpan>
          {formatTime(diffMinutes)}
          <SmallSpan>:</SmallSpan>
          {formatTime(diffSeconds)}
        </>
      ) : (
        <div className={"message"}>{message}</div>
      )}
    </div>
  );
};

const FedExGroundAvailableWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const FedExExpressAvailableWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DeliveryStartTimeHour = 0;
const FedExGroundCutOffHour = 17;
const FedExExpressCutOffHour = 16;
const FedExExpressSaturdayCutOffHour = 16;
const TimeZone = "America/New_York";

const Fedex = ({ exportOnlyFexEx }) => {
  const initialState = { showTimer: null };
  const [fedExGroundTimer, setFedExGroundTimer] = useState({ ...initialState });
  const [fedExExpressTimer, setFedExExpressTimer] = useState({ ...initialState });
  const router = useRouter();
  const valRef = useRef();
  const currentTimeForDebug = useRef();

  useEffect(() => {
    if (router.query.___time) {
      currentTimeForDebug.current = moment(router.query.___time);
    }
  }, [router]);

  const getCurrentTime = () => {
    return (currentTimeForDebug.current || moment()).tz(TimeZone);
  };

  const getWeekDay = () => {
    return getCurrentTime().format("dddd");
  };

  const isWorkingDay = (weekDays, excludeLastWorkingDay) => {
    const weekDay = getWeekDay();
    let isWorkingDay = weekDays.includes(weekDay);
    if (excludeLastWorkingDay && weekDays[weekDays.length - 1] === weekDay) {
      isWorkingDay = false;
    }
    return isWorkingDay;
  };

  const getEndHourDateObj = ({ endHour }) => {
    return moment.tz(`${getCurrentTime().format("DD-MM-YYYY")} ${endHour}`, "DD-MM-YYYY h", TimeZone);
  };

  const isWorkingHours = (startHour, endHour) => {
    const startHourDateObj = moment.tz(
      `${getCurrentTime().format("DD-MM-YYYY")} ${startHour}`,
      "DD-MM-YYYY h",
      TimeZone
    );
    const endHourDateObj = getEndHourDateObj({ endHour });
    return getCurrentTime().isBetween(startHourDateObj, endHourDateObj);
  };

  const setTimerValue = ({ availableWeekDays, startHour, endHour, initialState, setState, saturdayCutOff }) => {
    let showTimer = initialState.showTimer;
    if (initialState.showTimer === null) {
      if (saturdayCutOff && getWeekDay() === "Saturday") {
        endHour = saturdayCutOff;
      }
      showTimer = isWorkingDay(availableWeekDays) && isWorkingHours(startHour, endHour);
    }
    if (showTimer) {
      const endHourDateObj = getEndHourDateObj({ endHour });
      let totalSeconds = endHourDateObj.diff(getCurrentTime(), "seconds");
      if (Math.max(totalSeconds, 0) === 0) {
        return resetStates();
      }
      let diffSeconds = totalSeconds % 60;
      let diffMinutes = Math.floor((totalSeconds / 60) % 60);
      let diffHours = endHourDateObj.diff(getCurrentTime(), "hours");
      setState({ showTimer, diffSeconds, diffMinutes, diffHours });
    } else {
      let message = "";
      if (!isWorkingDay(availableWeekDays, true)) {
        message = "All further order will be ship on Monday.";
      } else {
        message = "All further orders will be ship on tomorrow.";
      }
      setState({ showTimer, message });
    }
  };

  const updateCurrentTime = () => {
    if (currentTimeForDebug.current) {
      currentTimeForDebug.current.add(1, "seconds");
    }
  };

  const resetStates = () => {
    setFedExExpressTimer({ ...initialState });
    setFedExGroundTimer({ ...initialState });
  };

  useEffect(() => {
    valRef.current = setval(() => {
      updateCurrentTime();
      setTimerValue({
        initialState: fedExGroundTimer,
        setState: setFedExGroundTimer,
        availableWeekDays: FedExGroundAvailableWeekDays,
        startHour: DeliveryStartTimeHour,
        endHour: FedExGroundCutOffHour,
      });
      setTimerValue({
        initialState: fedExExpressTimer,
        setState: setFedExExpressTimer,
        availableWeekDays: FedExExpressAvailableWeekDays,
        startHour: DeliveryStartTimeHour,
        endHour: FedExExpressCutOffHour,
        saturdayCutOff: FedExExpressSaturdayCutOffHour,
      });
    }, 1000);
    return () => clearval(valRef.current);
  }, []);

  if (exportOnlyFexEx) {
    return (
      <>
        <OnlyTimeValue {...fedExGroundTimer} />
      </>
    );
  }

  return (
    <FedexContainer>
      <FedexLeftContent className="left-content">
        <div
          style={{
            width: "100%",
            height: "50%",
            borderBottom: `1px solid ${(props) => props.theme.palette.bg.primary}`,
          }}
        >
          <div className="timeDetails">
            <TimeValue {...fedExGroundTimer} />
          </div>
          <div style={{ fontWeight: "bold" }}>FedEx Ground Shipping Cutoff</div>
        </div>
        <div
          style={{
            width: "100%",
            height: "50%",
            paddingTop: "6px",
          }}
        >
          <TimeValue {...fedExExpressTimer} />
          <div style={{ fontWeight: "bold" }}>UPS Ground Cutoff</div>
        </div>
      </FedexLeftContent>
      <FedexRightContent className="right-content">
        <FaShippingFast
          style={{
            color: "#fff",
            fontSize: 24,
          }}
        />
        <div
          style={{
            whiteSpace: "pre-wrap",
            color: "#fff",
          }}
        >{`Cutoff\nTime`}</div>
      </FedexRightContent>
    </FedexContainer>
  );
};

export default Fedex;
