import {UserPreference} from './user-preference';
import {BabyDetail} from './baby-detail';
import {NannyPreference} from './nanny-preference';
import {UserDetail} from './user-detail';

export class User {
  id: number;
  name: string;
  email: string;
  gender: string;
  phoneNo: string;
  userType: string;
  userPreference: UserPreference;
  babyDetails: BabyDetail[];
  nannyPreference: NannyPreference;
  userDetail: UserDetail;

  getInfo(): string {
    return `User: { ${this.name}, ${this.id}, ${this.email}, ${this.gender}, ${this.phoneNo}, ${this.userType} }`;
  }
}
