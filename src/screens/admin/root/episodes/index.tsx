import React from 'react';
import GeneralTableComponent from '../../../../components/GeneralTableComponent';
import {
  useObserver,
} from 'mobx-react';

import EpisodeStore from '../../../../stores/Episodes/index';
import { Episode } from '../../../../stores/Episodes/types';

const AdminEpisodesTable: React.FC = () => {
  return useObserver(() => (
    <GeneralTableComponent<Episode>
      data={EpisodeStore.Episodes}
      deleteAction={EpisodeStore.deleteEpisode}
      route={'/admin/episodes'}
      tableData={[
        {
          inContent: true,
          key: 'title',
          title: 'title',
        },
        {
          inContent: true,
          key: 'imgURL',
          title: 'Image',
        },
        {
          inContent: true,
          key: 'audioURL',
          title: 'Audio',
        },
      ]}
    />
  ));
}

export default AdminEpisodesTable;
