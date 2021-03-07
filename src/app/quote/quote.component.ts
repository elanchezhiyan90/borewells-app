import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DrillingPrice, Quotation } from '../services/quotation';
import { ScriptService } from '../services/script.service';
declare let pdfMake: any ;


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quotation = new Quotation();
  currentDate = new Date();
  datePipe!: DatePipe;
  constructor(private scriptService: ScriptService) {
    this.datePipe = new DatePipe('en-US');
    let sessionQuotation = sessionStorage.getItem('quotation');
    if(sessionQuotation){
      this.quotation = JSON.parse(sessionQuotation)
    } else {
     this.quotation = new Quotation();
    }
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.quotation.validTill = this.currentDate; 
    // if (!this.quotation.otherPrices || this.quotation.otherPrices.length === 0) {
    //    this.quotation.otherPrices = [];
    //    this.quotation.initializeOtherPrices();
    // }
    // if (!this.quotation.educations || this.quotation.educations.length === 0) {
    //   this.quotation.educations = [];
    //   this.quotation.educations.push(new Education());
    // }
    // if (!this.quotation.drillingPrices || this.quotation.drillingPrices.length === 0) {
    //   this.quotation.drillingPrices = [];
    //   this.quotation.drillingPrices.push(new DrillingPrice());
    // }

    console.log('Loading External Scripts');
    //this.scriptService.load('pdfMake', 'vfsFonts');
  }

  // addExperience() {
  //   this.quotation.experiences.push(new Experience());
  // }

  // addEducation() {
  //   this.quotation.educations.push(new Education());
  // }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  resetForm() {
    this.quotation = new Quotation();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('quotation', JSON.stringify(this.quotation));
    return {
      content: [
        {
          text: 'SAI BOREWELLS',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          color: 'blue'
        },
        {
          text: 'Quotation',
          bold: true,
          fontSize: 12,
          alignment: 'center',
          color: 'steelblue'
        },
        {
          text: 'Office Address - #462, R K Hegde Nagar, Nagavara Main Road, Bangalore – 77',
          fontSize: 9,
          alignment: 'center',
          color: 'skyblue'
        },
        {
          text: 'Email ID – saiborewells2000@gmail.com',
          fontSize: 12,
          alignment: 'center'
        },
        {
          text: 'Mobile Number – 94444 88688 / 93805 58591',
          bold: true,
          fontSize: 16,
          color: 'red',
          alignment: 'center'
        },
        {
          columns: [
            [{
              text: this.quotation.name,
              style: 'name'
            },
            {
              text: this.quotation.address
            },
            {
              text: 'Contact No : ' + this.quotation.contactNo,
            },
            {
              text: 'Quotation No : ' + this.datePipe.transform(new Date(), 'ddMMyyyyHHmmss'),
            }
            ],
            [
              {text: 'Quotation Date : ' + this.datePipe.transform(new Date(), 'dd-MM-yyyy'), alignment: 'right'},
              {text: 'Drilling Date  : ' + this.datePipe.transform(this.quotation.drillingDate, 'dd-MM-yyyy'), alignment: 'right'},
              {text: 'Valid Till     : ' + this.datePipe.transform(this.quotation.validTill, 'dd-MM-yyyy'), alignment: 'right'},
            ]
          ]
        },
        {
           table: {
             widths: ['auto', '*', 'auto', 50,50,'auto'],
             headerRows: 1,
             body: [
               [{text: 'Sl No', style: 'tableHeader',  alignment: 'center'}, {text: 'Description', style: 'tableHeader', alignment: 'center'}, {text: 'Price', style: 'tableHeader', alignment: 'center', colSpan: 4}, {}, {}, {} ],
               [{text: '1', style: 'tableRow', alignment: 'center'}, {text: 'Drilling charges for 6 1/2" dia Borewell', style: 'tableHeader1', alignment: 'left', colSpan: 5}, {}, {}, {}, {}],
               ...this.quotation.drillingPrices.map(value => {
                 if(value.startFeet == 0){
                   console.log(value);
                   return ['', {text: `Drilling up to ${value.endFeet} feet`, alignment: 'left', style: 'tableRow'}, {text: 'Rs.', alignment: 'center', style: 'tableRow'}, {text: `${value.pricePerFeet}`, alignment: 'center', colSpan: 2, style: 'tableRow'}, {}, {text: 'Per Feet', alignment: 'center', style: 'tableRow'}]
                 }else {
                   return ['', {text: `Above ${value.startFeet} feet to ${value.endFeet} feet`, alignment: 'left', style: 'tableRow'}, {text: 'Rs.', alignment: 'center', style: 'tableRow'}, {text: `${value.pricePerFeet}`, alignment: 'center', colSpan: 2, style: 'tableRow'}, {}, {text: 'Per Feet', alignment: 'center', style: 'tableRow'}]
                 }
               }),
               [{text: '2', style: 'tableRow', alignment: 'center'}, {text: 'Casing Pipe Charges', style: 'tableHeader1', alignment: 'left'}, {}, {text: '(Medium)', style: 'tableHeader1', alignment: 'center'}, {text: '(Heavy)', style: 'tableHeader1', alignment: 'center'}, {}],
               ...this.quotation.otherPrices.map((vl, index) => {
                  if(index === 0) {
                    return [{text: `${index+3}`, style: 'tableRow', alignment: 'center'}, {text: `${vl.item}`, alignment: 'left', style: 'tableRow'}, {text: 'Rs.', alignment: 'center', style: 'tableRow'}, {text: `${vl.mediumPrice}`, alignment: 'center', style: 'tableRow'}, {text: `${vl.heavyPrice}`, alignment: 'center', style: 'tableRow'},  {text: `${vl.itemType}`, alignment: 'center', style: 'tableRow'}]
                  } else {
                    return [{text: `${index+3}`, style: 'tableRow', alignment: 'center'}, {text: `${vl.item}`, alignment: 'left', style: 'tableRow'}, {text: 'Rs.', alignment: 'center', style: 'tableRow'}, {text: `${(vl.itemPrice === 0) ? 'NA': vl.itemPrice}`, alignment: 'center', colSpan: 2, style: 'tableRow'}, {},  {text: `${vl.itemType}`, alignment: 'center', style: 'tableRow'}]
                  }
               }),              
             ]
           }
         },
         {
          table: {
            widths: ['auto', '*'],
            headerRows: 1,
            body: [
              [{text: 'Note', style: 'tableHeader',  alignment: 'center'}, {text: 'Terms and Conditions', style: 'tableHeader', alignment: 'center'}],
              [{text: '1', style: 'tableRow', alignment: 'center'}, {text: 'This quotation is valid for 7 days only.', style: 'tableRow', alignment: 'left'}],
              [{text: '2', style: 'tableRow', alignment: 'center'}, {text: 'Advance of Rs. 10,000/- on booking and Rs. 1,00,000/- on Start of work.', style: 'tableHeader', alignment: 'left'}],
              [{text: '3', style: 'tableRow', alignment: 'center'}, {text: 'Spot Settlement on completion of Job.', style: 'tableRow', alignment: 'left'}],
              [{text: '4', style: 'tableRow', alignment: 'center'}, {text: 'We are not responsible for the location of the Borewell point selected by the Geologist.', style: 'tableRow', alignment: 'left'}],
              [{text: '5', style: 'tableRow', alignment: 'center'}, {text: 'If boulders or Slit comes while drilling, Work will be stopped and payment should be made for the work done. It is not possible to install submersible or jet pump.', style: 'tableRow', alignment: 'left'}],
              [{text: '6', style: 'tableRow', alignment: 'center'}, {text: 'If yield is above 2 1/2&quot; inches, then drilling cannot be done.', style: 'tableRow', alignment: 'left'}],
              [{text: 'This is system generated document and Hence valid without Signature',  alignment: 'center', style: 'tableHeader', colSpan: 2} , {}]
            ]
          }
         },
        // {
        //   text: 'Skills',
        //   style: 'header'
        // },
        // {
        //   columns : [
        //     {
        //       ul : [
        //         ...this.quotation.drillingPrices.filter((value, index) => index % 3 === 0).map(s => s.startFeet +''+s.endFeet+''+s.pricePerFeet)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.quotation.drillingPrices.filter((value, index) => index % 3 === 1).map(s => s.startFeet +''+s.endFeet+''+s.pricePerFeet)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.quotation.drillingPrices.filter((value, index) => index % 3 === 2).map(s => s.startFeet +''+s.endFeet+''+s.pricePerFeet)
        //       ]
        //     }
        //   ]
        // },
        // {
        //   text: 'Experience',
        //   style: 'header'
        // },
        // this.getExperienceObject(this.quotation.experiences),

        // {
        //   text: 'Education',
        //   style: 'header'
        // },
        // this.getEducationObject(this.quotation.educations),
        // {
        //   text: 'Other Details',
        //   style: 'header'
        // },
        // {
        //   text: this.quotation.otherDetails
        // },
        // {
        //   text: 'Signature',
        //   style: 'sign'
        // },
        // {
        //   columns : [
        //       { qr: this.quotation.name + ', Contact No : ' + this.quotation.contactNo, fit : 100 },
        //       {
        //       text: `(${this.quotation.name})`,
        //       alignment: 'right',
        //       }
        //   ]
        // }
      ],
      info: {
        title: this.quotation.name + '_quotation',
        author: this.quotation.name,
        subject: 'quotation',
        keywords: 'quotation, ONLINE quotation',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          },
          tableHeader1: {
            bold: true,
            fontSize: 10,
            color: 'black'
          },
          tableRow: {
            fontSize: 10,
            color: 'black'
          }
        }
    };
  }

  // getExperienceObject(experiences: Experience[]) {

  //   const exs: any = [];

  //   experiences.forEach(experience => {
  //     exs.push(
  //       [{
  //         columns: [
  //           [{
  //             text: experience.jobTitle,
  //             style: 'jobTitle'
  //           },
  //           {
  //             text: experience.employer,
  //           },
  //           {
  //             text: experience.jobDescription,
  //           }],
  //           {
  //             text: 'Experience : ' + experience.experience + ' Months',
  //             alignment: 'right'
  //           }
  //         ]
  //       }]
  //     );
  //   });

  //   return {
  //     table: {
  //       widths: ['*'],
  //       body: [
  //         ...exs
  //       ]
  //     }
  //   };
  // }

  // getEducationObject(educations: Education[]) {
  //   return {
  //     table: {
  //       widths: ['*', '*', '*', '*'],
  //       body: [
  //         [{
  //           text: 'Degree',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'College',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'Passing Year',
  //           style: 'tableHeader'
  //         },
  //         {
  //           text: 'Result',
  //           style: 'tableHeader'
  //         },
  //         ],
  //         ...educations.map(ed => {
  //           return [ed.degree, ed.college, ed.passingYear, ed.percentage];
  //         })
  //       ]
  //     }
  //   };
  // }

  getProfilePicObject() {
    if (this.quotation.profilePic) {
      return {
        image: this.quotation.profilePic ,
        width: 75,
        alignment : 'right'
      };
    }
    return null;
  }

  fileChanged(e: any) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.quotation.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  addDrillingPrice() {
    let last:DrillingPrice = this.quotation.drillingPrices[this.quotation.drillingPrices.length-1];
    console.log(last);
    this.quotation.drillingPrices.push(new DrillingPrice(last.endFeet, last.endFeet + 100, last.pricePerFeet + 100));
  }

  ngOnInit(): void {
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

}
