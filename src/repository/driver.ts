import DriverModel, { Driver } from '@src/model/Driver';

const save = async (driver: Driver) => {
  const driverSaved = await DriverModel.create(driver);
  return driverSaved;
};

const findOneByEmail = async (email: string) => {
  const driverSaved = await DriverModel.findOne({ email });
  return driverSaved;
};

const findOneAndUpdate = async (id: string, driver: Partial<Driver>) => {
  const driverSaved = await DriverModel.findOneAndUpdate({ _id: id }, driver, { new: true });
  return driverSaved;
};

const driverRepository = {
  save,
  findOneByEmail,
  findOneAndUpdate,
};

export default driverRepository;
