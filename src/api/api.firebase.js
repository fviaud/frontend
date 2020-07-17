import firebase from "firebase";
const db = firebase.firestore();

export const addfavori = async (data, user) => {
  try {
    // await db.collection("favoris").doc(data.title).set(data);
    db.collection("favoris").doc(user.values.id).collection("movies").add(data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllfavoris = async (setState, user) => {
  try {
    const snapshot = await db
      .collection("favoris")
      .doc(user.values.id)
      .collection("movies")
      .get();

    setState((state) => ({
      ...state,
      values: snapshot.docs.map((doc) => doc.data()),
      loading: false,
      errors: {},
    }));
  } catch (err) {
    console.log(err);
  }
};

export const delFavori = async (title) => {
  try {
    const res = await db.collection("favoris").doc(title).delete();
  } catch (err) {
    console.log(err);
  }
};
