export class ProductRequest {
    name: string = "";

    setProduct(request: ProductRequest) {
        this.name = request.name;
    }
}