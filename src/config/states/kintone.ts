import {
  getFormFields,
  kintoneAPI,
  getAppId,
  getAllApps,
  withSpaceIdFallback,
  getSpace,
} from '@konomi-app/kintone-utilities';
import { selector, selectorFamily } from 'recoil';
import { GUEST_SPACE_ID } from '@/lib/global';

const PREFIX = 'kintone';

export const kintoneAppsState = selector({
  key: `${PREFIX}kintoneAppsState`,
  get: async ({ get }) => {
    const apps = await getAllApps({
      guestSpaceId: GUEST_SPACE_ID,
      debug: process?.env?.NODE_ENV === 'development',
    });
    return apps;
  },
});

export const kintoneSpacesState = selector<kintoneAPI.rest.space.GetSpaceResponse[]>({
  key: `${PREFIX}kintoneSpacesState`,
  get: async ({ get }) => {
    const apps = get(kintoneAppsState);
    const spaceIds = [
      ...new Set(apps.filter((app) => app.spaceId).map<string>((app) => app.spaceId as string)),
    ];

    let spaces: kintoneAPI.rest.space.GetSpaceResponse[] = [];
    for (const id of spaceIds) {
      const space = await withSpaceIdFallback({
        spaceId: id,
        func: getSpace,
        funcParams: { id, debug: true },
      });
      spaces.push(space);
    }

    return spaces;
  },
});

export const appFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}appFieldsState`,
  get: async () => {
    const app = getAppId()!;
    const { properties } = await getFormFields({
      app,
      preview: true,
      guestSpaceId: GUEST_SPACE_ID,
      debug: process.env.NODE_ENV === 'development',
    });

    const values = Object.values(properties);

    return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});

export const dstAppPropertiesState = selectorFamily<kintoneAPI.FieldProperty[], string>({
  key: `${PREFIX}dstAppPropertiesState`,
  get:
    (app) =>
    async ({ get }) => {
      if (!app) {
        throw new Error('アプリのフィールド情報が取得できませんでした');
      }

      const { properties } = await getFormFields({
        app,
        preview: true,
        guestSpaceId: GUEST_SPACE_ID,
        debug: process?.env?.NODE_ENV === 'development',
      });

      return Object.values(properties).sort((a, b) => a.label.localeCompare(b.label, 'ja'));
    },
});

export const flatFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}flatFieldsState`,
  get: async ({ get }) => {
    const fields = get(appFieldsState);
    return fields.flatMap((field) => {
      if (field.type === 'SUBTABLE') {
        return Object.values(field.fields);
      }
      return field;
    });
  },
});
