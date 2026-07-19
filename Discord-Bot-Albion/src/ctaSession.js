const sessions = new Map();

function addPlayers(threadId, players) {

    if (!sessions.has(threadId)) {

        sessions.set(threadId, new Set());

    }

    const session = sessions.get(threadId);

    players.forEach(player => {

        session.add(player);

    });

    return [...session];

}

function getPlayers(threadId) {

    if (!sessions.has(threadId)) {

        return [];

    }

    return [...sessions.get(threadId)];

}

function clearSession(threadId) {

    sessions.delete(threadId);

}

module.exports = {

    addPlayers,

    getPlayers,

    clearSession

};