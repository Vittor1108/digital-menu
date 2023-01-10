export const token: string =
  sessionStorage.getItem('token')! || localStorage.getItem('token')!;
