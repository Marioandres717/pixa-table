import { Fragment } from "react";
import { Theme } from "../features";

function getRandomWidth(min = 50, max = 95) {
  const randomWidth = Math.random() * (max - min) + min;
  return `${randomWidth}%`;
}

const widths = Array.from({ length: 7 }).map(() => ({
  width1: getRandomWidth(),
  width2: getRandomWidth(),
  width3: getRandomWidth(),
}));

export function TableSkeleton({ theme }: { theme: Theme }) {
  return (
    <div
      data-theme={theme}
      className="pixa-table mx-auto w-full overflow-hidden p-2"
    >
      <div className="flex animate-pulse flex-col gap-4">
        {/* TOP ROW */}
        <div className="flex justify-between">
          <div className="h-6 w-28 rounded-full bg-black-95" />
          <div className="flex gap-2">
            <div className="h-6 w-6 rounded-full bg-black-95" />
            <div className="h-6 w-6 rounded-full bg-black-95" />
            <div className="h-6 w-8 rounded-full bg-black-95" />
          </div>
        </div>

        {/* HEADER ROW */}
        <div className="grid grid-cols-[1fr,2fr,1fr] gap-4">
          <div className="ml-9 flex items-center gap-6">
            <div className="h-5 w-5 flex-shrink-0 rounded-full bg-black-95" />
            <div className="h-3 w-1/6 rounded-full bg-black-95" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 w-4 rounded-full bg-black-95" />
            <div className="h-3 w-1/12 rounded-full bg-black-95" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 w-4 rounded-full bg-black-95" />
            <div className="h-3 w-4/6 rounded-full bg-black-95" />
            <div className="ml-auto h-3 w-4 rounded-full bg-black-95" />
          </div>

          {/* REGULAR ROWS */}
          {widths.map(({ width1, width2, width3 }, i) => (
            <Fragment key={i}>
              <div className="ml-1 flex items-center gap-3">
                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-black-95" />
                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-black-95" />
                <div
                  className="ml-3 h-5 rounded-full bg-black-95"
                  style={{ width: width1 }}
                />
              </div>
              <div
                className="ml-7 h-5 rounded-full bg-black-95"
                style={{ width: width2 }}
              />
              <div
                className="ml-7 h-5 rounded-full bg-black-95"
                style={{ width: width3 }}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
