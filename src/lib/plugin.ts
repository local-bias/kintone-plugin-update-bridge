import { restoreStorage } from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { PLUGIN_ID } from './global';
import { nanoid } from 'nanoid';

export const getNewBinding = (): Plugin.Binding => ({
  id: nanoid(),
  srcFieldCode: '',
  dstFieldCode: '',
});

export const getNewCondition = (): Plugin.Condition => ({
  id: nanoid(),
  dstAppId: '',
  dstSpaceId: null,
  isDstAppGuestSpace: false,
  srcKeyFieldCode: '',
  dstKeyFieldCode: '',
  bindings: [getNewBinding()],
  srcQuery: '',
  dstQuery: '',
  createIfNotExists: false,
});

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): Plugin.Config => ({
  version: 2,
  common: {
    showResult: false,
  },
  conditions: [getNewCondition()],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * 各バージョンは次のバージョンへの変換処理を持ち、再帰的なアクセスによって最新のバージョンに変換されます
 *
 * @param anyConfig 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (anyConfig: Plugin.AnyConfig): Plugin.Config => {
  const { version } = anyConfig;
  switch (version) {
    case undefined:
    case 1:
      return migrateConfig({
        version: 2,
        common: {
          showResult: false,
        },
        conditions: anyConfig.conditions.map((condition) => ({
          ...condition,
          createIfNotExists: false,
          showResult: false,
        })),
      });
    case 2:
    default:
      return anyConfig;
  }
};

/**
 * プラグインの設定情報を復元します
 */
export const restorePluginConfig = (): Plugin.Config => {
  const config = restoreStorage<Plugin.AnyConfig>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};

export const getUpdatedStorage = <T extends keyof Plugin.Condition>(
  storage: Plugin.Config,
  props: {
    conditionIndex: number;
    key: T;
    value: Plugin.Condition[T];
  }
) => {
  const { conditionIndex, key, value } = props;
  return produce(storage, (draft) => {
    draft.conditions[conditionIndex][key] = value;
  });
};

export const getConditionField = <T extends keyof Plugin.Condition>(
  storage: Plugin.Config,
  props: {
    conditionIndex: number;
    key: T;
    defaultValue: NonNullable<Plugin.Condition[T]>;
  }
): NonNullable<Plugin.Condition[T]> => {
  const { conditionIndex, key, defaultValue } = props;
  if (!storage.conditions[conditionIndex]) {
    return defaultValue;
  }
  return storage.conditions[conditionIndex][key] ?? defaultValue;
};
