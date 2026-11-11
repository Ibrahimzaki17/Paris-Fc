
import Match from "../models/match.js";

// Get the beginning and end of a match's calendar day
const getDayRange = (date) => {
  const startDay = new Date(date);
  startDay.setHours(0, 0, 0, 0);

  const endDay = new Date(date);
  endDay.setHours(23, 59, 59, 999);

  return { startDay, endDay };
};

// Check whether either team already has a match that day
const hasTeamConflict = async (
  homeTeam,
  awayTeam,
  matchDate,
  excludeId = null
) => {
  const { startDay, endDay } = getDayRange(matchDate);

  const query = {
    matchDate: {
      $gte: startDay,
      $lte: endDay,
    },
    $or: [
      { homeTeam: { $in: [homeTeam, awayTeam] } },
      { awayTeam: { $in: [homeTeam, awayTeam] } },
    ],
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  return await Match.findOne(query);
};

export { hasTeamConflict };
