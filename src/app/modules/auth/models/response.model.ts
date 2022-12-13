export class ResponseModel {

    status:     string;
    statusCode: number;
    message:    string;
    data: any;

    setResponse(response: ResponseModel) {
        this.status = response.status;
        this.statusCode = response.statusCode;
        this.message = response.message;
        this.data = response.data;
    }
}