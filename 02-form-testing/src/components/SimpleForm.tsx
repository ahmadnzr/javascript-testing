import React, { useCallback, useState } from "react";

const SimpleForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      setFullname(`${firstName} ${lastName}`);
      setFirstName("");
      setLastName("");
    },
    [firstName, lastName]
  );
  return (
    <form action="" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first-name">First name</label>
        <input
          type="text"
          id="first-name"
          name="first-name"
          value={firstName}
          placeholder="input firstname"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last name</label>
        <input
          type="text"
          id="last-name"
          name="last-name"
          value={lastName}
          placeholder="input lastname"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button disabled={!firstName || !lastName}>Submit</button>
      {fullname && <h2>hello, {fullname}</h2>}
    </form>
  );
};

export default SimpleForm;
