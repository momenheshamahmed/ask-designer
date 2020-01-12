import {
  Languages,
} from "../../utils/translation";

export interface BaseData {
  key: string;
  content: Record<Languages, Record<string, any>>;
  [k: string]: any;
}

export interface Props<T extends BaseData = BaseData> {
  data: T[];
  tableData: TableKeys<T>[];
  deleteAction: (key: string) => Promise<void>;
  route: string;
}

export interface TableKeys<T extends Omit<BaseData, 'key'> = Omit<BaseData, 'key'>> {
  key: keyof T | keyof T['content'][Languages];
  inContent?: boolean;
  title: string;
}
