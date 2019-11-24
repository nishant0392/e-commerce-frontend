import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  public Item = {
    pid: 'MOBF1',
    title: 'RedMi Note 7S (Sapphire Blue, 64 GB)',
    urlTitle: 'redmi-note-7s-sapphire-blue-64-gb',
    image: 'mi-redmi-note-7s-mzb7745in-original-imafe48ru3s66sjd.jpeg',
    rating: {
      stars: 4.4,
      ratingsCount: 92530,
      reviewsCount: 7519
    },
    features: [
      '4 GB RAM | 64 GB ROM | Expandable upto 256 GB',
      '16.0 cm (6.3 inch) FHD+ Display',
      '48 MP + 5 MP | 13 MP Front Camera',
      '4000 mAh Battery',
      'Qualcomm Snapdragon 660 AIE Processor',
      'Splash Proof - Protected by P2i',
      'Quick Charge 4.0 Support',
      'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
    ],
    price: 11999,
    MRP: 13999,
    discount: 14,
    fAssured: true,
    exchangePrice: 11500,
    noCostEMI: true,

    offers: [
      {
        offer: '5% Unlimited Cashback on Flipkart Axis Bank Credit Card',
        category: 'Bank Offer',
        info: 'T&C',
        type: 'BANK_OFFER',
        showRightArrow: false
      },
      {
        offer: 'Extra 5% off* with Axis Bank Buzz Credit Card',
        category: 'Bank Offer',
        info: 'T&C',
        type: 'BANK_OFFER',
        showRightArrow: false
      },
      {
        offer: 'Get upto ₹9250 off on exchange',
        catgory: '',
        info: 'Buy with Exchange',
        type: 'EXCHANGE_OFFER',
        showRightArrow: true
      },
      {
        offer: 'Extra ₹3000 discount(price inclusive of discount)',
        category: 'Special Price',
        info: 'T&C',
        type: 'SPECIAL_PRICE',
        showRightArrow: false
      },
      {
        offer: 'Standard EMI also available',
        category: 'No cost EMI ₹917/month.',
        info: 'View Plans',
        type: 'EMI',
        showRightArrow: true
      }
    ],

    properties: {

      Color: {

        items: [
          {
            imgUrl: '/assets/images/Humongosaur.JPG'
          },
          {
            imgUrl: '/assets/images/bg.jpg'
          },
          {
            imgUrl: '/assets/images/Nishant.JPG'
          },
          {
            imgUrl: '/assets/images/fp-login.png'
          },
          {
            imgUrl: '/assets/images/oppo-a5s-cph1909-original-imafhhsyrg7mhdaq.jpeg'
          }
        ]
      },

      Storage: {
        items: ['32GB', '64GB']
      },

      RAM: {
        items: ['3GB', '4GB']
      },

      Delivery: {
        view_details: 'delivery'
      },

      Highlights: {
        items: [
          '4 GB RAM | 64 GB ROM | Expandable Upto 256 GB',
          '16.0 cm (6.3 inch) FHD+ Display',
          '48MP + 5MP | 13MP Front Camera',
          '4000 mAh Battery',
          'Qualcomm Snapdragon 660 AIE Processor',
          'Splash Proof - Protected by P2i',
          'Quick Charge 4.0 Support'
        ]
      },

      'Easy Payment Options': {
        items: [
          'No cost EMI starting from ₹917/month',
          'Cash on Delivery',
          'Net banking & Credit/ Debit/ ATM card'
        ],

        lastLine: {
          title: 'View Details',
          url: 'Payment options'
        }
      },

      Seller: {
        seller: 'Flashstar Commerce',
        rating: 4.9,
        items: [
          {
            policy: '10 Days Replacement Policy',
            policyInfo: true
          }
        ]
      }

    }, // properties

    listOfProperties: [
      'Color', 'Storage', 'RAM', 'Delivery', 'Highlights', 'Easy Payment Options', 'Seller'
    ],

    specifications: [
      {
        'title': 'General',
        'In The Box': 'Handset, Charging Cable, SIM Ejector Tool, Warranty Card, Manual, Soft Protective Case, Adapter',
        'Model Number': 'MZB7741IN',
        'Model Name': 'Redmi Note 7S',
        'Color': 'Onyx Black',
        'Browse Type': 'Smartphones',
        'SIM Type': 'Dual Sim',
        'Hybrid Sim Slot': 'Yes',
        'Touchscreen': 'Yes',
        'OTG Compatible': 'Yes',
        'Sound Enhancements': 'Speaker: Single(Bottom Opening), 2 Microphones(for Noise Cancellation), Smart PA'
      },

      {
        'title': 'Display Features',
        'Display Size': '16.0 cm (6.3 inch)',
        'Resolution': '2340 x 1080 pixels',
        'Resolution Type': 'FHD+',
        'GPU': 'Adreno 512',
        'Display Type': 'IPS (In-cell), RD',
        'Other Display Features': 'Contrast Ratio: 1500:1 (Typical), 81.41% NTSC Ratio, Gorilla Glass 5 (Front and Back)'
      },

      {
        'title': 'Os & Processor Features',
        'Operating System': 'Android Pie 9.0',
        'Processor Type': 'Qualcomm Snapdragon 660 AIE',
        'Processor Core': 'Octa Core',
        'Primary Clock Speed': '2.2 GHz',
        'Secondary Clock Speed': '1.8 GHz',
        'Operating Frequency': 'GSM: B2, B3, B5, B8, WCDMA: B1, B2, B5, B8, 4G LTE-TDD: B40, B41, 4G LTE-FDD: B1, B3, B5, B8, CA: 1C (Only DLCA), 3C, 40C, 41C'
      },

      {
        'title': 'Memory & Storage Features',
        'Internal Storage': '64 GB',
        'RAM': '4 GB',
        'Expandable Storage': '256 GB',
        'Supported Memory Card Type': 'microSD',
        'Memory Card Slot Type': 'Hybrid Slot'
      },

      {
        'title': 'Camera Features',
        'Primary Camera Available': 'Yes',
        'Primary Camera': '48MP + 5MP',
        'Primary Camera Features': '48MP(GM1) - F1.79, 1.6 micrometer(4 in 1), 6P Lens(48MP) + 3P Lens(5MP), PDAF, 5MP - F2.2, 1.12 micrometer, Slow Motion Support at 120 fps',
        'Secondary Camera Available': 'Yes',
        'Secondary Camera': '13MP',
        'Secondary Camera Features': 'F2.0 Aperture, 1.12 micrometer',
        'Flash': 'Rear Flash',
        'Dual Camera Lens': 'Primary Camera'
      },

      {
        'title': 'Connectivity Features',
        'Network Type': '3G, 4G VOLTE, 4G, 2G',
        'Supported Networks': 'GSM, WCDMA, 4G VoLTE, 4G LTE',
        'Internet Connectivity': '4G, 3G, Wi-Fi',
        '3G': 'Yes',
        'Bluetooth Support': 'Yes',
        'Bluetooth Version': '5.0',
        'Wi - Fi': 'Yes',
        'Wi - Fi Version': '802.11a / b / g / n / ac',
        'USB Connectivity': 'Yes',
        'Audio Jack': '3.5mm',
        'Map Support': 'Google Maps',
        'GPS Support': 'Yes'
      },

      {
        'title': 'Other Details',
        'Smartphone': 'Yes',
        'SIM Size': 'Nano SIM + Nano SIM',
        'User Interface': 'MIUI 10',
        'Graphics PPI': '409 PPI',
        'Sensors': 'Rear Fingerprint Sensor, Ambient Light Sensor, Proximity Sensor, E-compass, Accelerometer, Gyroscope',
        'Other Features': 'Clock Speed/Cores/Bits: 4 x Gold 2.2 GHz + 4 x Silver 1.8 GHz, eMMC v5.1, Charger: 5V/2A, Body: 2.5D Glass (Back and Front), Splash-proof Protected by P2i, Quick Charge 4.0, Super Low Light (Night) Photography, IR Blaster, USB Type-C (2.0)',
        'GPS Type': 'A-GPS, GLONASS, BeiDou'
      },

      {
        'title': 'Battery & Power Features',
        'Battery Capacity': '4000 mAh',
        'Battery Type': 'Li-polymer'
      },

      {
        'title': 'Dimensions',
        'Width': '75.21 mm',
        'Height': '159.21 mm',
        'Depth': '8.1 mm',
        'Weight': '186 g'
      },

      {
        'title': 'Warranty',
        'Warranty Summary': 'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
      }
    ],

    MPI_Info : {
      //url: ''
    }

  }; // Item


  public carouselOptions = {
    subitems_count: 6,
    widthOfCarousel: "75px",
    heightOfCarousel: "66vh",
    heightOfSubitemDiv: "11vh",
    widthOfSubitem: "auto",
    heightOfSubitem: "auto",
    cycle: false,
    relativePath: "/assets/images/"
  };


  public carouselItems = [

    {
      img: "mi-redmi-note-7s-mzb7745in-original-imafe48ru3s66sjd-thumbnail.jpeg",
      fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafe48ru3s66sjd.jpeg'
    },
    {
      img: 'mi-redmi-note-7s-mzb7742in-original-imafgzbd8rvyf7ms-thumbnail.jpeg',
      fullImg: 'mi-redmi-note-7s-mzb7742in-original-imafgzbd8rvyf7ms.jpeg'
    },
    {
      img: 'mi-redmi-note-7s-mzb7745in-original-imafghukgt6fapxv-thumbnail.jpeg',
      fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghukgt6fapxv.jpeg'
    },
    {
      img: 'mi-redmi-note-7s-mzb7745in-original-imafghukh85tt6yh-thumbnail.jpeg',
      fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghukh85tt6yh.jpeg'
    },
    {
      img: 'mi-redmi-note-7s-mzb7745in-original-imafghuku3rz7uvu-thumbnail.jpeg',
      fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghuku3rz7uvu.jpeg'
    },
    {
      img: 'mi-redmi-note-7s-mzb7745in-original-imafghukryzhfzun-thumbnail.jpeg',
      fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghukryzhfzun.jpeg'
    },
    {
      img: 'mi-redmi-note-7s-mzb7745in-original-imafghukhedmm7pu-thumbnail.jpeg',
      fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghukhedmm7pu.jpeg'
    },
    {
      img: 'mi-redmi-note-7s-mzb7745in-original-imafghuh2zxfzpwg-thumbnail.jpeg',
      fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghuh2zxfzpwg.jpeg'
    }

  ];

  constructor() { }
}
