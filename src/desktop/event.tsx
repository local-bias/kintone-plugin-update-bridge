import { manager } from '@/lib/event-manager';
import { restorePluginConfig } from '@/lib/plugin';
import {
  addRecord,
  AddRecordParams,
  getAllApps,
  getAllRecords,
  getAppId,
  getFormFields,
  getRecords,
  kintoneAPI,
  updateAllRecords,
  UpdateAllRecordsParams,
} from '@konomi-app/kintone-utilities';
import { convertFieldValue, generateErrorLog, getDynamicDstQuery } from './actions';
import { loadingOverlay } from '@/lib/loading';
import { GUEST_SPACE_ID } from '@/lib/global';
import Swal from 'sweetalert2';
import { t } from '@/lib/i18n';

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

    const apps = await getAllApps();

    const logs: string[] = [];

    for (const condition of config.conditions) {
      let log = '';
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
        const app = apps.find((app) => app.appId === dstAppId);
        const appName = app ? app.name : `アプリID ${dstAppId}`;
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
          log = `対象レコードが存在しないため、更新をスキップしました`;
          logs.push(log);
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
          log = `${appName}: ${dstAppId}にフィールドコード: ${dstKeyFieldCode} が存在しないため、更新をスキップしました`;
          logs.push(log);
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

        if (dstRecords.length === 0) {
          if (condition.createIfNotExists) {
            const newRecord: AddRecordParams['record'] = {};
            for (const binding of bindings) {
              const dstProperty = dstProperties[binding.dstFieldCode];
              if (!dstProperty) {
                console.warn(
                  `更新先アプリのフィールド: ${binding.dstFieldCode} が存在しないため、スキップされました`
                );
                continue;
              }
              const srcField = srcRecord[binding.srcFieldCode];
              if (!srcField) {
                console.warn(
                  `このアプリのフィールド: ${binding.srcFieldCode} が存在しないため、スキップされました`
                );
                continue;
              }
              newRecord[binding.dstFieldCode] = {
                value: convertFieldValue({
                  srcField,
                  dstPropertyType: dstProperty.type,
                }),
              };
            }
            await addRecord({
              app: dstAppId,
              guestSpaceId: isDstAppGuestSpace ? (dstSpaceId ?? undefined) : undefined,
              record: newRecord,
              debug: process.env.NODE_ENV === 'development',
            });
            log = `${appName}: 対象レコードが存在しなかったため、新規作成しました`;
          } else {
            log = `${appName}: 対象レコードが存在しないため、データは更新されませんでした`;
          }
        } else {
          const dstNewRecords: UpdateAllRecordsParams['records'] = dstRecords.map((record) => {
            const newRecord: UpdateAllRecordsParams['records'][number] = {
              id: record.$id.value as string,
              record: {},
            };
            for (const binding of bindings) {
              const dstProperty = dstProperties[binding.dstFieldCode];
              if (!dstProperty) {
                console.warn(
                  `更新先アプリのフィールド: ${binding.dstFieldCode} が存在しないため、スキップされました`
                );
                continue;
              }
              const srcField = srcRecord[binding.srcFieldCode];
              if (!srcField) {
                console.warn(
                  `このアプリのフィールド: ${binding.srcFieldCode} が存在しないため、スキップされました`
                );
                continue;
              }
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
          log = `${appName}: 対象レコード${dstRecords.length}件を更新しました`;
        }
      } catch (error: any) {
        console.error(error);
        log = generateErrorLog(error);
      }
      logs.push(log);
    }
    if (config.common.showResult) {
      await Swal.fire({
        title: t('desktop.resultDialog.title'),
        html: `<div style="font-size:14px;text-align:left;">${logs.join('<br>')}</div>`,
        icon: 'info',
      });
    }
  } finally {
    loadingOverlay.hide();
  }

  return event;
});
