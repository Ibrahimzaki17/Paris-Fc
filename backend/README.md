That's actually a better way to learn. I'll write the Players part and explain every line. Then you can apply the exact same pattern to Coaches, Matches, and Announcements.

Step 1: Get the latest 5 players
const recentPlayers = await Player.find()
    .populate("user", "fullname")
    .sort({ createdAt: -1 })
    .limit(5);

Now let's understand every line.

Player.find()

This means:

"Give me all players."

const recentPlayers = await Player.find();

If your database has:

Player
Ahmed
Hassan
Ibrahim
Ali

It returns:

[
    { ... },
    { ... },
    { ... },
    { ... }
]
.populate("user", "fullname")

Remember your Player model has:

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}

Without populate:

{
    user: "687ab5d9..."
}

With populate:

{
    user: {
        fullname: "Ahmed Ali"
    }
}

Now you can access:

player.user.fullname

instead of just an ObjectId.

.sort({ createdAt: -1 })

This is new.

Every document has:

createdAt
updatedAt

because you've enabled timestamps.

Suppose:

Player	Created
Ahmed	Monday
Hassan	Tuesday
Ibrahim	Wednesday

Without sorting:

Ahmed
Hassan
Ibrahim

With:

.sort({ createdAt: -1 })

you get:

Ibrahim
Hassan
Ahmed

The -1 means descending (newest first).

If you used:

.sort({ createdAt: 1 })

you'd get:

Ahmed
Hassan
Ibrahim

(oldest first).

.limit(5)

Suppose you have:

25 players

You only want the latest five.

.limit(5)

returns only:

Player 25
Player 24
Player 23
Player 22
Player 21
Step 2: Format them

Now convert them into a common structure:

const playerActivities = recentPlayers.map(player => ({
    type: "Player",
    title: `${player.user.fullname} joined the team`,
    date: player.createdAt
}));

If Ahmed was just created, it becomes:

{
    type: "Player",
    title: "Ahmed Ali joined the team",
    date: "2026-07-09T08:00:00.000Z"
}

Notice that this object has exactly the format we want.