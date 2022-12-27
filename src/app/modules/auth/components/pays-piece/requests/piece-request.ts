export class PieceRequest {
    name: string = "";
    isActive: boolean = true ;

    setPiece(request: PieceRequest) {
        this.name = request.name;
        this.isActive = request.isActive;
    }
}

