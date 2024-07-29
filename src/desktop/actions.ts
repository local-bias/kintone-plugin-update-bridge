import { getFieldValueAsString, kintoneAPI } from '@konomi-app/kintone-utilities';

export const getDynamicDstQuery = (params: {
  srcKeyField: kintoneAPI.Field;
  dstKeyFieldProperty: kintoneAPI.FieldProperty;
}): string => {
  const { srcKeyField, dstKeyFieldProperty } = params;

  switch (dstKeyFieldProperty.type) {
    // `in`, `like`が使用できないフィールドタイプ
    case 'CREATED_TIME':
    case 'UPDATED_TIME':
    case 'DATE':
    case 'DATETIME':
    case 'TIME':
      const srcValue = getFieldValueAsString(srcKeyField);
      return `${dstKeyFieldProperty.code} = "${srcValue}"`;

    // `in`が使用できるフィールドタイプ
    case 'RECORD_NUMBER':
    case 'CREATOR':
    case 'MODIFIER':
    case 'SINGLE_LINE_TEXT':
    case 'LINK':
    case 'NUMBER':
    case 'CALC':
    case 'RADIO_BUTTON':
    case 'CHECK_BOX':
    case 'DROP_DOWN':
    case 'MULTI_SELECT':
    case 'USER_SELECT':
    case 'GROUP_SELECT':
    case 'ORGANIZATION_SELECT':
    case 'STATUS':
      if (srcKeyField.type === 'RADIO_BUTTON') {
        return `${dstKeyFieldProperty.code} = "${srcKeyField.value}"`;
      } else if (srcKeyField.type === 'CHECK_BOX') {
        const values = srcKeyField.value.map((value) => `"${value}"`).join(',');
        return `${dstKeyFieldProperty.code} in (${values})`;
      } else {
        const value = getFieldValueAsString(srcKeyField);
        return `${dstKeyFieldProperty.code} in ("${value}")`;
      }

    // `like`のみ使用できるフィールドタイプ
    case 'MULTI_LINE_TEXT':
    case 'RICH_TEXT':
    case 'FILE':
      const value = getFieldValueAsString(srcKeyField);
      return `${dstKeyFieldProperty.code} like "${value}"`;
    case 'CATEGORY':
    case 'GROUP':
    case 'REFERENCE_TABLE':
    case 'SUBTABLE':
    default:
      throw new Error(
        `${dstKeyFieldProperty.label}はサポートされていないフィールドタイプです。プラグインの設定を見直してください。`
      );
  }
};

export const convertFieldValue = (params: {
  srcField: kintoneAPI.Field;
  dstPropertyType: kintoneAPI.FieldPropertyType;
}): kintoneAPI.Field['value'] => {
  const { srcField, dstPropertyType } = params;
  if (srcField.type === dstPropertyType) {
    return srcField.value;
  }

  switch (dstPropertyType) {
    // string
    case 'SINGLE_LINE_TEXT':
    case 'MULTI_LINE_TEXT':
    case 'RICH_TEXT':
    case 'LINK':
    case 'NUMBER':
    case 'CALC':
    case 'RADIO_BUTTON':
    case 'DROP_DOWN':
    case 'STATUS':
    case 'DATE':
    case 'DATETIME':
    case 'TIME':
    case 'CREATED_TIME':
    case 'UPDATED_TIME':
      return getFieldValueAsString(srcField);
    // string[]
    case 'CHECK_BOX':
    case 'MULTI_SELECT':
      switch (srcField.type) {
        case 'CHECK_BOX':
        case 'MULTI_SELECT':
          return srcField.value;
        default:
          return [getFieldValueAsString(srcField)];
      }
    // { code: string, name: string }
    case 'USER_SELECT':
    case 'GROUP_SELECT':
    case 'ORGANIZATION_SELECT':
      switch (srcField.type) {
        case 'USER_SELECT':
        case 'GROUP_SELECT':
        case 'ORGANIZATION_SELECT':
          return srcField.value;
        case 'CHECK_BOX':
        case 'MULTI_SELECT':
          return srcField.value.map((value) => ({ code: value, name: '' }));
        default:
          return [{ code: getFieldValueAsString(srcField), name: '' }];
      }

    case 'CREATOR':
    case 'MODIFIER':
      return { code: getFieldValueAsString(srcField), name: '' };

    case 'FILE':
    case 'CATEGORY':
    case 'GROUP':
    case 'REFERENCE_TABLE':
    case 'SUBTABLE':
    case 'RECORD_NUMBER':
    case 'STATUS_ASSIGNEE':
    default:
      return null;
  }
};
