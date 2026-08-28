const formatMatchDate = (date) => {
  const d = new Date(date);

  const day = d.getDate();

  let suffix = "th";

  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  }

  const month = d.toLocaleString("en-US", {
    month: "long"
  });

  const year = d.getFullYear();

  return `${day}${suffix} ${month}, ${year}`;
};

export default formatMatchDate