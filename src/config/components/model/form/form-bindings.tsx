import { Skeleton } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { appFieldsState, dstAppFieldsState } from '../../../states/kintone';
import { getConditionPropertyState } from '@/config/states/plugin';
import { RecoilFieldSelect } from '@konomi-app/kintone-utilities-react';
import { Link2Icon } from 'lucide-react';
import { t } from '@/lib/i18n';

const srcKeyFieldCodeState = getConditionPropertyState('srcKeyFieldCode');
const dstKeyFieldCodeState = getConditionPropertyState('dstKeyFieldCode');

const SrcKeyFieldCodeSelect: FC = () => {
  const srcKeyFieldCode = useRecoilValue(srcKeyFieldCodeState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(srcKeyFieldCodeState, value);
      },
    []
  );

  return (
    <RecoilFieldSelect
      label={t('config.condition.keyFieldCode.src.label')}
      state={appFieldsState}
      onChange={onChange}
      fieldCode={srcKeyFieldCode}
    />
  );
};

const DstKeyFieldCodeSelect: FC = () => {
  const dstKeyFieldCode = useRecoilValue(dstKeyFieldCodeState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: string) => {
        set(dstKeyFieldCodeState, value);
      },
    []
  );

  return (
    <RecoilFieldSelect
      label={t('config.condition.keyFieldCode.dst.label')}
      state={dstAppFieldsState}
      onChange={onChange}
      fieldCode={dstKeyFieldCode}
    />
  );
};

const Container: FC = () => {
  return (
    <div className='flex items-center gap-4'>
      <SrcKeyFieldCodeSelect />
      <Link2Icon />
      <DstKeyFieldCodeSelect />
    </div>
  );
};

export default memo(Container);
