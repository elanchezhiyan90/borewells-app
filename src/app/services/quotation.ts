export const otherItems = [
    {item: '7" M.S Casing Pipe Erection Charges', mediumPrice: 380 , heavyPrice: 440 , itemPrice: 0, itemType: 'Per Feet'},
    {item: '10" PVC Casing Pipe Erection Charges', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 360, itemType: 'Per Feet'},
    {item: '12" PVC Casing Pipe Erection Charges', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 600, itemType: 'Per Feet'},
    {item: 'M.S & PVC Collar 1 No.', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 200, itemType: 'Each'},
    {item: 'Cap 1 No.', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 200, itemType: 'Each'},
    {item: 'M.S Casing Pipe Welding Charges Per Joint', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 200, itemType: 'Per Joint'},
    {item: 'Transport Charges', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 1000, itemType: 'Lump sum'},
    {item: 'Labor Charges', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 1000, itemType: 'Lump sum'},
    {item: 'Water Injections Charges', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 10, itemType: 'Per Feet'},
    {item: 'Vehicle Setting', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 0, itemType: 'Lump sum'},
    {item: 'Flushing Charges', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 0, itemType: 'Per Feet'},
    {item: 'Pipe Cutting Charges.', mediumPrice: 0 , heavyPrice: 0 , itemPrice: 0, itemType: 'Each'}
];

export const drillingPricesDetails = [
    {startFeet: 0 , endFeet: 300, pricePerFeet: 80},
    {startFeet: 300 , endFeet: 400, pricePerFeet: 90},
    {startFeet: 400 , endFeet: 500, pricePerFeet: 100},
    {startFeet: 500 , endFeet: 600, pricePerFeet: 120},
    {startFeet: 600 , endFeet: 700, pricePerFeet: 140},
    {startFeet: 700 , endFeet: 800, pricePerFeet: 170},
    {startFeet: 800 , endFeet: 900, pricePerFeet: 200},
    {startFeet: 900 , endFeet: 1000, pricePerFeet: 240},
    {startFeet: 1000 , endFeet: 1100, pricePerFeet: 290},
    {startFeet: 1100 , endFeet: 1200, pricePerFeet: 390},
    {startFeet: 1200 , endFeet: 1300, pricePerFeet: 490},
    {startFeet: 1300 , endFeet: 1400, pricePerFeet: 590},
    {startFeet: 1400 , endFeet: 1500, pricePerFeet: 690},
    {startFeet: 1500 , endFeet: 1600, pricePerFeet: 790}
]

export class Quotation {
    profilePic!: string;
    name!: string;
    address!: string;
    contactNo!: number;
    drillingDate!: Date;
    QuotationDate!: Date;
    validTill!: Date;
    quotationNumber!: String;
    otherPrices: OtherPrice[] = [];
    // educations: Education[] = [];
    // otherDetails!: string;
    drillingPrices: DrillingPrice[] = [];

    constructor() {
        //this.otherPrices.push(new OtherPrice());
       // this.educations.push(new Education());
       this.initializeOtherPrices();
       //this.drillingPrices.push(new DrillingPrice());
       this.intializeDrillingPrices();
    }

    initializeOtherPrices(){
        otherItems.forEach(value => this.otherPrices.push(new OtherPrice(value.item, value.mediumPrice, value.heavyPrice, value.itemPrice, value.itemType)));
    }

    intializeDrillingPrices() {
        drillingPricesDetails.forEach(vl => this.drillingPrices.push(new DrillingPrice(vl.startFeet, vl.endFeet, vl.pricePerFeet)));
    }
}

// export class Experience {
//     employer!: string;
//     jobTitle!: string;
//     jobDescription!: string;
//     startDate!: string;
//     experience!: number;
// }

// export class Education {
//     degree!: string;
//     college!: string;
//     passingYear!: string;
//     percentage!: number;
// }

// export class Skill {
//     value!: string;
// }

export class DrillingPrice {
    startFeet!: number;
    endFeet!: number;
    pricePerFeet!: number;
    constructor(startFeet: number, endFeet: number, pricePerFeet: number) {
        this.startFeet = startFeet;
        this.endFeet = endFeet;
        this.pricePerFeet = pricePerFeet;
    }
}

export class OtherPrice {
    item!: String;
    mediumPrice!: number;
    heavyPrice!: number;
    itemPrice!: number;
    itemType!: String;
    constructor(item: String, mediumPrice: number, heavyPrice: number, itemPrice: number, itemType:String){
        this.item = item;
        this.mediumPrice = mediumPrice;
        this.heavyPrice = heavyPrice;
        this.itemPrice = itemPrice;
        this.itemType = itemType;
    }
}