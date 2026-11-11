import { hasTeamConflict } from "../utils/match.utils.js";

const validateMatch = async (req, res, next) => {
  try {
    const { homeTeam, awayTeam, matchDate } = req.body;

    // Ensure team names are not empty
    const home = homeTeam?.trim();
    const away = awayTeam?.trim();

    if (!home || !away) {
      return res.status(400).json({
        message: "Please provide both team names.",
      });
    }

    // Teams cannot be the same
    if (home.toLowerCase() === away.toLowerCase()) {
      return res.status(400).json({
        message: "A team cannot play against itself.",
      });
    }

    // Validate match date
    const parsedDate = new Date(matchDate);

    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        message: "Please provide a valid match date.",
      });
    }

    // Upcoming matches cannot be scheduled in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (parsedDate < today) {
      return res.status(400).json({
        message: "You cannot schedule an upcoming match in the past.",
      });
    }

    // Check whether either team already has a match that day
    const existingMatch = await hasTeamConflict(
      home,
      away,
      parsedDate
    );

    if (existingMatch) {
      return res.status(400).json({
        message: "One of these teams already has a match scheduled on this date.",
      });
    }

    // Pass the validated values to the controller
    req.matchDate = parsedDate;
    req.body.homeTeam = home;
    req.body.awayTeam = away;

    next();

  } catch (error) {
    next(error);
  }
};

export default validateMatch;
