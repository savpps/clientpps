export class AttachmentModel {
    id: string;
    typePieceNumber:string;
    pieceRecto: string;
    pieceVerso: string;
    avatar: string;
    signature: string;
    pieceNumber: string;
    setAttachment(attachment: AttachmentModel) {
        this.id=attachment.id;
        this.pieceRecto= attachment.pieceRecto ;
        this.pieceVerso= attachment.pieceVerso;
        this.avatar= attachment.avatar;
        this.signature= attachment.signature;
        this. pieceNumber= attachment.pieceNumber;
    }
}