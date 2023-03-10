export const useDayBox = () => {
  const date = new Date();
  const day = date.getDate();

  const weekday = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const dayText = weekday[date.getDay()];

  return {
    day,
    dayText,
  };
};
