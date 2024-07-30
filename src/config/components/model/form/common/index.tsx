import { getCommonPropertyState } from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
  RecoilSwitch,
} from '@konomi-app/kintone-utilities-react';
import React, { FC } from 'react';

const Component: FC = () => (
  <div className='p-4'>
    <PluginFormSection>
      <PluginFormTitle>{t('config.common.showResult.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.common.showResult.description')}
      </PluginFormDescription>
      <RecoilSwitch
        state={getCommonPropertyState('showResult')}
        label={t('config.common.showResult.label')}
      />
    </PluginFormSection>
  </div>
);

export default Component;
