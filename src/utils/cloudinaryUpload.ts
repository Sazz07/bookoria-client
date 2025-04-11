import { Cloudinary } from '@cloudinary/url-gen';
import { config } from '../config/env.config';

export const cld = new Cloudinary({
  cloud: {
    cloudName: config.cloudinary.cloudName,
  },
});

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', config.cloudinary.uploadPreset);

  try {
    const response = await fetch(config.cloudinary.uploadUrl, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Upload failed');
    }

    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
