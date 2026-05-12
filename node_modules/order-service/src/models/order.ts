export class order{
    id: number;
    produtcId: number;
    quantity: number;
    createAt: Date;

    constructor(data: order){
        this.id = data.id;
        this.produtcId = data.produtcId;
        this.quantity = data.quantity;
        this.createAt = data.createAt;
    }
}