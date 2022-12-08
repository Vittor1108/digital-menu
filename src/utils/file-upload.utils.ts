import { extname } from 'path';
import * as crypto from 'crypto';
export const imageFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const name = crypto.randomBytes(20).toString('hex');
  callback(null, `${name}.${fileExtName}`);
};
