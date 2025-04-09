import { forwardRef, useImperativeHandle, useState } from 'react';
import { Upload, message, Button, Spin } from 'antd';
import {
  PlusOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { uploadToCloudinary } from '../../utils/cloudinaryUpload';

export type ImageUploadRef = {
  uploadToCloud: () => Promise<string | null>;
  getFile: () => File | null;
  getPreviewUrl: () => string | undefined;
};

type ImageUploadProps = {
  initialImage?: string;
  onImageChange: (imageUrl: string | null, file?: File) => void;
  maxSize?: number;
  width?: number;
  height?: number;
};

const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(
  (
    { initialImage, onImageChange, maxSize = 2, width = 100, height = 100 },
    ref
  ) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(initialImage);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [previewMode, setPreviewMode] = useState(!!initialImage);

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result as string));
      reader.readAsDataURL(img);
    };

    const beforeUpload = (file: RcFile) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG files!');
        return false;
      }

      const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
      if (!isLtMaxSize) {
        message.error(`Image must be smaller than ${maxSize}MB!`);
        return false;
      }

      return true;
    };

    const handleChange: UploadProps['onChange'] = (info) => {
      if (!info.fileList[0]?.originFileObj) return;

      const currentFile = info.fileList[0].originFileObj as RcFile;

      if (!beforeUpload(currentFile)) return;

      setLoading(true);

      getBase64(currentFile, (url) => {
        setImageUrl(url);
        setFile(currentFile);
        setLoading(false);
        setPreviewMode(true);
        onImageChange(url, currentFile);
      });
    };

    const uploadToCloud = async () => {
      if (!file) return null;

      setLoading(true);
      try {
        const cloudinaryUrl = await uploadToCloudinary(file);
        setLoading(false);
        return cloudinaryUrl;
      } catch (error) {
        setLoading(false);
        message.error('Failed to upload to cloud');
        console.error('Cloud upload error:', error);
        return null;
      }
    };

    const handleRemoveImage = () => {
      setImageUrl(undefined);
      setFile(null);
      setPreviewMode(false);
      onImageChange(null);
    };

    useImperativeHandle(ref, () => ({
      uploadToCloud,
      getFile: () => file,
      getPreviewUrl: () => imageUrl,
    }));

    return (
      <div className='image-upload-container'>
        {previewMode && imageUrl ? (
          <div
            style={{
              position: 'relative',
              width,
              height,
              overflow: 'hidden',
            }}
          >
            <img
              src={imageUrl}
              alt='Preview'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Button
              icon={<CloseCircleOutlined />}
              type='text'
              danger
              onClick={handleRemoveImage}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'rgba(255, 255, 255, 0.7)',
              }}
            />
            {loading && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              </div>
            )}
          </div>
        ) : (
          <Upload
            name='avatar'
            listType='picture-card'
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleChange}
            style={{ width, height }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
