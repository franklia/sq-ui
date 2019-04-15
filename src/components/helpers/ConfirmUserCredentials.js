// Both conditions below will achieve three things:
// 1. Set userId in state,
// 2. Retrieve a data set
// 3. Renew the token
// The reason for having two conditions is that the data set (and hence the display of it in the UI) can be
// achieved much faster with the first condition if the userProfile already exists in memory. If it doesn't
// exist due to a page refresh, then we need to provide another way to get it (the long way).
export default function ConfirmUserCredentials(auth, setAuth0Id, dataFunction) {
  // If a session already exists...
  if (auth.userProfile) {
    setAuth0Id(auth.userProfile.sub);
    dataFunction(auth.userProfile.sub);
    auth.renewSession(() => {});
    // If the page is refreshed...
  } else if (localStorage.getItem('isLoggedIn') === 'true') {
    auth.renewSession((profile) => {
      auth.getProfile((profile) => {
        if (profile) {
          setAuth0Id(profile.sub);
          dataFunction(profile.sub);
        }
      })
    });
  }
}
