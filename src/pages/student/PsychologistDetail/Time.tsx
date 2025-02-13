const Time = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  return (
    <div className="doctor__detail__section1__schedule__option">
      {startTime}-{endTime}
    </div>
  );
};

export default Time;
