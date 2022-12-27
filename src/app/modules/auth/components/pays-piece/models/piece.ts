
export class Piece {
    id: string;
    name: string;
    isActive:boolean;
    setPiece(piece: Piece) {
        this.id = piece.id;
        this.name = piece.name;
        this.isActive = piece.isActive;
    }
}
