export class ProfileModel {
    id:                string;
    lastName:          string;
    firstName:         string;
    birthday:          Date;
    profession:        string;
    country:           string;
    town:              string;
    genre:             string;
    createdAt:         Date = new Date();
    updatedAt:         Date = new Date();
}