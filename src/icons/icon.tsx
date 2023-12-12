import React from "react";
import Icons from "./icon-path.json";

type IconProps = { className?: string };

const _Icon = (
  symbol: keyof typeof Icons,
  { className }: IconProps = {},
  width = 512,
) => (
  <svg
    className={className ? className + " icon" : "icon"}
    viewBox={`0 0 ${width} 512`}
  >
    <path fill="currentColor" d={Icons[symbol]} />
  </svg>
);

export const IconSearch: React.FC<IconProps> = (props?: IconProps) =>
  _Icon("SEARCH", props, 512);
export const IconSpinner: React.FC<IconProps> = (props?: IconProps) =>
  _Icon("SPINNER", props);
