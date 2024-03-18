import { 
  createPendingMatch, getPendingMatchById, getPendingMatch, deletePendingMatchById,
} from './repository.js';

export async function ormCreatePendingMatch(pendingMatch) {
  return await createPendingMatch(pendingMatch);
}

export async function ormGetPendingMatchById(id) {
  return await getPendingMatchById(id);
}

export async function ormGetPendingMatch(difficulty, username) {
  return await getPendingMatch(difficulty, username);
}

export async function ormDeletePendingMatchById(id) {
  return await deletePendingMatchById(id);
}
