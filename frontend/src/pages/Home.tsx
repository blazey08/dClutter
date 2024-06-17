import { useState, useEffect } from "react";

export function Home() {
  const [message, setMessage] = useState("My message");
  useEffect(() => {
    fetch("/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
