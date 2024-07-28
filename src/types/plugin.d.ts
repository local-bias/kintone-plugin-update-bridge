declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV1;
  type Binding = Config['conditions'][number]['bindings'][number];

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1; // | ConfigV2 | ...;

  type ConfigV1 = {
    version: 1;
    conditions: {
      id: string;
      dstAppId: string;
      dstSpaceId: string | null;
      isDstAppGuestSpace: boolean;
      srcKeyFieldCode: string;
      dstKeyFieldCode: string;
      bindings: {
        id: string;
        srcFieldCode: string;
        dstFieldCode: string;
      }[];
      srcQuery: string;
      dstQuery: string;
    }[];
  };
}
