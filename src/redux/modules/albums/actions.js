export const ADD_PHOTO = 'album/ADD_PHOTO';


export function addPhoto(lastEditedImage){
    return {
        type: ADD_PHOTO,
        payload: lastEditedImage,
    }
}