import React from "react";
import InterviewerListItem from "./InterviewerListItem"

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{InterviewerListItem}</h4>
      <ul className="interviewers__list">
      {props.interviewers.map((interviewer) => {
        return (
          <InterviewerListItem 
            name={interviewer.name}
            avatar={interviewer.avatar} 
            selected={interviewer.id === props.interviewer}
            />
            )
          })}
          </ul>
    </section>
  );
}