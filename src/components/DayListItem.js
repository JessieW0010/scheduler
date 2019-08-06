import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

// Takes four props: name (string), spots (number), selected (bool), setDay (func which accepts names of the day)
export default function DayListItem(props) {
  const DayListItemClass = classnames("day-list__item", {
    "day-list__item--Selected": props.selected,
    "day-list__item--Full": props.spots === 0
  });

  let spotsRemaining = "";
  if (props.spots > 1) {
    spotsRemaining = `${props.spots} spots remaining`
  } else if (props.spots === 1) {
    spotsRemaining = `1 spot remaining`
  } else if (props.spots < 1) {
    spotsRemaining = `no spots remaining`
  }

  return (
    <li
      name={props.name}
      className={DayListItemClass}
      spots={props.spots}
      onClick={() => props.setDay(props.name)}
    >
      <h1>{props.name}</h1>
      <p>{spotsRemaining}</p>
    </li>
  );
}