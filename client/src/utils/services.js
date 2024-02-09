export const formatStatusEmoji = (status) => {
  let formattedStatus;

  switch (status) {
    case "Alive":
      formattedStatus = "🟢";
      break;
    case "Dead":
      formattedStatus = "💀";
      break;
    case "Unknown":
      formattedStatus = "🤷‍♂️";
      break;
    default:
      formattedStatus = "🤷‍♂️";
      break;
  }

  return formattedStatus;
};
