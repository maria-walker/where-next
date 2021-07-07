import React from "react";
import { useState } from "react";

const Input = ({ setPostcode, policeDataTicked, setPoliceDataTicked }) => {
  const [newPostcode, setNewPostcode] = useState("");

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setPostcode(newPostcode);
        }}
      >
        <ul>
          <li>
            <label htmlFor="postcode">First part of Postcode</label>
            <input
              id="postcode"
              value={newPostcode}
              onChange={(event) => {
                setNewPostcode(event.target.value);
                console.log(event.target.value);
              }}
              placeholder="e.g. M1 or EC1"
            ></input>
          </li>

          <li>
            <label htmlFor="crimes">See recent crimes in the area</label>
            <input
              type="checkbox"
              id="crimes"
              value="crimes"
              onChange={(event) => {
                // event.preventDefault();
                setPoliceDataTicked(!policeDataTicked);
                console.log("ticked!");
              }}
            ></input>
          </li>

          <li>
            <label htmlFor="events">
              See recent gigs and events in the area
            </label>
            <input type="checkbox" id="events" value="events"></input>
          </li>
        </ul>

        <button id="submit" type="submit" value="Submit">
          Submit
        </button>
        <button id="reset" type="reset">
          Reset
        </button>
      </form>
    </div>
  );
};

export default Input;
