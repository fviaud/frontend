import { analytics, auth } from "../firebase";
import { UserAvatar } from "components";

const apiUserMap = (user) => ({
  id: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

const authentication = {};

authentication.session = async (setCurentUser) => {
  try {
    await auth.onAuthStateChanged(function (user) {
      if (user) setCurentUser({ values: apiUserMap(user) });
    });
  } catch (error) {
    setCurentUser();
  }
};

authentication.signIn = async (
  user,
  setUser,
  setCurentUser,
  setOpen,
  openSnackbar
) => {
  try {
    const { email, password } = user.values;
    const value = await auth.signInWithEmailAndPassword(email, password);
    setCurentUser({ values: apiUserMap(value.user) });
    setOpen(false);
    openSnackbar(
      `Signed in as ${value.user.displayName || value.user.email}`,
      "success"
    );
  } catch (error) {
    setUser((user) => ({
      ...user,
      loading: false,
      errors: {
        api: error.message,
      },
    }));
  }
};

authentication.signOut = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      reject();
      return;
    }
    auth
      .signOut()
      .then((value) => {
        analytics.logEvent("sign_out");
        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

authentication.getRoles = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      reject();
      return;
    }
    currentUser
      .getIdTokenResult()
      .then((idTokenResult) => {
        resolve(idTokenResult.claims.roles);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

export default authentication;
