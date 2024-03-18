import { getCode, setCode } from './repository.js';

export async function ormSetCode(roomId, code) {
    await setCode(roomId, code);
}

export async function ormGetCode(roomId) {
    return await getCode(roomId);
}
