const mongooseDB = require("mongoose");

(async () => {
  try {
    /* //connecting to local db
        await mongooseDB.connect("mongodb://localhost:27017/northwind?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",{
          "autoIndex": false, 
          "poolSize": 10, 
          "bufferMaxEntries": 0,
          "useNewUrlParser": true,
          "useUnifiedTopology":true
        }); */

    //connecting to cloud dB
    await mongooseDB.connect(
      "mongodb+srv://sa:Passw0rd@cluster0.hxubs.gcp.mongodb.net/northwind",
      {
        autoIndex: false,
        poolSize: 10,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("mongoose database is successfully conneected.");
  } catch (ex) {
    console.log(ex);
  }
})();

const Product = mongooseDB.model(
  "Products",
  new mongooseDB.Schema({
    ProductID: {
      type: Number,
    },
    ProductName: {
      type: String,
    },
    SupplierID: {
      type: Number,
    },
    CategoryID: {
      type: Number,
    },
    QuantityPerUnit: {
      type: String,
    },
    UnitPrice: {
      type: Number,
    },
    UnitsInStock: {
      type: Number,
    },
    UnitsOnOrder: {
      type: Number,
    },
    ReorderLevel: {
      type: Number,
    },
    Discontinued: {
      type: Number,
    },
    Category: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Category",
    },
    Supplier: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Supplier",
    },
  })
);

const Category = mongooseDB.model(
  "Category",
  new mongooseDB.Schema({
    CategoryID: {
      type: Number,
    },
    CategoryName: {
      type: String,
    },
    Description: {
      type: String,
    },
    Picture: {
      type: String,
    },
  })
);

const Supplier = mongooseDB.model(
  "Supplier",
  new mongooseDB.Schema({
    SupplierID: {
      type: Number,
    },
    CompanyName: {
      type: String,
    },
    ContactName: {
      type: String,
    },
    ContactTitle: {
      type: String,
    },
    Address: {
      type: String,
    },
    City: {
      type: String,
    },
    Region: {
      type: String,
    },
    PostalCode: {
      type: Number,
    },
    Country: {
      type: String,
    },
    Phone: {
      type: String,
    },
    Fax: {
      type: String,
    },
    HomePage: {
      type: String,
    },
  })
);

const Customer = mongooseDB.model(
  "Customer",
  new mongooseDB.Schema({
    CustomerID: {
      type: String,
    },
    CompanyName: {
      type: String,
    },
    ContactName: {
      type: String,
    },
    ContactTitle: {
      type: String,
    },
    Address: {
      type: Date,
    },
    City: {
      type: String,
    },
    Region: {
      type: String,
    },
    PostalCode: {
      type: Number,
    },
    Country: {
      type: String,
    },
    Phone: {
      type: String,
    },
    Fax: {
      type: String,
    },
  })
);

const Order = mongooseDB.model(
  "Order",
  new mongooseDB.Schema({
    OrderID: {
      type: Number,
    },
    CustomerID: {
      type: String,
    },
    EmployeeID: {
      type: Number,
    },
    OrderDate: {
      type: Date,
    },
    RequiredDate: {
      type: Date,
    },
    ShippedDate: {
      type: Date,
    },
    ShipVia: {
      type: Number,
    },
    Freight: {
      type: Number,
    },
    ShipName: {
      type: String,
    },
    ShipAddress: {
      type: String,
    },
    ShipCity: {
      type: String,
    },
    ShipRegion: {
      type: String,
    },
    ShipPostalCode: {
      type: Number,
    },
    ShipCountry: {
      type: String,
    },
    Customer: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Customer",
    },
  })
);

const OrderDetail = mongooseDB.model(
  "order-detail",
  new mongooseDB.Schema({
    OrderID: {
      type: Number,
    },
    ProductID: {
      type: Number,
    },
    UnitPrice: {
      type: Number,
    },
    Quantity: {
      type: Number,
    },
    Discount: {
      type: Number,
    },
    Order: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Order",
    },
    Product: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Product",
    },
  })
);

//const test = mongooseDB.model('test', new mongooseDB.Schema({}));

/* const EmployeeTerritory = mongooseDB.model('employee-territory', new mongooseDB.Schema({
    EmployeeID: {
        type: Number
      },
      TerritoryID: {
        type: Number
      }
  }));

  const Territory = mongooseDB.model('Territory', new mongooseDB.Schema({
    TerritoryID: {
        type: Number
      },
      TerritoryDescription: {
        type: String
      },
      RegionID: {
        type: Number
      }
  })); */

async function linkProductWithCategory() {
  const categories = await Category.find();
  categories.forEach(async function (category) {
    console.log(category._id);
    const result = await Product.updateMany(
      { CategoryID: { $eq: category.CategoryID } },
      {
        $set: {
          Category: category._id,
        },
      }
    );
  });
}

async function linkProductWithSupplier() {
  const suppliers = await Supplier.find();
  suppliers.forEach(async function (supplier) {
    console.log(supplier._id);
    const result = await Product.updateMany(
      { SupplierID: { $eq: supplier.SupplierID } },
      {
        $set: {
          Supplier: supplier._id,
        },
      }
    );
  });
}

async function linkOrderWithCustomer() {
  const customers = await Customer.find();
  customers.forEach(async function (customer) {
    console.log(customer._id);
    const result = await Order.updateMany(
      { CustomerID: { $eq: customer.CustomerID } },
      {
        $set: {
          Customer: customer._id,
        },
      }
    );
  });
}

async function linkOrderDetailWithProduct() {
  const products = await Product.find();
  products.forEach(async function (product) {
    console.log(product._id);
    const result = await OrderDetail.updateMany(
      { ProductID: { $eq: product.ProductID } },
      {
        $set: {
          Product: product._id,
        },
      }
    );
  });
}

async function linkOrderDetailWithOrder() {
  const orders = await Order.find();
  orders.forEach(async function (order) {
    console.log(order._id);
    const result = await OrderDetail.updateMany(
      { OrderID: { $eq: order.OrderID } },
      {
        $set: {
          Order: order._id,
        },
      }
    );
  });
}

async function displayProducts() {
  const products = await Product.find()
    .populate("Category")
    .populate("Supplier")
    .select("ProductName Category Supplier")
    .limit(1);
  console.log(products);
  process.exit();
}

linkProductWithCategory();
linkProductWithSupplier();
linkOrderWithCustomer();
linkOrderDetailWithProduct();
linkOrderDetailWithOrder();

//displayProducts();
