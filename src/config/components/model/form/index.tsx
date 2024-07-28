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
import FormKeyFieldCode from './form-key-field-code';
import FormBindings from './form-bindings';

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
      <FormKeyFieldCode />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.bindings.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.bindings.description')}
      </PluginFormDescription>
      <FormBindings />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.srcQuery.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.srcQuery.description')}
      </PluginFormDescription>
      <RecoilText
        state={getConditionPropertyState('srcQuery')}
        label={t('config.condition.srcQuery.label')}
        placeholder={t('config.condition.srcQuery.placeholder')}
        width={600}
      />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>{t('config.condition.dstQuery.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.condition.dstQuery.description')}
      </PluginFormDescription>
      <RecoilText
        state={getConditionPropertyState('dstQuery')}
        label={t('config.condition.dstQuery.label')}
        placeholder={t('config.condition.dstQuery.placeholder')}
        width={600}
      />
    </PluginFormSection>
    <DeleteButton />
  </div>
);

export default Component;
