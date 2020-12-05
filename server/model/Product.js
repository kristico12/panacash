class Product {
    constructor(id, name, description, quantity, warranty, price, status, createdAt) {
        this.Id = id;
        this.Name = name;
        this.Description = description;
        this.Quantity = quantity;
        this.Warranty = warranty;
        this.Price = price;
        this.Status = status;
        this.CreatedAt = createdAt;
    }
    save() {
        this.Id = Product.listProduct.length;
        Product.listProduct.push(this);
        return true;
    }
    getList() {
        return {data: Product.listProduct.sort((_this,next) => {
            if (_this.Name > next.Name) return 1;
            if (_this.Name < next.Name) return -1;
            return 0;
        })}
    }
    edit() {
        const i = Product.listProduct.findIndex(e => e.Id === this.Id);
        if (i === -1) {
            return false;
        }
        Product.listProduct.splice(i,1,this);
        return true;
    }
    delete(id) {
        const i = Product.listProduct.findIndex(e => e.Id === id);
        if (i === -1) {
            return 0;
        }
        const item = Product.listProduct[i];
        if (item.Status === "PUBLISHED") {
            return 1;
        }
        Product.listProduct.splice(i,1);
        return 2;
    }
}
Product.listProduct = [];
export {
    Product
}