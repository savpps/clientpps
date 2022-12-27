export class ProfileRequest {
    genre:             string;
    lastName:          string;
    firstName:         string;
    birthday:          Date;
    profession:        string;
    country:           string;
    town:              string;
    region:             string;
    phone:              string | undefined;
    user_id:              string |undefined;

    setProfileRequest(request: ProfileRequest) {
        this.genre = request.genre;
        this.lastName = request.lastName;
        this.birthday = request.birthday;
        this.profession = request.profession;
        this.country = request.country;
        this.region = request.region;
        this.town = request.town;
        this.phone = request.phone;
    }
}
