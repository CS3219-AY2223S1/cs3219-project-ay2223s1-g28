import { 
  ormCreatePendingMatch as _createPendingMatch,
  ormGetPendingMatchById as _getPendingMatchById,
  ormGetPendingMatch as _getPendingMatch,
  ormDeletePendingMatchById as _deletePendingMatchById,
 } from '../model/matching-orm.js';

const MATCHING_TIME = 30000 // 30s

export const handleMatch = (socket) => {
  socket.on('match', async (newMatch) => {
    // Check if there is already a pending match of same difficulty
    const pendingMatch = await _getPendingMatch(newMatch.difficulty, newMatch.username);
    if (pendingMatch == null) {
      // If there is no pending match, create a pending match
      const newPendingMatch = await _createPendingMatch({ id: socket.id, ...newMatch });

      // Wait for new match
      setTimeout(async () => {
        // If the pending match is still yet to be matched, delete the pending match and 
        // emit matchFail event to the pendingMatch
        if (await _getPendingMatchById(newPendingMatch.id) != null) {
          await _deletePendingMatchById(newPendingMatch.id);
          socket.emit('matchFail');
        }
      }, MATCHING_TIME);
    } else {
      // If there is a pending match, match newMatch with pendingMatch by deleting the pending match
      await _deletePendingMatchById(pendingMatch.id);
      // and emiting matchSuccess event to both newMatch and pendingMatch 
      // along with the id of pendingMatch as the matched room ID
      socket.to(pendingMatch.id).emit('matchSuccess', pendingMatch.id);
      socket.emit('matchSuccess', pendingMatch.id);
    }
  });
};

export const handleDisconnect = (socket) => {
  socket.on('disconnect', async () => {
    await _deletePendingMatchById(socket.id);
    console.log(`User disconnected: ${socket.id}`);
  });
};
