const Notification = ({ operationSuccessful, notificationMessage }) => {
  return (
    <>
      <div
        style={{
          color: `${operationSuccessful ? "green" : "red"}`,
          border: `${operationSuccessful ? "solid green" : "solid red"}`,
          padding: "20px",
          backgroundColor: "grey",
          fontSize: "25px",
          borderRadius: "10px",
        }}
      >
        <p>{notificationMessage}</p>
      </div>
    </>
  );
};

export default Notification;
