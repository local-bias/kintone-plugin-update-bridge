import { manager } from '@/lib/event-manager';
import { restorePluginConfig } from '@/lib/plugin';
import {
  getAllRecords,
  getAppId,
  getFormFields,
  getRecords,
  kintoneAPI,
  updateAllRecords,
  UpdateAllRecordsParams,
} from '@konomi-app/kintone-utilities';
import { convertFieldValue, getDynamicDstQuery } from './actions';
import { loadingOverlay } from '@/lib/loading';
import { GUEST_SPACE_ID } from '@/lib/global';

const events: kintoneAPI.js.EventType[] = [
  'app.record.create.submit.success',
  'app.record.edit.submit.success',
  'app.record.index.edit.submit.success',
];

manager.add(events, async (event) => {
  try {
    loadingOverlay.label = `紐づく他のアプリを更新しています`;
    loadingOverlay.show();
    const config = restorePluginConfig();

    const currentRecord = event.record;
    const currentRecordId = currentRecord.$id.value as string;

    for (const condition of config.conditions) {
      try {
        const {
          srcKeyFieldCode,
          dstAppId,
          dstSpaceId,
          isDstAppGuestSpace,
          dstKeyFieldCode,
          dstQuery,
          bindings,
        } = condition;
        const dynamicQuery = `$id = ${currentRecordId}`;

        const srcQuery = condition.srcQuery
          ? `${condition.srcQuery} and ${dynamicQuery}`
          : dynamicQuery;

        const { records: srcRecords } = await getRecords({
          app: getAppId()!,
          query: srcQuery,
          guestSpaceId: GUEST_SPACE_ID,
          debug: process.env.NODE_ENV === 'development',
        });

        if (srcRecords.length === 0) {
          continue;
        }
        const srcRecord = srcRecords[0];
        const srcKeyField = srcRecord[srcKeyFieldCode];

        const { properties: dstProperties } = await getFormFields({
          app: dstAppId,
          guestSpaceId: isDstAppGuestSpace ? (dstSpaceId ?? undefined) : undefined,
          debug: process.env.NODE_ENV === 'development',
        });
        const dstKeyFieldProperty = Object.values(dstProperties).find(
          (property) => property.code === dstKeyFieldCode
        );
        if (!dstKeyFieldProperty) {
          console.error(
            `アプリID: ${dstAppId}にフィールドコード: ${dstKeyFieldCode} が存在しないため、他アプリ更新が中断されました`
          );
          continue;
        }

        const dynamicDstQuery = getDynamicDstQuery({ srcKeyField, dstKeyFieldProperty });

        const dstRecords = await getAllRecords({
          app: dstAppId,
          guestSpaceId: isDstAppGuestSpace ? (dstSpaceId ?? undefined) : undefined,
          query: dstQuery ? `${dstQuery} and ${dynamicDstQuery}` : dynamicDstQuery,
          fields: ['$id', ...bindings.map((binding) => binding.dstFieldCode)],
          debug: process.env.NODE_ENV === 'development',
        });

        const dstNewRecords: UpdateAllRecordsParams['records'] = dstRecords.map((record) => {
          const newRecord: UpdateAllRecordsParams['records'][number] = {
            id: record.$id.value as string,
            record: {},
          };
          for (const binding of bindings) {
            const dstProperty = dstProperties[binding.dstFieldCode];
            if (!dstProperty) {
              console.warn(
                `フィールドコード: ${binding.dstFieldCode} が存在しないため、スキップされました`
              );
              continue;
            }
            const srcField = srcRecord[binding.srcFieldCode];
            newRecord.record[binding.dstFieldCode] = {
              value: convertFieldValue({
                srcField,
                dstPropertyType: dstProperty.type,
              }),
            };
          }
          return newRecord;
        });

        await updateAllRecords({
          app: dstAppId,
          guestSpaceId: isDstAppGuestSpace ? (dstSpaceId ?? undefined) : undefined,
          records: dstNewRecords,
          debug: process.env.NODE_ENV === 'development',
        });
      } catch (error) {
        console.error(error);
      }
    }
  } finally {
    loadingOverlay.hide();
  }

  return event;
});
