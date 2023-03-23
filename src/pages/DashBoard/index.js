import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnswerSubmissionCard from "../../components/AnswerSubmissionCards";
import { ENDPOINT, Questions } from "../../constants";
import "./style.css";
import Confetti from "react-confetti";
import { toast } from "react-toastify";

export default function DashBoard() {
  const [story, setStory] = useState("");
  const [unLockedAnswers, setUnclockedAnswers] = useState([]);
  const [hiddenLines, setHiddenLines] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [refresh, setRefresh] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [teamId, setTeamId] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("team_id") || !localStorage.getItem("passkey")) {
      navigate("/");
      console.log("redirect");
    } else {
      setTeamId(localStorage.getItem("team_id"));
    }
  }, []);

  const constructEmptyLine = (line) => {
    let string = line.split("").map((ch) => "_");
    return <span>{string}.</span>;
  };

  const constructUnlockedLine = (line) => {
    return (
      <span className="unlockedline" style={{ textDecoration: "underline" }}>
        {line}.
      </span>
    );
  };
  const fetchStoryAsync = async () => {
    try {
      const res = await fetch(ENDPOINT + "/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_id: localStorage.getItem("team_id"),
          passkey: localStorage.getItem("passkey"),
        }),
      }).then((r) => r.json());

      setStory(res.text);
      setHiddenLines(res.hiddenLines);
      setUnclockedAnswers(res.solved_answers.map((q_id, i) => i));
      setIsFinished(res.is_story_solved);
      console.log(res);
    } catch (error) {}
  };
  const fetchAndSetInitialData = async () => {
    await fetchStoryAsync();
    await fetchQuestionsAsync();
  };

  const fetchQuestionsAsync = async () => {
    try {
      const res = await fetch(ENDPOINT + "/team/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_id: localStorage.getItem("team_id"),
          passkey: localStorage.getItem("passkey"),
        }),
      }).then((r) => r.json());

      setQuestions(res.questions);
    } catch (error) {}
    return Questions;
  };

  useEffect(() => {
    fetchAndSetInitialData();
    console.log("refreshed");
  }, [refresh]);

  useEffect(() => {
    if (isFinished) {
      window.scrollTo(0, 0);
    }
  }, [isFinished]);
  const handleLogOut = () => {
    localStorage.removeItem("team_id");
    localStorage.removeItem("passkey");
    navigate("/login");
    toast.success("You have been logged out.");
  };

  return (
    <div className="dashboard-wrapper">
      {isFinished && <Confetti width={400} height={4000} />}
      {isFinished && (
        <div className="congo animate__animated animate__bounceIn">
          Congratulations! You have finshed the game!
        </div>
      )}
      <div className="container">
        <div className="bg-yellow-700 text-white">
          <h5>{teamId}'s</h5>
          <div className="flex justify-center">
            <h1>DashBoard</h1>
            <i class="fa-solid fa-skull-crossbones ml-2"></i>
          </div>
        </div>
        <hr />
        {/* story section */}
        <div className="container-story animate__animated animate__backInLeft">
          {story.split(".").map((line, i) => {
            if (hiddenLines.findIndex((v) => v == i) != -1) {
              if (unLockedAnswers.length <= hiddenLines.length)
                return constructUnlockedLine(line);
              return constructEmptyLine(line);
            }
            return <span className="story">{line}. </span>;
          })}
        </div>
        {/* answers submission section */}
        <hr />
        <div>
          {questions.map((q, index) => (
            <AnswerSubmissionCard
              index={index}
              question={q}
              setRefresh={setRefresh}
              locked_placeholder={`Mystery ${index + 1}`}
            />
          ))}

          {/* final question */}
          <div>
            <AnswerSubmissionCard
              question={{
                title: questions.findIndex((q) => !q.isSolved) == -1 ? " " : "",
                isSolved: isFinished,
              }}
              setRefresh={setRefresh}
              custom_route={"/answer/submit/final"}
              locked_placeholder={"Final Mystery"}
              lock_color={"rgba(236, 50, 8, 0.764)"}
            />
          </div>
        </div>
      </div>
      <div className="map">
        <img src="https://res.cloudinary.com/devzardcloud/image/upload/v1652515919/Desktop_-_1_veenid.png"></img>
      </div>
      <div className="footer border-t-2 mt-4 text-blue-600">
        Developed by GLUG
        <button onClick={handleLogOut} className="text-red-500">Logout</button>
      </div>
    </div>
  );
}
