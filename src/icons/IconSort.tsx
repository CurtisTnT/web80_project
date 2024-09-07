import { FC } from "react";

interface IconAirplayProps {
  className?: string;
  topFill?: string;
  botFill?: string;
}

const IconSort: FC<IconAirplayProps> = ({
  className,
  topFill = "#888EA8",
  botFill = "#888EA8",
}) => {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        opacity="0.3"
        d="M5.33506 0L9.2274 4.5H1.44272L5.33506 0Z"
        fill={topFill}
      />
      <path
        opacity="0.3"
        d="M5.33506 12L9.2274 7.5H1.44272L5.33506 12Z"
        fill={botFill}
      />
    </svg>
  );
};

export default IconSort;
