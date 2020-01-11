import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProvider2Service {
 
  public CartItems = [
    {
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
      seller: {
        id: "a1",
        name: "FlashStar Commerce",
        deliveryFee_cutOff: 500
      },
      deliveryFee: 0,
      price: 11999,
      MRP: 13999,
      discount: 14,
      exchangePrice: 11500,
      noCostEMI: true,
      quantity: 1
    },

    {
      pid: 'MOBF2',
      title: 'Redmi Note 7 Pro (Neptune Blue, 64 GB)',
      urlTitle: 'redmi-note-7s-pro-neptune-blue-64-gb',
      image: 'mi-redmi-note-7-pro-na-original-imafe4bbyfppbnuu.jpeg',
      rating: {
        stars: 4.5,
        ratingsCount: 419749,
        reviewsCount: 39129
      },
      features: [
        '4 GB RAM | 64 GB ROM | Expandable upto 256 GB',
        '16.0 cm (6.3 inch) FHD+ Display',
        '48 MP + 5 MP | 13 MP Front Camera',
        '4000 mAh Li-polymer Battery',
        'Qualcomm Snapdragon 675 Processor',
        'Splash Proof - Protected by P2i',
        'Quick Charge 4.0 Support',
        'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
      ],
      seller: {
        id: "a2",
        name: "FlashStar Arts",
        deliveryFee_cutOff: 500
      },
      deliveryFee: 0,
      price: 13999,
      MRP: 15999,
      discount: 12,
      exchangePrice: 12000,
      noCostEMI: true,
      quantity: 1
    }
  ];

  public SavedForLaterItems = [
    {
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
      seller: {
        id: "a1",
        name: "FlashStar Commerce",
        deliveryFee_cutOff: 500
      },
      deliveryFee: 0,
      price: 11999,
      MRP: 13999,
      discount: 14,
      exchangePrice: 11500,
      noCostEMI: true,
      quantity: 1
    }
  ]
  
}
