import {RoleModel} from "../modules/auth/models/role.model";
import {AttachmentModel} from "./attachment.model";
import {ProfileModel} from "./profil.model";
import {ValidationAccountModel} from "./validationAccount.model";
import {PaymentSegmentModel} from "./payment-segment-model";
import {PaymentModel} from "./payment-model";

export class UserModel {
    id: string;
    username: string;
    email: string;
    phone: string;
    referralcode: string;
    roles: RoleModel[];
    validationAccount: ValidationAccountModel;
    attachment: AttachmentModel;
    profile: ProfileModel;
    referralCode: string;
    nui: string;
    acceptAccount: boolean;
    segment: PaymentSegmentModel;
    payment: PaymentModel;
    mobileMonies: any[];
    bankCards: any[];
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    notLocked: boolean;
    status: string;
}