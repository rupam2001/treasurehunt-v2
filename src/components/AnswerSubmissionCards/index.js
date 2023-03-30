import React, { useState } from "react";
import { ENDPOINT } from "../../constants";
import "./style.css";

export default function AnswerSubmissionCard({
  question,
  setRefresh,
  custom_route,
  locked_placeholder,
  lock_color,
  index,
}) {
  const [code, setCode] = useState(null);
  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      let _code = code.replace(/^\s+|\s+$/g, '')
      const res = await fetch(
        ENDPOINT + (custom_route ? custom_route : "/answer/submit"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            team_id: localStorage.getItem("team_id"),
            passkey: localStorage.getItem("passkey"),
            answer: _code,
            question_id: question._id,
          }),
        }
      ).then((r) => r.json());

      if (res.message == "success") {
        setRefresh(Math.random());
      } else {
        showError();
      }
    } catch (error) {
      showError();
    }
    setSubmitting(false);
  };
  const showError = () => {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 2000);
  };

  return (
    <React.Fragment>
      <div
        className="ans-container"
        style={isError ? { border: "2px solid red" } : {}}
      >
        {question.title != "" ? (
          <div>
            <h5 className="answer-submission-title">
              <i class="fa fa-unlock lock-icon" />
              {"  "} Mystery {index + 1 ? index + 1 : null}
            </h5>
            <div className="answer-submission-body-container">
              <div className="ans-q-title">
                <span>{question.title}</span>
              </div>
              {question.img_url && (
                <div className="ans-img">
                  <img src={question.img_url} />
                </div>
              )}
              {!question.isSolved && !submitting ? (
                <div className="ans-input-container">
                  <input
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Type code here"
                  />
                  <button onClick={onSubmit}>Submit</button>
                </div>
              ) : !question.isSolved && submitting ? (
                <div className="loader-container">
                  <div class="lds-dual-ring"></div>
                  Submitting your answer
                </div>
              ) : null}
              {question.isSolved && <div className="ans-solved">Solved</div>}
            </div>
          </div>
        ) : (
          <div className="locked-container">
            <i
              class="fa fa-lock lock-icon"
              aria-hidden="true"
              style={lock_color ? { color: lock_color } : {}}
            ></i>
            <span>{locked_placeholder}</span>
          </div>
        )}
      </div>
      <hr />
    </React.Fragment>
  );
}
