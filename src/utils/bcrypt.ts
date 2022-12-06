import * as bcrypt from 'bcrypt';
class Bcrypt {
  public hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  };
}

export default new Bcrypt();
