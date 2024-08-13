import { BaseEntityDto } from "../generic/BaseEntityDto";

export interface UserDto extends BaseEntityDto {


    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: string[];
    enabled: boolean;
}