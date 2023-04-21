import React from "react";

export default function Alert(props) {
  return (
    <div>
      <div className={`alert alert-${props.alert.type} my-5 mx-1`} role="alert">
        {props.alert.msg}
      </div>
    </div>
  );
}
