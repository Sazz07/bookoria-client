import { Button, Modal } from 'antd';
import { useState, useRef } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AppForm from '../../../../components/form/AppForm';
import AppInput from '../../../../components/form/AppInput';
import AppSelect from '../../../../components/form/AppSelect';
import AppTextArea from '../../../../components/form/AppTextArea';
import ImageUpload, {
  ImageUploadRef,
} from '../../../../components/form/ImageUpload';
import { toast } from 'sonner';
import { TBook } from '../../../../types/book.type';
import { bookGenre } from '../../../../constants/global';
import { bookSchema } from '../../../../schemas/book.schema';
import AppDatePicker from '../../../../components/form/AppDatePicker';

type BookFormProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onSubmit: SubmitHandler<FieldValues>;
  initialValues?: TBook;
  title: string;
  isLoading: boolean;
};

const genreOptions = bookGenre.map((genre) => ({
  value: genre,
  label: genre,
}));

const BookForm = ({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  initialValues,
  title,
  isLoading,
}: BookFormProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    initialValues?.coverImage
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageUploadRef = useRef<ImageUploadRef>(null);

  const handleImageChange = (newImageUrl: string | null, file?: File) => {
    setImageUrl(newImageUrl || undefined);
    setImageFile(file || null);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    let finalImageUrl = imageUrl;

    if (imageFile && imageUploadRef.current) {
      try {
        const cloudinaryUrl = await imageUploadRef.current.uploadToCloud();
        if (cloudinaryUrl) {
          finalImageUrl = cloudinaryUrl;
        } else {
          toast.error('Failed to upload image');
          return;
        }
      } catch {
        toast.error('Failed to upload image');
        return;
      }
    }

    const bookData = {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock, 10),
      pageCount: data.pageCount ? parseInt(data.pageCount, 10) : undefined,
      coverImage: finalImageUrl,
    };

    onSubmit(bookData);
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={800}
    >
      <div className='flex flex-col gap-8 mt-4 md:flex-row'>
        <div className='flex flex-col items-center mb-6 md:mb-0'>
          <ImageUpload
            initialImage={initialValues?.coverImage}
            onImageChange={handleImageChange}
            width={200}
            height={300}
            ref={imageUploadRef}
          />
          <p className='mt-2 text-sm text-gray-500'>Book Cover Image</p>
        </div>

        <div className='flex-1'>
          <AppForm
            onSubmit={handleSubmit}
            resolver={zodResolver(bookSchema)}
            defaultValues={{
              title: initialValues?.title || '',
              author: initialValues?.author || '',
              genre: initialValues?.genre || '',
              price: initialValues?.price?.toString() || '',
              stock: initialValues?.stock?.toString() || '',
              description: initialValues?.description || '',
              publicationDate: initialValues?.publicationDate || '',
              publisher: initialValues?.publisher || '',
              isbn: initialValues?.isbn || '',
              format: initialValues?.format || '',
              language: initialValues?.language || '',
              pageCount: initialValues?.pageCount?.toString() || '',
            }}
          >
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <AppInput
                type='text'
                name='title'
                label='Title'
                placeholder='Enter book title'
                disabled={isLoading}
              />

              <AppInput
                type='text'
                name='author'
                label='Author'
                placeholder='Enter author name'
                disabled={isLoading}
              />
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <AppSelect
                name='genre'
                label='Genre'
                options={genreOptions}
                disabled={isLoading}
              />

              <AppInput
                type='number'
                name='price'
                label='Price'
                placeholder='Enter price'
                disabled={isLoading}
              />
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <AppInput
                type='number'
                name='stock'
                label='Stock'
                placeholder='Enter stock quantity'
                disabled={isLoading}
              />

              <AppInput
                type='text'
                name='isbn'
                label='ISBN'
                placeholder='Enter ISBN'
                disabled={isLoading}
              />
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <AppInput
                type='text'
                name='publisher'
                label='Publisher'
                placeholder='Enter publisher'
                disabled={isLoading}
              />

              {/* Replace the text input with DatePicker */}
              <AppDatePicker
                name='publicationDate'
                label='Publication Date'
                placeholder='Select publication date'
                disabled={isLoading}
              />
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <AppInput
                type='text'
                name='format'
                label='Format'
                placeholder='Enter format (e.g., Hardcover, Paperback)'
                disabled={isLoading}
              />

              <AppInput
                type='number'
                name='pageCount'
                label='Page Count'
                placeholder='Enter number of pages'
                disabled={isLoading}
              />
            </div>

            <AppInput
              type='text'
              name='language'
              label='Language'
              placeholder='Enter language'
              disabled={isLoading}
            />

            <AppTextArea
              name='description'
              label='Description'
              placeholder='Enter book description'
              rows={4}
              disabled={isLoading}
            />

            <div className='flex gap-2 justify-end mt-6'>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type='primary' htmlType='submit' loading={isLoading}>
                {initialValues ? 'Update Book' : 'Add Book'}
              </Button>
            </div>
          </AppForm>
        </div>
      </div>
    </Modal>
  );
};

export default BookForm;
