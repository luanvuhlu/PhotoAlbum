export const RELOAD_ALBUM = 'album/RELOAD_ALBUM';


export function reloadAlbum(){
    return {
        type: RELOAD_ALBUM,
        payload: true,
    }
}