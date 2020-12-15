import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from 'components/Appointment/Error';

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"; 
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"; 
  const ERROR_DELETE = "ERROR_DELETE"; 

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true))
  }

  function onDelete() {
    transition(DELETING)
    props
      .cancelInterview(props.id)
      .then(() =>  transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }


  return (
    
    <article className="appointment">
     <Header time={props.time} />
     {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
     {mode === SHOW && (
       <Show
         student={props.interview.student}
         interviewer={props.interview.interviewer}
         onDelete={()=>transition(CONFIRM)}
         onEdit={() => transition(EDIT)}
       />
     )}

     {mode === CREATE && (
     <Form 
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
     />
     )}
     {mode === EDIT && 
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={()=> transition(SHOW)}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      } 
    {
      mode === DELETING && <Status message={DELETING} />
    }
    {mode === CONFIRM && <Confirm onConfirm={onDelete} onCancel={back}/>}
    {
      mode === SAVING && <Status message={SAVING} />
    }
    {mode === ERROR_SAVE && 
        <Error
        onClose={back}
        message={"Could not save your appointment"}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
        onClose={back}
        message={"Could not delete your appointment"}
        />
      }
    </article>

  );

}