import * as bcrypt from 'bcrypt';
class Bcrypt {
  public hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  };

  public comparePassword = async (
    password: string,
    hashPassword: string,
  ): Promise<boolean> => {
    return bcrypt.compareSync(password, hashPassword);
  };
}

export default new Bcrypt();
