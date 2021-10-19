// import { useState, useRef, useEffect } from "react";

// const SimpleInput = (props) => {
//   const [enteredName, setEnteredName] = useState("");
//   const nameInputRef = useRef();
//   const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
//   const [enteredNameTouched, setEnteredNameTouched] = useState(false);

//   useEffect(() => {
//     if (enteredNameIsValid) {
//       console.log("name input is valid");
//     }
//   }, [enteredNameIsValid]);

//   const nameChangeHandler = (event) => {
//     setEnteredName(event.target.value);
//     if (event.target.value.trim() !== '') {
//       setEnteredNameIsValid(true);
//     }
//   };

//   const nameInputBlurHandler = (event) => {
//     setEnteredNameTouched(true);
//     if (enteredName.trim() === "") {
//       setEnteredNameIsValid(false);
//     }
//   };

//   const formSubmissionHandler = (event) => {
//     event.preventDefault();
//     setEnteredNameTouched(true);
//     if (enteredName.trim() === "") {
//       setEnteredNameIsValid(false);
//       return;
//     }
//     setEnteredNameIsValid(true);
//     console.log(enteredName);
//     const enteredValue = nameInputRef.current.value;
//     console.log(enteredValue);
//     setEnteredName("");
//   };

//   const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

//   const nameInputClasses = nameInputIsInvalid
//     ? "form-control invalid"
//     : "form-control";

//   return (
//     <form onSubmit={formSubmissionHandler}>
//       <div className={nameInputClasses}>
//         <label htmlFor="name">Your Name</label>
//         <input
//           ref={nameInputRef}
//           type="text"
//           id="name"
//           onChange={nameChangeHandler}
//           onBlur={nameInputBlurHandler}
//           value={enteredName}
//         />
//         {nameInputIsInvalid && (
//           <p className="error-text">Name must not be empty.</p>
//         )}
//       </div>
//       <div className="form-actions">
//         <button>Submit</button>
//       </div>
//     </form>
//   );
// };

// export default SimpleInput;

import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredMail,
    isValid: enteredMailIsValid,
    hasError: mailInputHasError,
    valueChangeHandler: mailChangedHandler,
    inputBlurHandler: mailBlurHandler,
    reset: resetMailInput,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredNameIsValid && enteredMailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid || !enteredMailIsValid) {
      return;
    }
    console.log(enteredName);
    resetNameInput();
    resetMailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const mailInputClasses = mailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>

      <div className={mailInputClasses}>
        <label htmlFor="name">Your E-mail</label>
        <input
          type="email"
          id="email"
          onChange={mailChangedHandler}
          onBlur={mailBlurHandler}
          value={enteredMail}
        />
        {mailInputHasError && (
          <p className="error-text">Enter a valid mail ID.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
