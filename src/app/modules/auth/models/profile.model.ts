export class ProfileModel {
    id:                string;
    lastName:          string;
    firstName:         string;
    birthday:          Date;
    profession:        string;
    country:           string;
    region:              string;
    town:              string;
    genre:             string;
    validPhoneNumber:  boolean;
    validPersonalInfo: boolean; 

    setProfile(profile: ProfileModel) {
        this.id = profile.id;
        this.lastName = profile.lastName;
        this.firstName = profile.firstName;
        this.birthday = profile.birthday;
        this.country = profile.country;
        this.genre = profile.genre;
        this.region = profile.region;
        this.town = profile.town;
        this.profession = profile.profession;
        this.validPersonalInfo = profile.validPersonalInfo;
        this.validPhoneNumber = profile.validPhoneNumber;
    }
}