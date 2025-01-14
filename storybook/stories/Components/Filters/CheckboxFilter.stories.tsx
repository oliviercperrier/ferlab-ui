import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import CheckboxFilter, {TermFilterProps} from "@ferlab/ui/components/filters/CheckboxFilter";
import {
    IDictionary,
    IFilter,
    IFilterCount,
    IFilterGroup,
    onChangeType,
    VisualType
} from "@ferlab/ui/components/filters/types";
import {dictionaryFrench, filters, filtersWithBigCounts} from "./data";

export default {
  title: "@ferlab/Components/Filters/CheckboxFilter",
  component: CheckboxFilter,
    decorators: [(Story) =>
        <><div className={'story_container'} style={{display:'inline-grid', maxWidth: '260px'}}><Story/></div></>],
  argTypes: {
    className: {
      control: 'string',
    },
    children: {
      control: 'object',
    },
  },
} as Meta;

const TermFilterStory = ({title, maxShowing, filterGroup, onChange, ...props} : {
    title: string,
    maxShowing: number,
    filterGroup: IFilterGroup,
    onChange: onChangeType,
    hasSearchInput: boolean;
    filters: IFilter<IFilterCount>[];
    dictionary: IDictionary;
    props: Story<TermFilterProps>}) => (
  <>
    <h3>{title}</h3>
    <CheckboxFilter maxShowing={maxShowing} filterGroup={filterGroup} onChange={onChange} {...props} />
  </>
);

const filerGroup: IFilterGroup = {
    type: VisualType.Checkbox,
    field: 'this.field',
    title: 'title_filter_group'
}

const onChangeTypeStory: onChangeType = () => null

export const WithMore = TermFilterStory.bind({});
WithMore.args = {
    title: 'CheckboxFilter More',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: filters,
};

export const WithFew = TermFilterStory.bind({});
WithFew.args = {
    title: 'CheckboxFilter Few',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: filters.slice(0, 4),
};

export const WithNoData = TermFilterStory.bind({});
WithNoData.args = {
    title: 'CheckboxFilter No Data',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: [],
};

export const WithBigCount = TermFilterStory.bind({});
WithBigCount.args = {
    dictionary: dictionaryFrench,
    title: 'CheckboxFilter Big Count',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filtersWithBigCounts),
    hasSearchInput: true,
    filters: filtersWithBigCounts,
};

export const WithFrenchTranslation = TermFilterStory.bind({});
WithFrenchTranslation.args = {
    dictionary: dictionaryFrench,
    title: 'CheckboxFilter in French',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: filters,
};

export const WithFooter = TermFilterStory.bind({});
WithFooter.args = {
    dictionary: dictionaryFrench,
    title: 'CheckboxFilter in French',
    maxShowing: 6,
    filterGroup: {
      ...filerGroup,
      config: {
        nameMapping: {},
        withFooter: true
      }
    },
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: filters,
};
