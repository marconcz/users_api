import AdminModel, { Admin } from '@src/model/Admin';

const save = async (admin: Admin) => {
  const adminSaved = await AdminModel.create(admin);
  return adminSaved;
};

const findOneByEmail = async (email: string) => {
  const adminSaved = await AdminModel.findOne({ email });
  return adminSaved;
};

const adminRepository = {
  save,
  findOneByEmail,
};

export default adminRepository;
