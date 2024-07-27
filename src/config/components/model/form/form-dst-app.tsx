import { Autocomplete, Skeleton, TextField } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { kintoneAppsState, kintoneSpacesState } from '../../../states/kintone';
import { getConditionPropertyState } from '@/config/states/plugin';

const dstAppIdState = getConditionPropertyState('dstAppId');

const Component: FC = () => {
  const allApps = useRecoilValue(kintoneAppsState);
  const dstAppId = useRecoilValue(dstAppIdState);

  const onAppChange = useRecoilCallback(
    ({ snapshot, set }) =>
      async (value: string) => {
        set(dstAppIdState, value);

        const allApps = await snapshot.getPromise(kintoneAppsState);
        const dstApp = allApps.find((app) => app.appId === value);
        if (!dstApp) {
          return;
        }

        const spaces = await snapshot.getPromise(kintoneSpacesState);
        const dstSpace = spaces.find((space) => space.id === dstApp.spaceId);
        if (!dstSpace) {
          return;
        }
        set(getConditionPropertyState('dstSpaceId'), dstSpace.id ?? null);
        set(getConditionPropertyState('isDstAppGuestSpace'), dstSpace.isGuest);
      },
    []
  );

  return (
    <Autocomplete
      value={allApps.find((app) => app.appId === dstAppId) ?? null}
      sx={{ width: '350px' }}
      options={allApps}
      isOptionEqualToValue={(option, v) => option.appId === v.appId}
      getOptionLabel={(app) => `${app.name}(id: ${app.appId})`}
      onChange={(_, app) => onAppChange(app?.appId ?? '')}
      renderInput={(params) => (
        <TextField {...params} label='対象アプリ' variant='outlined' color='primary' />
      )}
    />
  );
};

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton variant='rounded' width={350} height={56} />}>
      <Component />
    </Suspense>
  );
};

export default memo(Container);
