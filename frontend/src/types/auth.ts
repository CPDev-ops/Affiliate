export type UserLoginDTO = {
    affiliate_user_rol: string;
    id_affiliate_user: number;
    id_affiliate_user_rol: number;
    username: string
}
export interface LoginResponseDTO {
    message: string;
    user: UserLoginDTO
    user_type: string
}