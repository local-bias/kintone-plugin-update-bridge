import { IconButton, Skeleton, Tooltip } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { RecoilFieldSelect, useRecoilRow } from '@konomi-app/kintone-utilities-react';

import { appFieldsState } from '../../../states/kintone';
import { fieldsState } from '../../../states/plugin';

const Component: FC = () => {
  const { addRow, deleteRow, changeRow } = useRecoilRow({ state: fieldsState, getNewRow: () => '' });
  const selectedFields = useRecoilValue(fieldsState);

  return (
    <div className='flex flex-col gap-4'>
      {selectedFields.map((value, i) => (
        <div key={i} className='flex items-center gap-2'>
          <RecoilFieldSelect
            state={appFieldsState}
            onChange={(code) => changeRow(i, code)}
            fieldCode={value}
          />
          <Tooltip title='フィールドを追加する'>
            <IconButton size='small' onClick={() => addRow(i)}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {selectedFields.length > 1 && (
            <Tooltip title='このフィールドを削除する'>
              <IconButton size='small' onClick={() => deleteRow(i)}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
};

const Placeholder: FC = () => (
  <div className='flex flex-col gap-4'>
    {new Array(3).fill('').map((_, i) => (
      <div key={i} className='flex items-center gap-2'>
        <Skeleton variant='rounded' width={400} height={56} />
        <Skeleton variant='circular' width={24} height={24} />
        <Skeleton variant='circular' width={24} height={24} />
      </div>
    ))}
  </div>
);

const Container: FC = () => (
  <Suspense fallback={<Placeholder />}>
    <Component />
  </Suspense>
);

export default memo(Container);
