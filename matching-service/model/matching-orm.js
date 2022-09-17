import { 
  createPendingMatch, getPendingMatchById, getPendingMatchByDifficulty, deletePendingMatchById,
} from './repository.js';

export async function ormCreatePendingMatch(pendingMatch) {
  return await createPendingMatch(pendingMatch);
}

export async function ormGetPendingMatchById(id) {
  return await getPendingMatchById(id);
}

export async function ormGetPendingMatchByDifficulty(difficulty) {
  return await getPendingMatchByDifficulty(difficulty);
}

export async function ormDeletePendingMatchById(id) {
  return await deletePendingMatchById(id);
}
