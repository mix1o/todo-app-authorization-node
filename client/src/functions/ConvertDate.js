export const ConverDate = (date, finishedDate) => {
  const dateConv = {
    dateAdded: '',
    dateFinished: '',
  };

  let dateF = new Date(date);
  let day = dateF.getDate();
  let month = dateF.getMonth() + 1;
  let years = dateF.getFullYear();

  if (day < '10') {
    day = `0${day}`;
  }
  if (month < '10') {
    month = `0${month}`;
  }

  let dateCompleted = new Date(finishedDate);
  let dayCompleted = dateCompleted.getDate();
  let monthCompleted = dateCompleted.getMonth() + 1;
  let yearsCompleted = dateCompleted.getFullYear();
  let hoursCompleted = dateCompleted.getHours();
  let minutesCompleted = dateCompleted.getMinutes();
  let secondsCompleted = dateCompleted.getSeconds();

  if (dayCompleted < '10') {
    dayCompleted = `0${dayCompleted}`;
  }
  if (monthCompleted < '10') {
    monthCompleted = `0${monthCompleted}`;
  }
  if (hoursCompleted < '10') {
    hoursCompleted = `0${hoursCompleted}`;
  }
  if (minutesCompleted < '10') {
    minutesCompleted = `0${minutesCompleted}`;
  }
  if (secondsCompleted < '10') {
    secondsCompleted = `0${secondsCompleted}`;
  }
  dateConv.dateAdded = `${day}.${month}.${years}`;
  dateConv.dateFinished = `${dayCompleted}.${monthCompleted}.${yearsCompleted} ${hoursCompleted}:${minutesCompleted}:${secondsCompleted}`;
  return dateConv;
};
