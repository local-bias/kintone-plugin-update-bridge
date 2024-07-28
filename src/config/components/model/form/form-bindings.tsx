import { IconButton, Skeleton, Tooltip } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { appFieldsState, dstAppFieldsState } from '../../../states/kintone';
import { getConditionPropertyState } from '@/config/states/plugin';
import { RecoilFieldSelect, useRecoilRow } from '@konomi-app/kintone-utilities-react';
import { Link2Icon } from 'lucide-react';
import { t } from '@/lib/i18n';
import { produce } from 'immer';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { getNewBinding } from '@/lib/plugin';

const bindingsState = getConditionPropertyState('bindings');

const Rows: FC = () => {
  const bindings = useRecoilValue(bindingsState);
  const { addRow, deleteRow, changeRow } = useRecoilRow({
    state: bindingsState,
    getNewRow: getNewBinding,
  });

  const onSrcFieldCodeChange = useRecoilCallback(
    ({ set }) =>
      (value: string, index: number) => {
        set(bindingsState, (prev) =>
          produce(prev, (draft) => {
            draft[index].srcFieldCode = value;
          })
        );
      },
    []
  );

  const onDstFieldCodeChange = useRecoilCallback(
    ({ set }) =>
      (value: string, index: number) => {
        set(bindingsState, (prev) =>
          produce(prev, (draft) => {
            draft[index].dstFieldCode = value;
          })
        );
      },
    []
  );

  return (
    <div className='grid gap-4'>
      {bindings.map((binding, index) => (
        <div key={binding.id} className='flex items-center gap-4'>
          <RecoilFieldSelect
            label={t('config.condition.bindings.src.label')}
            state={appFieldsState}
            onChange={(value) => onSrcFieldCodeChange(value, index)}
            fieldCode={binding.srcFieldCode}
          />
          <Link2Icon />
          <RecoilFieldSelect
            label={t('config.condition.bindings.dst.label')}
            state={dstAppFieldsState}
            onChange={(value) => onDstFieldCodeChange(value, index)}
            fieldCode={binding.dstFieldCode}
          />
          <Tooltip title={t('config.condition.bindings.add')}>
            <IconButton size='small' onClick={() => addRow(index)}>
              <AddIcon fontSize='small' fill='#0006' />
            </IconButton>
          </Tooltip>
          {bindings.length > 1 && (
            <Tooltip title='この表示フィールドを削除する'>
              <IconButton size='small' onClick={() => deleteRow(index)}>
                <DeleteIcon fontSize='small' fill='#0006' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
};

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton variant='rectangular' width={600} height={200} />}>
      <Rows />
    </Suspense>
  );
};

export default memo(Container);
