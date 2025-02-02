import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Select, Space } from 'antd';
import get from 'lodash/get';

import StackLayout from '../../layout/StackLayout';
import { RangeOperators } from '../../data/sqon/operators';
import BetweenOperatorIcon from './icons/BetweenOperatorIcon';
import LessThanOperatorIcon from './icons/LessThanOperatorIcon';
import LessThanOrEqualOperatorIcon from './icons/LessThanOrEqualOperatorIcon';
import GreaterThanOperatorIcon from './icons/GreaterThanOperatorIcon';
import GreaterThanOrEqualOperatorIcon from './icons/GreaterThanOrEqualOperatorIcon';
import { isNull } from 'lodash';
import {
    IDictionary,
    IFilter,
    IFilterGroup,
    IFilterRange,
    IFilterRangeConfig,
    IRangeOperatorConfig,
    onChangeType,
} from './types';

import styles from '@ferlab/style/components/filters/RangeFilter.module.scss';

const { Option } = Select;

export type RangeFilterProps = {
    filters: IFilter<IFilterRange>[];
    filterGroup: IFilterGroup<IFilterRangeConfig>;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    dictionary?: IDictionary | Record<string, never>;
};

const DEFAULT_STEP = 1;

const getDefaultOperatorList = (
    dictionary: IDictionary | undefined,
    defaultOperator: RangeOperators,
): IRangeOperatorConfig[] => {
    const defaultOperatorList = [
        {
            operator: RangeOperators['<'],
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <LessThanOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.lessThan', 'Less than')}
                    </span>
                </span>
            ),
            disableMin: true,
        },
        {
            operator: RangeOperators['<='],
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <LessThanOrEqualOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.lessThanOfEqual', 'Less than or equal')}
                    </span>
                </span>
            ),
            disableMin: true,
        },
        {
            operator: RangeOperators['>'],
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <GreaterThanOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.greaterThan', 'Greater than')}
                    </span>
                </span>
            ),
            disableMax: true,
        },
        {
            operator: RangeOperators['>='],
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <GreaterThanOrEqualOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.greaterThanOrEqual', 'Greater than or equal')}
                    </span>
                </span>
            ),
            disableMax: true,
        },
        {
            operator: RangeOperators.between,
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <BetweenOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.between', 'Between (inclusive)')}
                    </span>
                </span>
            ),
        },
    ];

    return defaultOperator
        ? defaultOperatorList.sort((a, b) =>
              a.operator == defaultOperator ? -1 : b.operator == defaultOperator ? 1 : 0,
          )
        : defaultOperatorList;
};

const RangeFilter = ({ dictionary, filterGroup, filters, onChange, selectedFilters }: RangeFilterProps) => {
    const { config: range } = filterGroup;
    const currentFilter: IFilter<IFilterRange> = filters[0];
    const maxPossibleValue = filterGroup.config?.max || 0;
    const minPossibleValue = filterGroup.config?.min || 0;
    const rangeTypes = filterGroup.config?.rangeTypes;
    const defaultOperators = getDefaultOperatorList(dictionary, filterGroup.config?.defaultOperator!);
    const operatorsList = range?.operators?.length ? range?.operators : defaultOperators;
    const selectedMax = get(selectedFilters, '[0].data.max', undefined);
    const selectedMin = get(selectedFilters, '[0].data.min', undefined);
    const selectedOperator = get(selectedFilters, '[0].data.operator', operatorsList[0].operator);
    const selectedRangeType = get(
        selectedFilters,
        '[0].data.rangeType',
        rangeTypes?.length ? rangeTypes[0].key : undefined,
    );
    const defaultStateValue = {
        max: selectedMax,
        min: selectedMin,
        operator: selectedOperator,
        rangeType: selectedRangeType,
    };
    const [rangeFilter, setRangeFilter] = useState<IFilterRange>(defaultStateValue);
    const [userCleared, setUserCleared] = useState(false);
    const { max, min, operator, rangeType } = rangeFilter;
    const currentOperator = operatorsList.find((value) => value.operator == operator);
    const isMaxDisabled = currentOperator?.disableMax;
    const isMinDisabled = currentOperator?.disableMin;

    useEffect(() => {
        setRangeFilter(defaultStateValue);
    }, [selectedFilters]);

    const hasChanged = () =>
        validateSelectedValues() &&
        (selectedMax != rangeFilter.max ||
            selectedMin != rangeFilter.min ||
            selectedOperator != rangeFilter.operator ||
            selectedRangeType != rangeFilter.rangeType);

    const validateSelectedValues = () => {
        if (!currentOperator?.disableMax && !currentOperator?.disableMin) {
            return rangeFilter.max != undefined && rangeFilter.min != undefined;
        }

        if (currentOperator.disableMax) {
            return rangeFilter.min != undefined;
        }

        if (currentOperator.disableMin) {
            return rangeFilter.max != undefined;
        }

        return true;
    };

    const onRangeTypeChanged = (value: string) => {
        setRangeFilter((prevState) => ({
            ...prevState,
            rangeType: value,
        }));
    };

    const onOperatorChanged = (value: string) => {
        setRangeFilter((prevState) => ({
            ...prevState,
            operator: value,
        }));
    };

    const onMinChanged = (value: string | number | undefined) => {
        let min = typeof value === 'string' ? parseFloat(value) : value;
        setRangeFilter((prevState) => ({ ...prevState, min }));
    };

    const onMaxChanged = (value: string | number | undefined) => {
        let max = typeof value === 'string' ? parseFloat(value) : value;
        setRangeFilter((prevState) => ({ ...prevState, max }));
    };

    if (!range) {
        return null;
    }

    const dotField = filterGroup.field;
    const buttonActionDisabled = typeof min !== 'number' && typeof max !== 'number';

    return (
        <StackLayout className={styles.fuiRfContainer} vertical>
            {isNull(filterGroup.config?.min) && isNull(filterGroup.config?.min) ? (
                <Space direction="vertical" className={styles.noResultsText}>
                    {get(dictionary, 'messages.errorNoData', 'No values found for this request')}
                </Space>
            ) : (
                <>
                    <StackLayout vertical className={styles.fuiRfRangeOperator}>
                        <span className={styles.fuiRfSectionTitle}>{get(dictionary, 'range.is', 'Is')}</span>
                        <Select
                            className={styles.fuiRfRangeOperatorSelect}
                            onChange={onOperatorChanged}
                            value={operator}
                        >
                            {(range.operators || defaultOperators).map((opConfig) => (
                                <Option key={opConfig.operator} value={opConfig.operator}>
                                    {opConfig.name}
                                </Option>
                            ))}
                        </Select>
                    </StackLayout>

                    <StackLayout className={styles.fuiRfGroupedValues} horizontal>
                        <StackLayout vertical className={styles.fuiRfRangeInputContainer}>
                            <span className={styles.fuiRfSectionTitle}>Min.</span>
                            <InputNumber
                                disabled={isMinDisabled}
                                step={range.step || DEFAULT_STEP}
                                className={styles.rangeInput}
                                id={`from-${dotField}`}
                                key={`from-${dotField}`}
                                max={range.max}
                                min={range.min}
                                onChange={onMinChanged}
                                placeholder={range.min?.toString()}
                                title={get(dictionary, 'range.min', 'min')}
                                type="number"
                                value={isMinDisabled ? range.min : min}
                            />
                        </StackLayout>
                        <StackLayout vertical className={styles.fuiRfRangeInputContainer}>
                            <span className={styles.fuiRfSectionTitle}>Max.</span>
                            <InputNumber
                                disabled={isMaxDisabled}
                                step={range.step || DEFAULT_STEP}
                                className={styles.rangeInput}
                                id={`to-${dotField}`}
                                key={`to-${dotField}`}
                                max={range.max}
                                min={range.min}
                                onChange={onMaxChanged}
                                placeholder={range.max?.toString()}
                                title={get(dictionary, 'range.max', 'max')}
                                type="number"
                                value={isMaxDisabled ? range.max : max}
                            />
                        </StackLayout>
                    </StackLayout>

                    {range?.rangeTypes?.length! > 0 && (
                        <StackLayout vertical className={styles.fuiRfRangeTarget}>
                            <span className={styles.fuiRfSectionTitle}>{get(dictionary, 'range.unit', 'Unit')}</span>
                            <Select
                                className={styles.fuiRfRangeTargetSelect}
                                onChange={onRangeTypeChanged}
                                value={rangeType}
                            >
                                {range?.rangeTypes!.map((u) => (
                                    <Option key={u.key} value={u.key}>
                                        {u.name}
                                    </Option>
                                ))}
                            </Select>
                        </StackLayout>
                    )}
                </>
            )}

            <StackLayout className={styles.fuiRfActions} horizontal>
                <Button
                    className={styles.fuiRfActionsClear}
                    size="small"
                    disabled={buttonActionDisabled}
                    onClick={() => {
                        setRangeFilter((prevState) => ({
                            ...prevState,
                            operator: operatorsList[0].operator,
                            min: undefined,
                            max: undefined,
                        }));
                        setUserCleared(true);
                    }}
                    type="text"
                >
                    {get(dictionary, 'actions.none', 'Clear')}
                </Button>
                <Button
                    size="small"
                    type="primary"
                    className={styles.fuiRfActionsApply}
                    disabled={userCleared ? !userCleared : !hasChanged()}
                    onClick={() => {
                        onChange(filterGroup, [{ ...currentFilter, data: rangeFilter }]);
                        setUserCleared(false);
                    }}
                >
                    <span data-key="apply">{get(dictionary, 'actions.apply', 'Apply')}</span>
                </Button>
            </StackLayout>
        </StackLayout>
    );
};

export default RangeFilter;
