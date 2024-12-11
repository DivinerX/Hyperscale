export class CreateUserDto {
  name: string;
  email: string;
  verified?: boolean;
  avatar?: string;
}
