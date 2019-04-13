export default function ConfirmUserCredentials(auth, setUserId, dataFunction) {
  // If a session already exists, update userId in state and renew auth0 token
  if (auth.userProfile) {
    setUserId(auth.userProfile);
    dataFunction(auth.userProfile.sub);
    auth.renewSession(() => {});
    // This renews session and user data if the page is refreshed
  } else if (localStorage.getItem('isLoggedIn') === 'true') {
    auth.renewSession((profile) => {
      auth.getProfile((profile) => {
        if (profile) {
          setUserId(profile.sub);
          dataFunction(profile.sub);
        }
      })
    });
  }
}
