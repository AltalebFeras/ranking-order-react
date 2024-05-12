"use client"
import React, { useState, useEffect } from "react";

function Raffle() {
  const [participantInput, setParticipantInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [finalParticipants, setFinalParticipants] = useState([]);

  const handleParticipantInputChange = (event) => {
    setParticipantInput(event.target.value);
  };

  const handleAddParticipant = () => {
    if (participantInput.trim() !== "") {
      setParticipants([...participants, participantInput.trim()]);
      setParticipantInput("");
    }
  };

  const handleDeleteParticipant = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };

  const handleRaffle = () => {
    let participantsCopy = [...participants];
    let participantsInRound = [];

    while (participantsCopy.length > 1) {
      const randomIndex = Math.floor(Math.random() * participantsCopy.length);
      const participant = participantsCopy.splice(randomIndex, 1)[0];
      participantsInRound.push(participant);
    }

    setFinalParticipants([...finalParticipants, participantsCopy[0]]);
    setParticipants([...participantsInRound]);
  };

  useEffect(() => {
    localStorage.setItem("participants", JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    const savedParticipants = JSON.parse(localStorage.getItem("participants"));
    if (savedParticipants) {
      setParticipants(savedParticipants);
    }
  }, []);

  function ordinalSuffix(num) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  const handleClearRankingOrder = () => {
    setFinalParticipants([]);
  };

  return (
    <div className="container mt-5">
      <h2>Aleatory selection</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={participantInput}
          onChange={handleParticipantInputChange}
        />
      </div>
        <button className="btn btn-primary mb-3 me-3" onClick={handleAddParticipant}>
          Add Participant
        </button>
      <button
        className="btn btn-success mb-3"
        onClick={handleRaffle}
        disabled={participants.length === 0}
      >
        Start Raffling
      </button>
      <button className="btn btn-warning   mx-3 mb-3" onClick={handleClearRankingOrder}>
            Clear Ranking
          </button>
      {participants.length === 0 && (
        <h5 className="text-danger">No participants available.</h5>
      )}
      <div className="d-flex flex-wrap gap-5">
        <div>
          <h3>All Participants:</h3>
          <ul className="list-group">
            {participants.map((participant, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {participant}
                <button className="btn btn-sm btn-danger mx-3" onClick={() => handleDeleteParticipant(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Ranking Order :</h3>
        
          <ul className="list-group">
            {finalParticipants.map((participant, index) => (
              <li key={index} className="list-group-item">
                {ordinalSuffix(index + 1)}: {participant}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Raffle;
