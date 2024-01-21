type UserWaste = {
  label: string;
  image: string;
  co2e: number;
  dateScanned: Date;
};

type UserData = {
  id: string;
  waste: UserWaste[];
};

interface Waste {
  createWaste(waste: UserWaste): Promise<void>;
  readWaste(): UserWaste[];
  updateWaste(waste: UserWaste): Promise<void>;
  deleteWaste(waste: UserWaste): Promise<void>;
}

interface User {
  createUserData(email: string, userData: UserData): Promise<void>;
  readUserData(email: string): Promise<UserData | null>;
  updateUserData(email: string, userData: UserData): Promise<void>;
  deleteUserData(email: string, userData: UserData): Promise<void>;
}

class UserConstructor implements User {
  localforage: LocalForage;

  constructor(localforage: LocalForage) {
    this.localforage = localforage;
  }

  async createUserData(email: string, userData: UserData): Promise<void> {
    await this.localforage.setItem(email, userData);
  }

  async readUserData(email: string): Promise<UserData | null> {
    return (await this.localforage.getItem(email)) as UserData | null;
  }

  async updateUserData(email: string, userData: UserData): Promise<void> {
    await this.localforage.setItem(email, userData);
  }

  async deleteUserData(email: string): Promise<void> {
    await this.localforage.removeItem(email);
  }
}

export type { UserWaste, UserData, Waste, User };
export { UserConstructor };
