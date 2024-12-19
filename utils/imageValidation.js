// utils/imageValidation.js

const VALID_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/heic'
];

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

export const validateImage = async (file) => {
    const errors = [];

    // Check file type
    if (!VALID_IMAGE_TYPES.includes(file.type)) {
        errors.push('Invalid file type. Only JPEG, PNG, WEBP and HEIC images are allowed.');
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        errors.push('File size too large. Maximum size is 1MB.');
    }

    // Basic image header validation
    try {
        const buffer = await file.arrayBuffer();
        const header = new Uint8Array(buffer.slice(0, 4));
        
        // Check for common image signatures
        const isJPEG = header[0] === 0xFF && header[1] === 0xD8;
        const isPNG = header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47;
        const isWEBP = (new TextDecoder()).decode(header) === 'RIFF';
        
        if (!isJPEG && !isPNG && !isWEBP) {
            errors.push('Invalid image format. File appears to be corrupted or malicious.');
        }
    } catch (error) {
        errors.push('Could not validate image content.');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const sanitizeFileName = (fileName) => {
    // Remove special characters and spaces
    return fileName
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .toLowerCase();
};