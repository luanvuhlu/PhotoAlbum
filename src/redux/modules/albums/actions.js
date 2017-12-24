export const ADD_PHOTO = 'album/ADD_PHOTO';
export const VIEW_PHOTO = 'album/VIEW_PHOTO';

export function addPhoto(lastEditedImage){
    return {
        type: ADD_PHOTO,
        payload: lastEditedImage,
    }
}

export function viewPhoto(uri){
    return {
        type: VIEW_PHOTO,
        payload: 'file://' + uri
    }
}