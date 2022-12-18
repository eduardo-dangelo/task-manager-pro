export const tokenConfig = (token?: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const userToken = localStorage.token || token
  console.log('userToken', userToken)
  console.log('localStorage.token', localStorage.token)
  if (userToken) {
    // @ts-ignore
    config.headers['Authorization'] = `Token ${userToken}`
  }
  return config
}
