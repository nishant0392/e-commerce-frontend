import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProvider2Service {
 
  // Navbar Items
  public electronics = {

    subCategory1: {
      title: 'Mobiles',
      items: [
        {
          title: 'Mi',
          url: '/mobiles/mi~brand/pr?sid=tyy,4io&amp;otracker=nmenu_sub_Electronics_0_Mi'
        },
        {
          title: 'Realme',
          url: '/mobiles/pr?sid=tyy%2C4io&amp;otracker=nmenu_sub_Electronics_0_Realme'
        },
        {
          title: 'Samsung',
          url: '/samsung-mobile-store?otracker=nmenu_sub_Electronics_0_Samsung'
        },
        {
          title: 'Infinix',
          url: '/mobiles/pr?sid=tyy%2C4io&amp;otracker=nmenu_sub_Electronics_0_Infinix'
        },
        {
          title: 'OPPO',
          url: '/oppo-mobile-phones-store?otracker=nmenu_sub_Electronics_0_OPPO'
        },
        {
          title: 'Apple',
          url: '/apple-products-store?otracker=nmenu_sub_Electronics_0_Apple'
        },
        {
          title: 'Vivo',
          url: '"/mobiles/pr?sid=tyy%2C4io&amp;otracker=nmenu_sub_Electronics_0_Vivo'
        },
        {
          title: 'Honor',
          url: '/search?p[]=facets.brand%255B%255D%3DHonor&amp;sid=tyy%2F4io&amp;otracker=nmenu_sub_Electronics_0_Honor'
        },
        {
          title: 'Asus',
          url: '/mobiles/pr?sid=tyy%2C4io&amp;otracker=nmenu_sub_Electronics_0_Asus'
        },
        {
          title: 'Pixel 3a | 3a XL',
          url: '/mobiles/~pixel-3a-series/pr?sid=tyy%2C4io&amp;otracker=nmenu_sub_Electronics_0_Pixel%203a%20%7C%203a%20XL'
        },
        {
          title: 'Redmi K20 | K20 Pro',
          url: '/mobiles/~cs-u369u3adcv/pr?sid=tyy%2C4io&amp;otracker=nmenu_sub_Electronics_0_Redmi%20K20%20%7C%20K20%20Pro'
        },
        {
          title: 'Realme X',
          url: '/mobiles/~cs-axw3ei2ufh/pr?sid=tyy%2C4io&amp;otracker=nmenu_sub_Electronics_0_Realme%20X'
        },
        {
          title: 'Redmi 7A',
          url: '/mobiles/~cs-iwmqh0q1cp/pr?sid=tyy%2C4io&amp;otracker=nmenu_sub_Electronics_0_Redmi%207A'
        },
        {
          title: 'Vivo Z1Pro',
          url: '/tyy/4io/~cs-fz8is2wkwi/pr?sid=tyy,4io&amp;otracker=nmenu_sub_Electronics_0_Vivo%20Z1Pro'
        },
        {
          title: 'Realme 5 Pro',
          url: '/mobiles/~cs-2961zwwdcj/pr?sid=tyy,4io&amp;sort=price_asc&amp;otracker=nmenu_sub_Electronics_0_Realme%205%20Pro'
        },
        {
          title: 'Oppo Reno 2z',
          url: '/mobiles/~cs-rohz4ga542/pr?sid=tyy,4io&amp;otracker=nmenu_sub_Electronics_0_Oppo%20Reno%202z'
        },
        {
          title: 'Realme 5',
          url: '/mobiles/~cs-njlqhhl0ch/pr?sid=tyy,4io&amp;otracker=nmenu_sub_Electronics_0_Realme%205'
        }
      ]
    },

    subCategory2: {
      title: 'Mobile Accessories',
      items: [
        {
          title: 'Mobile Cases',
          url: '/mobile-accessories/cases-and-covers/pr?sid=tyy,4mr,q2u&amp;otracker=nmenu_sub_Electronics_0_Mobile%20Cases'
        },
        {
          title: 'Headphones & Headsets',
          url: '/headphones-store?otracker=nmenu_sub_Electronics_0_Headphones%20%26%20Headsets'
        },
        {
          title: 'Power Banks',
          url: '/mobile-accessories/power-banks/pr?sid=tyy,4mr,fu6&amp;otracker=nmenu_sub_Electronics_0_Power%20Banks'
        },
        {
          title: 'Screenguards',
          url: '/mobile-accessories/screen-guards/pr?sid=tyy,4mr,lrv&amp;otracker=nmenu_sub_Electronics_0_Screenguards'
        },
        {
          title: 'Memory Cards',
          url: '/mobile-accessories/memory-cards-readers/memory-cards/pr?sid=tyy,4mr,zzf,7y7&amp;otracker=nmenu_sub_Electronics_0_Memory%20Cards'
        },
        {
          title: 'Smart Headphones',
          url: '/wearable-smart-devices/smart-headphones/pr?sid=ajy,vam&amp;otracker=nmenu_sub_Electronics_0_Smart%20Headphones'
        },
        {
          title: 'Mobile Cables',
          url: '/mobile-accessories/cables/pr?sid=tyy,4mr,3nu&amp;otracker=nmenu_sub_Electronics_0_Mobile%20Cables'
        },
        {
          title: 'Mobile Chargers',
          url: '/mobile-accessories/chargers/pr?sid=tyy,4mr,tp2&amp;otracker=nmenu_sub_Electronics_0_Mobile%20Chargers'
        },
        {
          title: 'Mobile Holders',
          url: '/mobile-accessories/mobile-holders/pr?sid=tyy,4mr,vnf&amp;otracker=nmenu_sub_Electronics_0_Mobile%20Holders'
        }
      ]
    },

    subCategory3: {
      title: 'Smart Wearable Tech',
      items: [
        {
          title: 'Smart Watches',
          url: '/smartwatches-store?otracker=nmenu_sub_Electronics_0_Smart%20Watches'
        },
        {
          title: 'Smart Glasses (VR)',
          url: '/wearable-smart-devices/smart-glasses/pr?sid=ajy%2Ctcy&amp;otracker=nmenu_sub_Electronics_0_Smart%20Glasses%20(VR)'
        },
        {
          title: 'Smart Bands',
          url: '/wearable-smart-devices/smart-bands/pr?sid=ajy%2Cq7p&amp;otracker=nmenu_sub_Electronics_0_Smart%20Bands'
        }
      ]
    },

    subCategory4: {
      title: 'Health Care Appliances',
      items: [
        {
          title: 'Bp Monitors',
          url: '/health-personal-care-appliances/health-care/health-care-devices/blood-pressure-monitors/pr?sid=zlw,nyl,bvv,kbk&amp;otracker=nmenu_sub_Electronics_0_Bp%20Monitors'
        },
        {
          title: 'Weighing Scale',
          url: '/beauty-and-personal-care/health-care/health-care-devices/weighing-scales/pr?sid=t06,nyl,bvv,o4o&amp;otracker=nmenu_sub_Electronics_0_Weighing%20Scale'
        }
      ]
    },

    subCategory5: {
      title: 'Computer Accessories',
      items: [
        {
          title: 'External Hard Disks',
          url: '/external-hard-disk-store?otracker=nmenu_sub_Electronics_0_External%20Hard%20Disks'
        },
        {
          title: 'Pendrives',
          url: '/computers/storage/pen-drives/pr?sid=6bo,jdy,uar&amp;otracker=nmenu_sub_Electronics_0_Pendrives'
        },
        {
          title: 'Laptop Skins & Decals',
          url: '/laptop-accessories/laptop-skins-decals/pr?sid=6bo,ai3,zvm&amp;otracker=nmenu_sub_Electronics_0_Laptop%20Skins%20%26%20Decals'
        },
        {
          title: 'Laptop Bags',
          url: '/laptop-accessories/laptop-bags/pr?sid=6bo%2Cai3%2Cqq9&amp;otracker=nmenu_sub_Electronics_0_Laptop%20Bags'
        },
        {
          title: 'Mouse',
          url: '/laptop-accessories/mouse/pr?sid=6bo,ai3,2ay&amp;otracker=nmenu_sub_Electronics_0_Mouse'
        },
        {
          title: 'Computer Peripherals',
          url: '/peripherals-store?otracker=nmenu_sub_Electronics_0_Computer%20Peripherals'
        },
        {
          title: 'Printers & Ink Cartridges',
          url: '/printer-inks-store?otracker=nmenu_sub_Electronics_0_Printers%20%26%20Ink%20Cartridges'
        },
        {
          title: 'Monitors',
          url: '/monitors-store?otracker=nmenu_sub_Electronics_0_Monitors'
        }
      ]
    },

    subCategory6: {
      title: 'Tablets',
      items: [
        {
          title: 'Apple iPads',
          url: '/tablets/~apple-ipads/pr?sid=tyy,hry&amp;otracker=nmenu_sub_Electronics_0_Apple%20iPads'
        }
      ]
    },

    subCategory7: {
      title: 'Speakers',
      items: [
        {
          title: 'Home Audio Speakers',
          url: '/audio-video/speakers/pr?count=40&amp;sid=0pm%2F0o7&amp;otracker=nmenu_sub_Electronics_0_Home%20Audio%20Speakers'
        },
        {
          title: 'Home Theatres',
          url: '/home-entertainment/video-players-accessories/home-theaters/pr?sid=ckf%2Csee%2Cmi3&amp;otracker=nmenu_sub_Electronics_0_Home%20Theatres'
        },
        {
          title: 'Soundbars',
          url: '/audio-video/speakers/pr?sid=0pm%2C0o7&amp;otracker=nmenu_sub_Electronics_0_Soundbars'
        },
        {
          title: 'Bluetooth Speakers',
          url: '/audio-video/speakers/pr?sid=0pm%2C0o7&amp;otracker=nmenu_sub_Electronics_0_Bluetooth%20Speakers'
        },
        {
          title: 'DTH Set Top Box',
          url: '/home-entertainment/dth/pr?count=40&amp;sid=ckf%2F9wn&amp;otracker=nmenu_sub_Electronics_0_DTH%20Set%20Top%20Box'
        }
      ]
    },

    subCategory8: {
      title: 'Smart Home Automation',
      items: [
        {
          title: 'Google Home',
          url: '/google-home-store?otracker=nmenu_sub_Electronics_0_Google%20Home'
        }
      ]
    },

    subCategory9: {
      title: 'Camera',
      items: [
        {
          title: 'DSLR & Mirrorless',
          url: '/cameras/dslr~type/pr?sid=jek%2Cp31&amp;otracker=nmenu_sub_Electronics_0_DSLR%20%26%20Mirrorless'
        },
        {
          title: 'Compact & Bridge Cameras',
          url: '/cameras/point-shoot~type/pr?sid=jek%2Cp31&amp;otracker=nmenu_sub_Electronics_0_Compact%20%26%20Bridge%20Cameras'
        },
        {
          title: 'Sports & Action',
          url: '/cameras/sports-action/pr?count=40&amp;sid=jek%2Fp31%2Fs3q&amp;otracker=nmenu_sub_Electronics_0_Sports%20%26%20Action'
        }
      ]
    },

    subCategory10: {
      title: 'Camera Accessories',
      items: [
        {
          title: 'Lens',
          url: '/camera-accessories/camera-lenses/pr?uniqueBstoreparam1=val1&amp;sid=jek%2C6l2%2Ce9y&amp;otracker=nmenu_sub_Electronics_0_Lens'
        },
        {
          title: 'Tripods',
          url: '/camera-accessories/tripods/pr?count=40&amp;sid=jek%2F6l2%2Fce6&amp;otracker=nmenu_sub_Electronics_0_Tripods'
        }
      ]
    },

    subCategory11: {
      title: 'Featured',
      items: [
        {
          title: 'Laptops on Buyback Guarantee',
          url: '/laptops/~buyback-guarantee-on-laptops-/pr?sid=6bo%2Cb5g&amp;otracker=nmenu_sub_Electronics_0_Laptops%20on%20Buyback%20Guarantee'
        },
        {
          title: 'Flipkart SmartBuy',
          url: '/flipkart-smartbuy-store?otracker=nmenu_sub_Electronics_0_Flipkart%20SmartBuy'
        },
        {
          title: 'Li-Polymer Power Banks',
          url: '/lithium-polymer-power-banks-store?otracker=nmenu_sub_Electronics_0_Li-Polymer%20Power%20Banks'
        },
        {
          title: 'Sony PS4 Pro & Slim',
          url: '/games/~sony-play-station/pr?sid=4rr%2Ctg9&amp;otracker=nmenu_sub_Electronics_0_Sony%20PS4%20Pro%20%26%20Slim'
        },
        {
          title: 'Apple Products',
          url: '/apple-products-store?otracker=nmenu_sub_Electronics_0_Apple%20Products'
        },
        {
          title: 'Microsoft Store',
          url: '/microsoft-store?otracker=nmenu_sub_Electronics_0_Microsoft%20Store'
        },
        {
          title: 'Lenovo Phab Series',
          url: '/mobiles-accessories/~lenovo-phab-series1/pr?sid=tyy&amp;otracker=nmenu_sub_Electronics_0_Lenovo%20Phab%20Series'
        },
        {
          title: 'JBL Speakers',
          url: '/all/audio-video/jbl~brand/pr?sid=all%2F0pm&amp;otracker=nmenu_sub_Electronics_0_JBL%20Speakers'
        },
        {
          title: 'Smartphones On Buyback Guarantee',
          url: '/buyback-guarantee-store?otracker=nmenu_sub_Electronics_0_Smartphones%20On%20Buyback%20Guarantee'
        },
        {
          title: 'Philips',
          url: '/health-personal-care-appliances/pr?count=40&amp;sid=zlw&amp;otracker=nmenu_sub_Electronics_0_Philips'
        },
        {
          title: 'Dr. Morepen',
          url: '/search?as=off&amp;as-show=on&amp;count=40&amp;sid=zlw&amp;otracker=nmenu_sub_Electronics_0_Dr.%20Morepen'
        },
        {
          title: 'Complete Mobile Protection',
          url: '/mobile-complete-protection-bbd-store?otracker=nmenu_sub_Electronics_0_Complete%20Mobile%20Protection'
        },
        {
          title: 'Mobiles No Cost EMI',
          url: '/no-cost-emi-mobiles-store?otracker=nmenu_sub_Electronics_0_Mobiles%20No%20Cost%20EMI'
        }
      ]
    }
  };  // electronics menu items

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
