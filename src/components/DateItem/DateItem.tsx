import React, { FC, memo } from "react";
import { IDate } from "../../models/IDate";
import cl from "./DateItem.module.scss";

import Datebuttons from "../DateButtons/Datebuttons";

interface IDateItem {
  date: IDate;
  changeFunction : (date:IDate) => void
}

const DateItem: FC<IDateItem> = ({ date, changeFunction }) => {


  return (
    <>
    <div className={cl.container}>
      {Object.keys(date).map((e, i) => {
        return (
          <div className={cl.blockWrapper} key={i}>
            {e !== "id" && (
              <div className={cl.block}>
                <p>{e}</p>
                <p> {  e.endsWith("Date") ?  (new Date(date[e as keyof IDate])).toDateString() : date[e as keyof IDate] }</p>
              </div>
            )}
          </div>
        );
      })}

    </div>
      <Datebuttons changeFunction = {changeFunction} date={date} />
    </>
  )
};

export default memo(DateItem);
