import React, { Fragment } from "react";

import "components/Appointment/styles.scss"
import Show from "./Show.js";
import Header from "./Header.js";
import Empty from "./Empty.js";


export default function Appointment(props){

return (
  <article className="appointment">
  <Header time={props.time}></Header>
  {props.interview ? <Show student={props.student} interviewer={props.interviewer}></Show>: <Empty></Empty>}
  </article>
) 

}