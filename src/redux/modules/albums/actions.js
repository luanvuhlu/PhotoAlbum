export const ADD_PHOTO = 'album/ADD_PHOTO';
export const VIEW_PHOTO = 'album/VIEW_PHOTO';
export const REMOVE_PHOTO = 'album/REMOVE_PHOTO';

export function addPhoto(lastEditedImage){
	return {
		type: ADD_PHOTO,
		payload: lastEditedImage,
	};
}

export function viewPhoto(image){
	return {
		type: VIEW_PHOTO,
		payload: image
	};
}

export function removePhoto(images){
	return {
		type: REMOVE_PHOTO,
		payload: images
	}
}