import {
  v1,
} from 'uuid';
import {
  storage,
} from 'firebase';

class StorageStore {
  uploadImage: (image: File | string | null) => Promise<string> = (image) => {
    return new Promise<string>((res, rej) => {
      if (!image) {
        rej('Image is required');
      } else if (typeof image === 'string') {
        res(image);
      } else {
        try {
          const reader = new FileReader();
          reader.onload = async (e) => {
            if (e.target) {
              const uid = v1();
              const extention = image.type === 'image/png' ? 'png' : 'jpg';
              const storageRef = storage().ref(`carouselItems/${uid}.${extention}`);
              const result = await storageRef.put((e.target.result as ArrayBuffer));
              res(await result.ref.getDownloadURL());
            }
          };
          reader.onerror = () => rej('Could not read file');
          reader.onabort = () => rej('File read aborted');
          reader.readAsArrayBuffer(image);
        } catch (error) {
          rej(error);
        }
      }
    });
  };
}

export default new StorageStore();