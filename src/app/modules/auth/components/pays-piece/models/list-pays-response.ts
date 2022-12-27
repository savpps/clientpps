import {ResponseModel} from "../../auth/models/response.model";
import { Pays } from "./pays";


export class ListPaysResponse extends ResponseModel{
    data: Pays[];

    setListPieceResponse(response: ListPaysResponse) {
        this.data = response.data
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode;
    }
}
