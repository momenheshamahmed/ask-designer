import { Episode } from './types';
import {
  observable,
  action,
} from 'mobx';
import {
  database,
} from 'firebase';

class EpisodeStore {
  @observable Episodes: Episode[] = [];

  @action
  addEpisode = async (value: Omit<Episode, 'key'>): Promise<void> => {
    try {
      const dbRef = database().ref('/episodes');
      const newItemRef = await dbRef.push();
      await newItemRef.set(value);
      return Promise.resolve();
    } catch (error) {
      alert("Sorry an error occured");
      return Promise.reject();
    }
  }

  @action
  editEpisode = async (key: string, value: Omit<Episode, 'key'>): Promise<void> => {
    try {
      const dbRef = database().ref(`episodes/${key}`);
      await dbRef.set(value);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  @action
  deleteEpisode = async (key: string): Promise<void> => {
    try {
      const dbRef = database().ref(`episodes/${key}`);
      await dbRef.remove();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @action
  watchEpisodes = () => {
    const dbRef = database().ref('/episodes');
    console.warn("I am Runninb");
    dbRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      const data: Record<string, Episode> = snapshot.val();
      if (data) {
        const mappedData: Episode[] = Object.entries(data).map((entry) => {
          return {
            ...entry[1],
            key: entry[0],
          };
        });
        this.Episodes = mappedData;
        console.log(this.Episodes)
      }
    });
  }
  
}

export default new EpisodeStore();