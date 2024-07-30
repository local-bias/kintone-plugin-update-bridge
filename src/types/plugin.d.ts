declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV2;
  type Binding = Config['conditions'][number]['bindings'][number];

  /** 🔌 プラグインの共通設定 */
  type Common = Config['common'];

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1 | ConfigV2;

  type ConfigV2 = {
    version: 2;
    common: {
      /** 更新結果を表示するかどうか */
      showResult: boolean;
    };
    conditions: (ConfigV1['conditions'][number] & {
      /** 更新先のアプリにレコードが存在しない場合は作成するかどうか. `true`の場合は作成 */
      createIfNotExists: boolean;
    })[];
  };

  type ConfigV1 = {
    version: 1;
    conditions: {
      id: string;
      /** 更新先のアプリID */
      dstAppId: string;
      /** 更新先のスペースID */
      dstSpaceId: string | null;
      /** 更新先のアプリがゲストスペースであれば`true` */
      isDstAppGuestSpace: boolean;
      /** 更新元アプリのキーとなるフィールド */
      srcKeyFieldCode: string;
      /** 更新先アプリのキーとなるフィールド */
      dstKeyFieldCode: string;
      /** 紐づけ設定 */
      bindings: {
        /** 設定を特定するID */
        id: string;
        /** 更新元フィールド */
        srcFieldCode: string;
        /** 更新先フィールド */
        dstFieldCode: string;
      }[];
      /** 更新元のレコードを特定するクエリ */
      srcQuery: string;
      /** キーとなるフィールドに加え、更新先のレコードを特定するクエリ */
      dstQuery: string;
    }[];
  };
}
