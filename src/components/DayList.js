import React from "react";
import DayListItem from "components/DayListItem";
// import className from "className";

// Takes four props: name (string), spots (number), selected (bool), setDay (func which accepts names of the day)
export default function DayList(props) {
  let ListItems = props.days.map((day) => 
  <DayListItem 
    selected={day.name === props.day} 
    setDay={props.setDay} 
    key={day.id} 
    name={day.name} 
    spots={day.spots}/>)
  return (<ul>{ListItems}</ul>);
}