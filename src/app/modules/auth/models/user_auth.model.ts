import {ProfileModel} from "./profile.model";
import {RoleModel} from "./role.model";
import {Segment} from "../../service-segment/models/segment";
import { AttachmentModel } from '../../../models/attachment.model';
import { PaymentSegmentModel } from '../../../models/payment-segment-model';

export class UserAuthModel {

    id: string;
    username: string;
    email: string;
    phone: string;
    referralCode: string;
    pic: String;
    roles: RoleModel[];
    segment: Segment | undefined;
    payement: PaymentSegmentModel | undefined;
    profile: ProfileModel;
    attachment: AttachmentModel;
    notLocked: boolean;
    enabled: boolean;
    acceptAccount: boolean;

    setAuthUser(authUser: UserAuthModel) {
        this.id = authUser.id;
        this.username = authUser.username || '';
        this.email = authUser.email || '';
        this.phone = authUser.phone || '';
        this.referralCode = authUser.referralCode || '';
        this.pic = authUser.pic || './assets/media/users/default.jpg';
        this.roles = authUser.roles || [];
        this.profile = authUser.profile || {};
        this.payement = authUser.payement || undefined;
        this.attachment = authUser.attachment || {};
        this.segment = authUser.segment || undefined;
        this.notLocked = authUser.notLocked || false;
        this.acceptAccount = authUser.acceptAccount || false;
        this.enabled = authUser.enabled;
    }
}