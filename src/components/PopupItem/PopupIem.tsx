import React, { FC, memo } from "react";
import cl from "./PopupItem.module.scss";
import { TypePopupDate } from "../Popup/Popup";



interface IPopupItem {
  value: string;
  k: keyof TypePopupDate;
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    k: keyof TypePopupDate,

  ) => void;
}

const formatDate = (isoDate:string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}
const PopupIem: FC<IPopupItem> = ({ changeHandler, k, value }) => {
  return (
    <div className={cl.block}>
      <p>{k}</p>
      <input
        onChange={(e) => {
          changeHandler(e, k);
        }}
        value={k.endsWith("Date") ? formatDate(value) : value}
        type= {k.endsWith("Date") ? "date" : "text"}
      />
    </div>
  );
};

export default memo(PopupIem);
