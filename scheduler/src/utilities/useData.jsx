import { ref } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { database } from "../utilities/firebase.jsx";

export const useData = (path, transform) => {

  const [snapshot, loading, error] =
    useObject(ref(database, path));

  let data;

  if (snapshot) {
    const value = snapshot.val();
    data =
      !loading && !error && transform
        ? transform(value)
        : value;
  }

  return [data, loading, error];
};