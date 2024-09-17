// Map of file types
export const fileTypeMap = {
    "mp4": "video",
    "mp3": "audio",
    "jpeg": "image",
    "jpg": "image",
    "png": "image",
    "gif": "image",
    "txt": "text",
    "pdf": "pdf",
};

// List of media file types
export const mediaFileTypes = [
    "gif", "png", "jpg", "jpeg",
];

// Function to filter media files from an array of files
export const filterMediaFromArray = (files) => {
    const mediaFiles = [];
    for (let i = 0; i < files.length; i++) { // Fixed iteration logic
        const fileName = files[i].path;
        const fileSuffix = fileName.split(".").pop();
        if (mediaFileTypes.includes(fileSuffix)) { // Fixed check to use 'includes'
            mediaFiles.push(files[i]);
        }
    }
    return mediaFiles; // Return the filtered array
};
