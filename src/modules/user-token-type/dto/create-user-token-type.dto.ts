import { UserTokenTypeDuration } from '../user-token-type.enum';

export class CreateUserTokenTypeDto {
  description: string;
  duration: UserTokenTypeDuration;
}
