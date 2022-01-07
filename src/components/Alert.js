import React from "react";

function Alert(props) {
  // function to capitalize the first letter of message type of alert
  const capitalize = (word) => {
    if(word === "danger")
    {
        word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    // props.alert &&: this will act just as a normal AND operator.
    //    We did this because we have initially used out alert as NULL.
    //    The compiler will throw an error {props.alert.type} because props.alert will be NULL.
    //    To avoid this, we have used props.alert &&
    //    If props.alert is null then the code written after && won’t be shown
    //    otherwise the code inside <div></div> tag will be displayed.

    <div style={{ height: "50px" }}>
      <div>
        {props.alert && (
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
          </div>
        )}
      </div>
    </div>
  );
}

export default Alert;
