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
  formData: FormKeys<T>[];
  addAction: (data: Omit<T, 'key'>) => Promise<void>;
  editAction: (key: string, data: Omit<T, 'key'>) => Promise<void>;
}

export interface FormKeys<T extends Omit<BaseData, 'key'> = Omit<BaseData, 'key'>> {
  key: keyof Omit<T, 'key' | 'content'> | keyof T['content'][Languages];
  inContent?: boolean;
  title: string;
  type: 'text' | 'textarea' | 'image' | 'file' ;
}
