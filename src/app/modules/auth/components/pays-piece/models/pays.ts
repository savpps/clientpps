export class Pays {
    id:string;
    name: string;
    flag: string;
    code: string;
    dialCode: number;
    digits: number;
    isAvailable: boolean;

    setPays(pays: Pays) {
        this.id = pays.id;
        this.name = pays.name;
        this.flag = pays.flag
        this.dialCode = pays.dialCode;
        this.digits = pays.digits;
        this.isAvailable = pays.isAvailable;
    }
}
