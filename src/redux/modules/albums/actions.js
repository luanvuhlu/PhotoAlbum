export const RELOAD_ALBUM = 'album/RELOAD_ALBUM';


export function reloadAlbum(){
    console.log('reload album action');
    return {
        type: RELOAD_ALBUM,
        payload: true,
    }
}