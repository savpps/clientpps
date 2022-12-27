import { ResponseModel } from "../../../models/response.model";
import {Piece} from "./piece";

export class ListPieceResponse extends ResponseModel{
    data: Piece[];

    setListPieceResponse(response: ListPieceResponse) {
        this.data = response.data
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode;
    }
}
