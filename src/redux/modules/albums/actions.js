export const ADD_PHOTO = 'album/ADD_PHOTO';
export const VIEW_PHOTO = 'album/VIEW_PHOTO';

export function addPhoto(lastEditedImage){
    return {
        type: ADD_PHOTO,
        payload: lastEditedImage,
    }
}

export function viewPhoto(index, images){
    return {
        type: VIEW_PHOTO,
        payload: {
        	index: index,
        	images: images
        }
    }
}