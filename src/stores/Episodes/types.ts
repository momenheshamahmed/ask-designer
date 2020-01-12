
import {
  Languages,
} from '../../utils/translation/index';

export interface Episode {
  key: string;
  id: number;
  content: Record<Languages, EpisodeContent>

  }

  export interface EpisodeContent {
    title: string;
    imgURL: string;
    audioURL: string;
  }
  