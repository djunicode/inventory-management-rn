export const isAuthenticated = async () => {
  if (AsyncStorage.getItem('auth_token')) {
    const auth_key = await AsyncStorage.getItem('auth_key');
    fetch('http://chouhanaryan.pythonanywhere.com/api/productlist/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${auth_key}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  } else {
    return false;
  }
};
