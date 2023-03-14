import { extname, resolve } from 'path';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';
export const imageFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const name = crypto.randomBytes(20).toString('hex');
  callback(null, `${name}.${fileExtName}`);
};

export const removeFile = (nameFile: string) => {
  return fs.unlink(`${resolve()}/assets/uploads/images/${nameFile}`, (err) => {
    if (err) {
      throw new HttpException('Unknow Error', HttpStatus.BAD_REQUEST);
    }
  });
};
