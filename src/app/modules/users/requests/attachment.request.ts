export class AttachmentRequest{
    typePieceNumber:string;
    pieceNumber:string;
    nui: string;
    pieceVerso: string;
    pieceRecto: string;
    avatar:string;
    signature:string;
 

    setAttachementRequest(request: AttachmentRequest) {
        this.typePieceNumber= request.typePieceNumber;
        this.pieceNumber= request.pieceNumber;
        this.nui=request.nui;
        this.pieceVerso= request.pieceVerso;
        this.pieceRecto=request.pieceRecto;
        this.avatar=request.avatar;
        this.signature= request.signature;
    }
}