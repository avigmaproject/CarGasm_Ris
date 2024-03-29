export function isEmailValid(value: string) {
  const re =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value.trim());
}

export function isNameValid(value: string) {
  const re = /^[a-zA-Z ]{2,40}$/;
  return re.test(value.trim());
}
