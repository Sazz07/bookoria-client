export const config = {
  api: {
    baseUrl:
      import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  },
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'duxjoty1l',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'bookoria',
    get uploadUrl() {
      return (
        import.meta.env.VITE_CLOUDINARY_UPLOAD_URL ||
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`
      );
    },
  },
};
