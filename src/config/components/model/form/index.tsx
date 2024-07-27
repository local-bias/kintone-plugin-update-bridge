import React, { FC } from 'react';

import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
  RecoilText,
  RecoilSwitch,
} from '@konomi-app/kintone-utilities-react';
import DeleteButton from './condition-delete-button';
import { getConditionPropertyState } from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import FormDstApp from './form-dst-app';

const Component: FC = () => (
  <div className='p-4'>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.dstAppId.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.dstAppId.description')}
      </PluginFormDescription>
      <FormDstApp />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.keyFieldCode.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.keyFieldCode.description')}
      </PluginFormDescription>
      <RecoilText
        state={getConditionPropertyState('memo')}
        label={t('config.condition.memo.label')}
        placeholder={t('config.condition.memo.placeholder')}
      />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.bindings.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.bindings.description')}
      </PluginFormDescription>
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.isSampleUIShown.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.isSampleUIShown.description')}
      </PluginFormDescription>
      <RecoilSwitch
        state={getConditionPropertyState('isSampleUIShown')}
        label={t('config.condition.isSampleUIShown.label')}
      />
    </PluginFormSection>
    <DeleteButton />
  </div>
);

export default Component;
