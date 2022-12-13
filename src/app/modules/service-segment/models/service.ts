export class Service {
    id:        string;
    name:      string;
    amount:      Number;
    serviceType:      string;

    setService(service: Service) {
        this.id = service.id;
        this.name = service.name;
        this.amount = service.amount;
        this.serviceType = service.serviceType
    }
}
