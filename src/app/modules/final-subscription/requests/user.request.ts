import { ProfileRequest } from './profile.request';
import { SegmentRequest } from '../../service-segment/requests/segment-request';
export class UserRequest {
 //
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    referralCode?: string;
    profile?:ProfileRequest;
    segment?:SegmentRequest;
    role_name: string;
    phone : string;

    setUserRequest(request: UserRequest) {
        this.username = request.username;
        this.email = request.email;
        this.password = request.password;
        this.profile = request.profile;
        this.segment = request.segment;
        this.confirm_password = request.confirm_password;
        this.referralCode = request.referralCode;
        this.phone = request.phone;
        this.role_name = request.role_name;
    }
}
