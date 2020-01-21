import { About } from './types';
import {
  observable,
  action,
} from 'mobx';
import {
  database,
  firestore
} from 'firebase';

class AboutStore {
  @observable Abouts: About[] = [];

  @action
  watchAbout = () => {
    const db = firestore();
    db.collection('episodes').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        const data: Record<string, About> = doc.data();
        if (data) {
          const mappedData: About[] = Object.entries(data).map((entry) => {
            return {
              ...entry[1],
              key: entry[0],
            };
          });
          this.Abouts = mappedData;
        }
      })
  })
}

}
// const dbRef = database().ref('/episodes');
// dbRef.on('value', (snapshot) => {
//   const data: Record<string, Episode> = snapshot.val();
//   if (data) {
//     const mappedData: Episode[] = Object.entries(data).map((entry) => {
//       return {
//         ...entry[1],
//         key: entry[0],
//       };
//     });
//     this.Episodes = mappedData;
//     console.log(this.Episodes)
//   }
// });
export default new AboutStore();