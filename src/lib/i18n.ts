import { createTheme } from '@mui/material';
import { LANGUAGE } from './global';
import { enUS, esES, jaJP, zhCN } from '@mui/material/locale';

export const ui = {
  ja: {
    'error.config.root':
      'プラグインのHTMLに、ルート要素が存在しません。プラグイン設定をレンダリングするためには、id="settings"の要素が必要です。',

    'config.condition.dstAppId.title': '更新するアプリ',
    'config.condition.dstAppId.description':
      'このアプリのレコードを更新したタイミングで、合わせて更新するアプリを選択してください',
    'config.condition.dstAppId.label': 'アプリ名(アプリID)',
    'config.condition.dstAppId.placeholder': 'アプリを選択',

    'config.condition.keyFieldCode.title': '更新のキーとなるフィールド',
    'config.condition.keyFieldCode.description':
      '更新した際に、このフィールドの値をキーとして、更新対象のレコードを特定します',
    'config.condition.keyFieldCode.src.label': 'このアプリのキーフィールド',
    'config.condition.keyFieldCode.dst.label': '更新先アプリのキーフィールド',

    'config.condition.bindings.title': '紐づけ設定',
    'config.condition.bindings.description':
      'キーが一致したレコードの、更新を行うフィールドを設定します',
    'config.condition.bindings.src.label': 'このアプリのフィールド',
    'config.condition.bindings.dst.label': '更新先アプリのフィールド',
    'config.condition.bindings.add': '紐づけ設定を追加',
    'config.condition.bindings.delete': '紐づけ設定を削除',

    'config.condition.srcQuery.title': '更新元のクエリ',
    'config.condition.srcQuery.description':
      '指定したクエリに一致するレコードが更新された場合のみ、更新を行います',
    'config.condition.srcQuery.label': 'クエリ',
    'config.condition.srcQuery.placeholder': '[フィールド名] = "値"',

    'config.condition.dstQuery.title': '更新先のクエリ',
    'config.condition.dstQuery.description': '指定したクエリに一致するレコードのみ、更新を行います',
    'config.condition.dstQuery.label': 'クエリ',
    'config.condition.dstQuery.placeholder': '[フィールド名] = "値"',

    'config.sidebar.tab.label': '設定',
    'config.button.save': '設定を保存',
    'config.button.return': 'プラグイン一覧へ戻る',
    'config.toast.save': '設定を保存しました',
    'config.toast.reset': '設定をリセットしました',
    'config.toast.import': '設定情報をインポートしました',
    'config.toast.export': 'プラグインの設定情報をエクスポートしました',
    'config.error.root':
      'プラグインのHTMLに、ルート要素が存在しません。プラグイン設定をレンダリングするためには、id="settings"の要素が必要です。',
    'config.error.import':
      '設定情報のインポートに失敗しました、ファイルに誤りがないか確認してください',
    'config.error.export':
      'プラグインの設定情報のエクスポートに失敗しました。プラグイン開発者にお問い合わせください。',
    'desktop.dialogtrigger.title': 'プラグインが有効です',
    'desktop.dialogtrigger.content': 'クリックするとイベントの詳細を確認できます',
    'desktop.dialog.title': 'プラグインの設定情報',
  },
  en: {
    'error.config.root':
      'The root element does not exist in the plugin HTML. To render the plugin configuration, an element with id="settings" is required.',
    'config.condition.dstAppId.title': 'Destination App',
    'config.condition.dstAppId.description':
      'Select the app to update when records in this app are updated.',
    'config.condition.dstAppId.label': 'App Name (App ID)',
    'config.condition.dstAppId.placeholder': 'Select an app',
    'config.condition.keyFieldCode.title': 'Key Field for Update',
    'config.condition.keyFieldCode.description':
      'Specify the field whose value will be used as the key to identify the records to update.',
    'config.condition.keyFieldCode.src.label': 'Key Field in This App',
    'config.condition.keyFieldCode.dst.label': 'Key Field in Destination App',
    'config.condition.bindings.title': 'Binding Settings',
    'config.condition.bindings.description':
      'Set the fields to update for records that match the key.',
    'config.condition.bindings.src.label': 'Fields in This App',
    'config.condition.bindings.dst.label': 'Fields in Destination App',
    'config.condition.bindings.add': 'Add Binding Setting',
    'config.condition.bindings.delete': 'Delete Binding Setting',
    'config.condition.srcQuery.title': 'Source Query',
    'config.condition.srcQuery.description': 'Only update records that match the specified query.',
    'config.condition.srcQuery.label': 'Query',
    'config.condition.srcQuery.placeholder': '[Field Name] = "Value"',
    'config.condition.dstQuery.title': 'Destination Query',
    'config.condition.dstQuery.description': 'Only update records that match the specified query.',
    'config.condition.dstQuery.label': 'Query',
    'config.condition.dstQuery.placeholder': '[Field Name] = "Value"',
    'config.sidebar.tab.label': 'Settings',
    'config.button.save': 'Save Settings',
    'config.button.return': 'Return to Plugin List',
    'config.toast.save': 'Settings saved',
    'config.toast.reset': 'Settings reset',
    'config.toast.import': 'Settings imported',
    'config.toast.export': 'Plugin settings exported',
    'config.error.root':
      'The root element does not exist in the plugin HTML. To render the plugin configuration, an element with id="settings" is required.',
    'config.error.import': 'Failed to import settings. Please check the file for errors.',
    'config.error.export': 'Failed to export plugin settings. Please contact the plugin developer.',
    'desktop.dialogtrigger.title': 'Plugin Enabled',
    'desktop.dialogtrigger.content': 'Click to view event details',
    'desktop.dialog.title': 'Plugin Configuration',
  },
  es: {
    'error.config.root':
      'El elemento raíz no existe en el HTML del complemento. Para renderizar la configuración del complemento, se requiere un elemento con id="settings".',
    'config.condition.dstAppId.title': 'Aplicación de destino',
    'config.condition.dstAppId.description':
      'Seleccione la aplicación que se actualizará cuando se actualicen los registros en esta aplicación.',
    'config.condition.dstAppId.label': 'Nombre de la aplicación (ID de la aplicación)',
    'config.condition.dstAppId.placeholder': 'Seleccionar una aplicación',
    'config.condition.keyFieldCode.title': 'Campo clave para la actualización',
    'config.condition.keyFieldCode.description':
      'Especifique el campo cuyo valor se utilizará como clave para identificar los registros que se actualizarán.',
    'config.condition.keyFieldCode.src.label': 'Campo clave en esta aplicación',
    'config.condition.keyFieldCode.dst.label': 'Campo clave en la aplicación de destino',
    'config.condition.bindings.title': 'Configuración de vinculación',
    'config.condition.bindings.description':
      'Establezca los campos para actualizar los registros que coincidan con la clave.',
    'config.condition.bindings.src.label': 'Campos en esta aplicación',
    'config.condition.bindings.dst.label': 'Campos en la aplicación de destino',
    'config.condition.bindings.add': 'Agregar configuración de vinculación',
    'config.condition.bindings.delete': 'Eliminar configuración de vinculación',
    'config.condition.srcQuery.title': 'Consulta de origen',
    'config.condition.srcQuery.description':
      'Solo actualizar registros que coincidan con la consulta especificada.',
    'config.condition.srcQuery.label': 'Consulta',
    'config.condition.srcQuery.placeholder': '[Nombre del campo] = "Valor"',
    'config.condition.dstQuery.title': 'Consulta de destino',
    'config.condition.dstQuery.description':
      'Solo actualizar registros que coincidan con la consulta especificada.',
    'config.condition.dstQuery.label': 'Consulta',
    'config.condition.dstQuery.placeholder': '[Nombre del campo] = "Valor"',
    'config.sidebar.tab.label': 'Configuración',
    'config.button.save': 'Guardar configuración',
    'config.button.return': 'Volver a la lista de complementos',
    'config.toast.save': 'Configuración guardada',
    'config.toast.reset': 'Configuración restablecida',
    'config.toast.import': 'Configuración importada',
    'config.toast.export': 'Configuración del complemento exportada',
    'config.error.root':
      'El elemento raíz no existe en el HTML del complemento. Para renderizar la configuración del complemento, se requiere un elemento con id="settings".',
    'config.error.import':
      'Error al importar la configuración. Por favor, verifique el archivo en busca de errores.',
    'config.error.export':
      'Error al exportar la configuración del complemento. Por favor, contacte al desarrollador del complemento.',
    'desktop.dialogtrigger.title': 'Complemento habilitado',
    'desktop.dialogtrigger.content': 'Haz clic para ver los detalles del evento',
    'desktop.dialog.title': 'Configuración del complemento',
  },
  zh: {
    'error.config.root': '插件HTML中不存在根元素。要渲染插件配置，需要一个id="settings"的元素。',
    'config.condition.dstAppId.title': '目标应用',
    'config.condition.dstAppId.description': '选择在更新此应用的记录时要更新的应用。',
    'config.condition.dstAppId.label': '应用名称（应用ID）',
    'config.condition.dstAppId.placeholder': '选择一个应用',
    'config.condition.keyFieldCode.title': '更新的关键字段',
    'config.condition.keyFieldCode.description': '指定用作标识要更新的记录的键的字段的值。',
    'config.condition.keyFieldCode.src.label': '此应用中的关键字段',
    'config.condition.keyFieldCode.dst.label': '目标应用中的关键字段',
    'config.condition.bindings.title': '绑定设置',
    'config.condition.bindings.description': '设置与键匹配的记录的要更新的字段。',
    'config.condition.bindings.src.label': '此应用中的字段',
    'config.condition.bindings.dst.label': '目标应用中的字段',
    'config.condition.bindings.add': '添加绑定设置',
    'config.condition.bindings.delete': '删除绑定设置',
    'config.condition.srcQuery.title': '源查询',
    'config.condition.srcQuery.description': '仅更新与指定查询匹配的记录。',
    'config.condition.srcQuery.label': '查询',
    'config.condition.srcQuery.placeholder': '[字段名] = "值"',
    'config.condition.dstQuery.title': '目标查询',
    'config.condition.dstQuery.description': '仅更新与指定查询匹配的记录。',
    'config.condition.dstQuery.label': '查询',
    'config.condition.dstQuery.placeholder': '[字段名] = "值"',
    'config.sidebar.tab.label': '设置',
    'config.button.save': '保存设置',
    'config.button.return': '返回插件列表',
    'config.toast.save': '设置已保存',
    'config.toast.reset': '设置已重置',
    'config.toast.import': '已导入设置',
    'config.toast.export': '已导出插件设置',
    'config.error.root': '插件HTML中不存在根元素。要渲染插件配置，需要一个id="settings"的元素。',
    'config.error.import': '导入设置失败。请检查文件是否有错误。',
    'config.error.export': '导出插件设置失败。请联系插件开发者。',
    'desktop.dialogtrigger.title': '插件已启用',
    'desktop.dialogtrigger.content': '单击以查看事件详细信息',
    'desktop.dialog.title': '插件配置',
  },
} as const;

export type Language = keyof typeof ui;

export const defaultLang = 'ja' satisfies Language;

/**
 * 指定された言語に対応する翻訳関数を返します。
 * @param lang - 言語のキー
 * @returns 指定された言語に対応する翻訳関数
 */
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    /* eslint @typescript-eslint/ban-ts-comment: 0 */
    // @ts-ignore デフォルト言語以外の設定が不十分な場合は、デフォルト言語の設定を使用します
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export const t = useTranslations(LANGUAGE as Language);

export const getMUITheme = () => {
  return createTheme(
    {},
    LANGUAGE === 'en' ? enUS : LANGUAGE === 'zh' ? zhCN : LANGUAGE === 'es' ? esES : jaJP
  );
};
