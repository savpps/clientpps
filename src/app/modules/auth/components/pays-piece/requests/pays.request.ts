export class PaysRequest {
    name: string;
    flag: string;
    code: string;
    dialCode: Number;
    digits: Number;
    isAvailable: boolean;

    setPiece(request: PaysRequest) {
        this.name = request.name;
        this.flag = request.flag
        this.dialCode = request.dialCode;
        this.digits = request.digits;
        this.isAvailable = request.isAvailable;
    }
    
}