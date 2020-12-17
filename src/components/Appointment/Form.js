import React, {useState} from "react";

import "components/Appointment/styles.scss";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function validate() {
    console.log("name", name)
    if(name === "") {
      setError("student name cannot be blank");
      return false;
    }

    return true
  }

  const handleReset = () => { 
    setName("")
    setInterviewer(null)
    props.onCancel()
  }
  const saveInfo = ()=> {
  if(validate()) {
    setError("");
    props.onSave(name, interviewer)
  }
  }
    

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name" 
            value={name}
            onSubmit={event => event.preventDefault()}
            onChange={(event)=> {
              setName(event.target.value)
            }}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={(interviewerId) => {
            setInterviewer(interviewerId)
          }}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={handleReset} danger>Cancel</Button>
          <Button onClick={saveInfo} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
