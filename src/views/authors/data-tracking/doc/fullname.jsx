import { useState, useEffect } from "react";
import { tignan } from "../../../../talaan";

const Fullname = ({ id }) => {
  const [fullname, setFullname] = useState("");

  const answers = async () => {
    await tignan("users", { user: id }).then((response) => {
      setFullname(response.fullname);
    });
  };

  useEffect(() => {
    answers();
  }, [id]);
  return fullname;
};

export default Fullname;
