import React, { useCallback, useMemo, useState } from "react";

interface Props {
  min?: number;
  max?: number;
}
const FavoriteNumber = ({ min = 1, max = 9 }: Props) => {
  const [number, setNumber] = useState<number>(0);
  const [numberEntered, setNumberEntered] = useState<boolean>();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
        const value = +e.target.value
      setNumber(isNaN(value) ? 0 : value);
      setNumberEntered(true);
    },
    []
  );

  const isValid = useMemo(() =>{
      return !numberEntered || (number >= min && number <= max);
  }, [max, min, number, numberEntered])

  return (
    <div>
      <label htmlFor="favorite-number">Favorite Number</label>
      <input
        type="text"
        id="favorite-number"
        name="number"
        placeholder="enter number"
        value={number}
        onChange={handleChange}
      />
      {isValid ? null : <div>The number is invalid</div>}
    </div>
  );
};

export default FavoriteNumber;
