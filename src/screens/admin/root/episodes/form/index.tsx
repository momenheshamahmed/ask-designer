import React from 'react';
import { useObserver } from 'mobx-react';
import GeneralFormComponent from '../../../../../components/GeneralFormComponent';
import EpisodeStore from '../../../../../stores/Episodes/index';
import { Episode } from '../../../../../stores/Episodes/types';

const AdminEpisodesForm: React.FC = () => {
  return useObserver(() => <GeneralFormComponent<Episode>
    addAction={EpisodeStore.addEpisode}
    editAction={EpisodeStore.editEpisode}
    data={EpisodeStore.Episodes}
    formData={[
      {
        inContent: true,
        key: 'title',
        title: 'Title',
        type: 'text',
      },
      {
        inContent: true,
        key: 'imgURL',
        title: 'Image',
        type: 'image',
      },
      {
        inContent: true,
        key: 'audioURL',
        title: 'Audio',
        type: 'audio',
      },
    ]}
  />);
}

export default AdminEpisodesForm;
