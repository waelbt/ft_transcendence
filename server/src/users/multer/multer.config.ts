import {
    FileTypeValidator,
    MaxFileSizeValidator,
    ParseFilePipe
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { InvalidFileException } from './file.exception';

export const multerOptions = {
    storage: diskStorage({
        destination: process.env.UPLOADS_DESTINATION,
        filename: (req, file ,callback) => {
            const uniqueName =
                Date.now() + '-' + Math.round(Math.random() * 1e9);

            const nameWithoutExtension = file.originalname.split('.')[0];

            const ext = extname(file.originalname);
            const filename = `${nameWithoutExtension}-${uniqueName}${ext}`;
            callback(null, filename);
        }
    }),
    limits: {
        fileSize: 4 * 1024 * 1024 // 4MB
    },
    fileFilter: (req, file, callback) => {
        const allowedFileTypes = ['.png', '.jpg'];
        // const maxFileSize = 4 * 1024 * 1024; // 4MB

        const fileExtension = extname(file.originalname).toLowerCase();
        if (!allowedFileTypes.includes(fileExtension)) {
            return callback(
                new InvalidFileException(
                    'Invalid file type. Only PNG and JPG files are allowed.'
                ),
                false
            );
        }

        // console.log('size: ', file.size);
        // console.log('max: ', maxFileSize);
        // console.log('file: ', file);
        // console.log('buffer: ', file.buffer);

        // if (file.size > maxFileSize) {
        //     return callback(
        //         new InvalidFileException(
        //             'File size exceeds the limit. Maximum size is 4MB.'
        //         ),
        //         false
        //     );
        // }

        callback(null, true);
    },
    // limits: { fileSize: 4 * 1024 * 1024 }, // 5MB
    key: (req, file, cb) => {
        // Your custom filename logic here
        cb(null, file.originalname + '-' + Date.now());
    }
};
