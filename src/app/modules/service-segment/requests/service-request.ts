export class ServiceRequest {
    name:           string;
    serviceType:    string;
    amount:         Number;

    setService(service: ServiceRequest) {
        this.name = service.name;
        this.amount = service.amount;
        this.serviceType = service.serviceType
    }
}
