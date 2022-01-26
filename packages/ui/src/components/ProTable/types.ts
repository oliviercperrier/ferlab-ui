import { TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React from 'react';

export interface IProTableDictionary {
    itemCount?: {
        noResults: React.ReactNode;
        results: React.ReactNode;
        of: React.ReactNode;
    };
}

export interface ProColumnType<T = any> extends ColumnType<T> {
    key: string;
    defaultHidden?: boolean;
}

export type TProTableProps<RecordType> = Omit<TableProps<RecordType>, 'columns'> & {
    tableId: string;
    headerConfig: THeaderConfig;
    wrapperClassName?: string;
    columns: ProColumnType<RecordType>[];
    initialColumnState?: TColumnStates;
    dictionary?: IProTableDictionary;
};

export type THeaderConfig = {
    marginBtm?: number;
    extra?: React.ReactNode[];
    columnSetting?: boolean;
    onColumnStateChange?: (columns: TColumnStates) => void;
    itemCount: {
        pageIndex: number;
        pageSize: number;
        total: number;
    };
};

export type TColumnStates = {
    index: number;
    key: string;
    visible: boolean;
}[];

export type TColumnSettingChangeCb = <RecordType>(columns: ProColumnType<RecordType>) => void;