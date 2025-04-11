import React from 'react';
import { Input, Slider, Checkbox, Button, Divider } from 'antd';
import {
  CloseOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons';

type FilterSidebarProps = {
  searchTerm: string;
  priceRange: [number, number];
  selectedGenres: string[];
  showFeatured: boolean;
  showDiscount: boolean;
  bookGenre: string[];
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceChange: (value: number[]) => void;
  onMinPriceInput: (value: string) => void;
  onMaxPriceInput: (value: string) => void;
  onGenreChange: (checkedValues: string[]) => void;
  onFeaturedChange: (checked: boolean) => void;
  onDiscountChange: (checked: boolean) => void;
  onReset: () => void;
};

const FilterSidebar = ({
  searchTerm,
  priceRange,
  selectedGenres,
  showFeatured,
  showDiscount,
  bookGenre,
  onSearch,
  onPriceChange,
  onMinPriceInput,
  onMaxPriceInput,
  onGenreChange,
  onFeaturedChange,
  onDiscountChange,
  onReset,
}: FilterSidebarProps) => {
  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-semibold'>
          <FilterOutlined className='!mr-2' /> Filters
        </h3>
        <Button
          type='default'
          size='small'
          className='!text-red-400 hover:!text-red-500'
          onClick={onReset}
          icon={<CloseOutlined />}
        >
          Reset
        </Button>
      </div>

      <Divider className='!my-4' />

      <div className='mb-6'>
        <h4 className='mb-2 font-medium'>Search</h4>
        <Input
          placeholder='Search by title, author...'
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={onSearch}
          allowClear
        />
      </div>

      <div className='mb-6'>
        <h4 className='mb-2 font-medium'>Price Range</h4>
        <Slider
          range
          min={0}
          max={10000}
          value={priceRange}
          onChange={onPriceChange}
        />
        <div className='flex justify-between items-center mt-2'>
          <Input
            prefix='$'
            value={priceRange[0]}
            onChange={(e) => onMinPriceInput(e.target.value)}
            style={{ width: '45%' }}
            size='small'
          />
          <span className='mx-2'>-</span>
          <Input
            prefix='$'
            value={priceRange[1]}
            onChange={(e) => onMaxPriceInput(e.target.value)}
            style={{ width: '45%' }}
            size='small'
          />
        </div>
      </div>

      {/* Genre Filter */}
      <div className='mb-6'>
        <h4 className='mb-2 font-medium'>Genre</h4>
        <Checkbox.Group
          options={bookGenre}
          value={selectedGenres}
          onChange={onGenreChange}
          className='flex flex-col gap-2'
        />
      </div>

      <div className='mb-6'>
        <h4 className='mb-2 font-medium'>Special Offers</h4>
        <div className='flex flex-col gap-2'>
          <Checkbox
            checked={showFeatured}
            onChange={(e) => onFeaturedChange(e.target.checked)}
          >
            Featured Books
          </Checkbox>
          <Checkbox
            checked={showDiscount}
            onChange={(e) => onDiscountChange(e.target.checked)}
          >
            Discounted Books
          </Checkbox>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
