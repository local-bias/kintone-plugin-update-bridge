import { Autocomplete, Skeleton, TextField } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { kintoneAppsState } from '../../../states/kintone';
import { getConditionPropertyState } from '@/config/states/plugin';
import { RecoilFieldSelect } from '@konomi-app/kintone-utilities-react';
import { Link2Icon } from 'lucide-react';

const dstAppIdState = getConditionPropertyState('dstAppId');

const SrcFieldCode: FC = () => {
  const allApps = useRecoilValue(kintoneAppsState);
  const dstAppId = useRecoilValue(dstAppIdState);

  return (
    <RecoilFieldSelect
      state={appFieldsState}
      onChange={(code) => changeRow(i, code)}
      fieldCode={value}
    />
  );
};

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton variant='rounded' width={350} height={56} />}>
      <SrcFieldCode />
      <Link2Icon />
    </Suspense>
  );
};

export default memo(Container);
