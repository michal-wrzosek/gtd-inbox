export const generateId = () =>
  `${Date.now().toString(36)}${Math.random()
    .toString(36)
    .substr(2, 5)}`.toLowerCase();
