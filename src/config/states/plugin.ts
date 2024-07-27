import { DefaultValue, RecoilState, atom, selector, selectorFamily } from 'recoil';
import { restorePluginConfig } from '@/lib/plugin';
import { nanoid } from 'nanoid';
import { produce } from 'immer';

const PREFIX = 'plugin';

export const storageState = atom<Plugin.Config>({
  key: `${PREFIX}storageState`,
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const selectedConditionIdState = atom<string>({
  key: `${PREFIX}selectedConditionIdState`,
  default: selector<string>({
    key: `${PREFIX}selectedConditionIdState/default`,
    get: ({ get }) => {
      const storage = get(storageState);
      return storage.conditions[0].id;
    },
  }),
});

export const selectedConditionState = selector<Plugin.Condition>({
  key: `${PREFIX}selectedConditionState`,
  get: ({ get }) => {
    const storage = get(storageState);
    const selectedConditionId = get(selectedConditionIdState);
    return (
      storage.conditions.find((condition) => condition.id === selectedConditionId) ??
      storage.conditions[0]
    );
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(storageState, (current) =>
      produce(current, (draft) => {
        const conditionIndex = draft.conditions.findIndex(
          (condition) => condition.id === newValue.id
        );
        if (conditionIndex === -1) {
          return;
        }
        draft.conditions[conditionIndex] = newValue;
      })
    );
  },
});

export const conditionsState = selector<Plugin.Condition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return (storage?.conditions ?? []).map((condition) => {
      if ('id' in condition) {
        return condition;
      }
      // @ts-expect-error 定義通りであればidは必ず上書きされるが、そうでなかった場合を考慮
      return { id: nanoid(), ...condition };
    });
  },
});

export const conditionsLengthState = selector<number>({
  key: `${PREFIX}conditionsLengthState`,
  get: ({ get }) => {
    const conditions = get(conditionsState);
    return conditions.length;
  },
});

const conditionPropertyState = selectorFamily<
  Plugin.Condition[keyof Plugin.Condition],
  keyof Plugin.Condition
>({
  key: `${PREFIX}conditionPropertyState`,
  get:
    (key) =>
    ({ get }) => {
      return get(selectedConditionState)[key];
    },
  set:
    (key) =>
    ({ set }, newValue) => {
      if (newValue instanceof DefaultValue) {
        return;
      }
      set(selectedConditionState, (current) =>
        produce(current, (draft) => {
          // @ts-expect-error
          draft[key] = newValue;
        })
      );
    },
});

export const getConditionPropertyState = <T extends keyof Plugin.Condition>(property: T) =>
  conditionPropertyState(property) as unknown as RecoilState<Plugin.Condition[T]>;
