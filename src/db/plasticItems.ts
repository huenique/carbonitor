export type Link = {
  title: string;
  link: string;
};

type PlasticItemInfo = {
  images: string[];
  what: { desc: string; links: Link[] };
  effect: string | { desc: string; links: Link[] };
  reduce: {
    alternative: string;
    altImgs: string[];
    do: string;
    cta: string;
    links: Link[];
  };
};

type PlasticItems = {
  [category: string]: {
    [item: string]: PlasticItemInfo;
  };
};

export const plasticItems: PlasticItems = {
  bathroom: {
    'cotton buds': {
      images: [
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3752.webp',
      ],
      what: {
        desc: 'Cotton buds with plastic sticks are a common single-used household item that is used for personal hygiene.',
        links: [
          {
            title:
              'Cotton buds with plastic sticks | Single-use plastics | YourSay ACT',
            link: 'https://yoursayconversations.act.gov.au/single-use-plastics/cotton-buds',
          },
        ],
      },
      effect:
        'Plastic cotton buds cannot be recycled being one of the most problematic litter items found on beaches around the world. Over 1.5 billion single-used plastic cotton buds are produced each day that breaks down into micro plastics which can be ingested by the smallest phytoplankton through to the biggest whale causing species to starve and die due to blockage',
      reduce: {
        alternative: 'Swap your plastic cotton buds for bamboo cotton buds.',
        altImgs: [
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetshigh-quality-cotton-bud-in-plastic-stick-single-tip-family-care.webp',
        ],
        do: 'Thre are many other options in the market that can keep your ears clean, clean a wound, and removes makeup such as bamboo cotton buds! ',
        cta: 'Go and swap your plastic cotton buds with a bamboo cotton bud that will do the exact same job as they are much better for the environment and they are just as strong and effective!',
        links: [
          {
            title:
              'Wildlife-friendly alternatives to plastic cotton buds | Sustainability Victoria',
            link: 'https://www.sustainability.vic.gov.au/recycling-and-reducing-waste/at-home/avoid-waste/minimise-single-use-items/plastic-cotton-buds',
          },
        ],
      },
    },
  },
  kitchen: {
    'egg containers': {
      images: [
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsplst-ec-6-2__26671__45116.webp',
      ],
      what: {
        desc: 'Plastic egg container is one of the storage containers to store eggs. This decreases the rate of moisture transmission by a decent margin that keeps the eggs fresher for a long time. However, plastic egg containers are extremely harmful to the environment',
        links: [
          {
            title:
              'Can You Store Eggs in a Plastic Container? - (emborahome.com)',
            link: 'https://emborahome.com/can-you-store-eggs-in-plastic-container/',
          },
        ],
      },
      effect:
        'Plastic egg container is one of the commonly used containers to store eggs. Despite its use in storing the eggs safely, plastic egg container is extremely harmful to the environment.',
      reduce: {
        alternative:
          'Swap your plastic egg containers for cardboard egg containers.',
        altImgs: [
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3774.webp',
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3776.webp',
        ],
        do: 'Cardboard egg containers are a great alternative to plastic egg containers as they are recyclable and can be reused.',
        cta: 'Go and swap your plastic egg containers with cardboard egg containers as they are much better for the environment and they are just as strong and effective!',
        links: [
          {
            title:
              'Making A Difference: The Importance Of Recycling Plastic Egg Trays - Climate Of Our Future',
            link: 'https://www.climateofourfuture.org/making-a-difference-the-importance-of-recycling-plastic-egg-trays/',
          },
        ],
      },
    },
    'plastic grocery bags': {
      images: [
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3873.webp',
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3870.webp',
      ],
      what: {
        desc: 'A plastic bag is a type of packaging made of thin, flexible, plastic film, nonwoven fabric, or plastic textile that is used for containing and transporting goods such as foods, produce, powders, ice magazines, chemicals, and wastes.',
        links: [
          {
            title:
              'PLASTIC BAG - Definition and synonyms of plastic bag in the English dictionary (educalingo.com)',
            link: 'https://educalingo.com/en/dic-en/plastic-bag',
          },
        ],
      },
      effect: {
        desc: 'Plastic bags are recyclable, though only a few people recycle them as recycling it is a difficult task, The plastic bags that are not recycled end up becoming a litter as they do not biodegrade. These bags end up on landfills that take over 1000 years to decompose becoming eyesores that endanger many facets of the environment, including marine life and the food chain. This is because plastic bags eventually break up into microscopic piece, which scientists refer to as microplastics like all plastic materials.',
        links: [
          {
            title:
              'Sustainable Shopping—Which Bag Is Best? (nationalgeographic.org)',
            link: 'https://education.nationalgeographic.org/resource/sustainable-shoppingwhich-bag-best/',
          },
          {
            title:
              'Issues with Plastic Bags & the Ripple Effect | Environmental Center | University of Colorado Boulder',
            link: 'https://www.colorado.edu/ecenter/2022/02/23/issues-plastic-bags-ripple-effect',
          },
        ],
      },
      reduce: {
        alternative:
          'Reusable Cloth Bags, Biodegradable Bags, and Paper and cardboard egg cartons',
        altImgs: [
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3780.webp',
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3794.webp',
        ],
        do: 'Plastic bags are recyclable but only a few people recycle them making it a litter on the environment as they do not biodegrade, be one of the few that recycles them as it only takes a few steps!',
        cta: 'Go and use an alternative eco-friendly plastic bag such as reusable cloth bag and a biodegradable bag as they are durable, washable and you can reuse it multiple times!',
        links: [
          {
            title:
              'Top Eco-Friendly Plastic Bag Alternatives for Sustainable Living (homeisd.com)',
            link: 'https://homeisd.com/plastic-bag-alternatives/',
          },
        ],
      },
    },
  },
  home: {
    diapers: {
      images: [
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsbio_diaper.webp',
      ],
      what: {
        desc: "Disposable diapers are made out of a polypropylene top sheet, polyethylene back sheet, and an SAP/cellulose absorbent core. Diaper is a piece of absorbent material wrapped around a baby's bottom and in between its legs to absorb and retain urine and feces.",
        links: [
          {
            title:
              'What Are Diapers Made Of? (Layer by Layer Overview) | Parenting Mode',
            link: 'https://parentingmode.com/what-are-diapers-made-of/',
          },
          {
            title: 'Oxford Languages | The Home of Language Data (oup.com)',
            link: 'https://languages.oup.com/',
          },
        ],
      },
      effect: {
        desc: 'Disposable diapers have a negative environmental impact as they use up natural resources such as trees and water to produce. Disposable diapers are not eco-friendly as they are a single-use product that are not biodegradable. Billions of them are collected in landfills every year. Disposable diapers also contaminate nearby soil or water sources with dangerous fecal waste. Many of the greenhouse gas emissions that are plaguing our atmosphere are produced from landfills having disposable diapers contribute to it as for its ever-increasing amount that makes the problem worst.',
        links: [
          {
            title:
              'Are Diapers Environmentally Friendly? (Environmental Impact Facts) - Get Green Now (get-green-now.com)',
            link: 'https://get-green-now.com/are-diapers-environmentally-friendly/',
          },
        ],
      },
      reduce: {
        alternative:
          'Eco-friendly diaper that is biodegradable and plant-based as well as cloth diapers.',
        altImgs: [
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsdownload.webp',
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsbest-eco-friendly-disposable-diapers.webp',
        ],
        do: 'Disposable diapers are not eco-friendly! They are single-use product that are not biodegradable that ends up on landfills every year. This can take hundreds of years to decompose contributing to many of the greenhouse gas emissions because of its ever-increasing amount that makes the problem worst!',
        cta: 'If I were you, I would help save the environment by changing to an eco-friendly diaper that is biodegradable and plant based as well as cloth diapers! Remember, no step is ever too small to make a difference!',
        links: [
          {
            title:
              'Are Diapers Environmentally Friendly? (Environmental Impact Facts) - Get Green Now (get-green-now.com)',
            link: 'https://get-green-now.com/are-diapers-environmentally-friendly/',
          },
          {
            title:
              '6 Disposable Diaper Alternatives (Eco-Friendly Options) | Parenting Mode',
            link: 'https://parentingmode.com/diaper-alternatives/',
          },
        ],
      },
    },
  },
  school: {
    'ballpoint pen': {
      images: [
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3772.webp',
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3773.webp',
      ],
      what: {
        desc: 'A Ballpoint (Ballpen) is also known as ballpen in some Asian countries such as Hong Kong, India, and the Philippines). It is a pen that dispenses ink over a metal ball at its point.',
        links: [
          {
            title: 'What does ballpen mean? (definitions.net)',
            link: 'https://www.definitions.net/definition/ballpen',
          },
        ],
      },
      effect: {
        desc: 'Ballpoint pens that are mass produced and are intended to be sell at the cheapest price is commonly made out of plastic as its basic raw material because it’s inexpensive, easily formed, resistant to corrosion and lightweight. When ballpoint pen (Ballpen) is discarded, it builds up in the environment until it reaches a crisis point that takes up to 1,000 years to breakdown. This causes pollution, chokes marine wildlife, damages soil, poison groundwater, and cause serious health impacts.',
        links: [
          {
            title:
              'How Are Ballpoint Pens Made - Step By Step - Quality Logo Products',
            link: 'https://www.qualitylogoproducts.com/promo-university/how-are-pens-made.htm',
          },
          {
            title:
              'Understanding plastic pollution and its impact on lives | Africa Renewal',
            link: 'https://www.un.org/africarenewal/magazine/may-2023/understanding-plastic-pollution-and-its-impact-lives',
          },
        ],
      },
      reduce: {
        alternative:
          'Pens made from alternative materials like, cork, wheat, or corn.',
        altImgs: [
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetshdc02bd2270434a839f8e1de9edc4d885d.webp',
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetshot-selling-wheat-straw-clip-cork-ball-pen-custom-ballpoint-pen.webp',
        ],
        do: 'There is no harm in completely disposing your plastic ballpoint pens and change ',
        cta: 'Go and use an alternative eco-friendly plastic bag such as reusable cloth bag and a biodegradable bag as they are durable, washable and you can reuse it multiple times!',
        links: [
          {
            title:
              'Are Diapers Environmentally Friendly? (Environmental Impact Facts) - Get Green Now (get-green-now.com)',
            link: 'https://get-green-now.com/are-diapers-environmentally-friendly/',
          },
          {
            title:
              '6 Disposable Diaper Alternatives (Eco-Friendly Options) | Parenting Mode',
            link: 'https://parentingmode.com/diaper-alternatives/',
          },
        ],
      },
    },
  },
  other: {
    'plastic utensils': {
      images: [
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3761.webp',
      ],
      what: {
        desc: 'A plastic bag is a type of packaging made of thin, flexible, plastic film, nonwoven fabric, or plastic textile that is used for containing and transporting goods such as foods, produce, powders, ice magazines, chemicals, and wastes.',
        links: [],
      },
      effect: {
        desc: 'Plastic utensils are not recyclable as they are made out of plastic. Plastic utensils are not biodegradable and are not eco-friendly. Plastic utensils are a single-use product that are not biodegradable that ends up on landfills every year. This can take hundreds of years to decompose contributing to many of the greenhouse gas emissions because of its ever-increasing amount that makes the problem worst!',
        links: [],
      },
      reduce: {
        alternative: 'Reusable utensils made out of bamboo, wood, or metal.',
        altImgs: [
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3765.webp',
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3766.webp',
        ],
        do: 'Plastic utensils are not recyclable! They are single-use product that are not biodegradable that ends up on landfills every year. This can take hundreds of years to decompose contributing to many of the greenhouse gas emissions because of its ever-increasing amount that makes the problem worst!',
        cta: 'Go and use an alternative eco-friendly plastic bag such as reusable cloth bag and a biodegradable bag as they are durable, washable and you can reuse it multiple times!',
        links: [],
      },
    },
  },
  variables: {
    'plastic bottles': {
      images: [
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3820.webp',
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3812.webp',
      ],
      what: {
        desc: 'A plastic bottle is a bottle made out of plastic that has a narrow neck  and usually has no handle. It is used to store liquids or dry products. Plastic bottles can be made from different types of plastic, such as PET, PE, PP, or PC.',
        links: [
          {
            title: 'Plastic Bottle - Britannica',
            link: 'https://www.britannica.com/dictionary/bottle',
          },
        ],
      },
      effect: {
        desc: 'Plastic bottles are perceive as a single-use disposable product for buying drinks and are thrown without thought after use. The popularity of disposable plastic bottles that is used by people is a serious issue that is causing major human and environmental problems. Around the world over 1 million plastic water bottles are purchased per minute and close to 400 billion plastic water bottles are produced every year. Plastic bottles take around 400 years to fully degrade in landfills and even longer in natural ecosystems.',
        links: [
          {
            title: 'The Environmental Impact of Plastic Bottles - Greentumble',
            link: 'https://greentumble.com/plastic-bottles-bottled-water-and-the-environment',
          },
        ],
      },
      reduce: {
        alternative: 'Glass, stainless steel, wood bottles',
        altImgs: [
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3791.webp',
          'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3787.webp',
        ],
        do: "Look, you're still using plastic bottles. Do you know that plastic bottles are not disposable? Plastic bottles ended up floating in our oceans that builds up over time and create huge areas of floating plastic in the Pacific Ocean that is estimated to contain 2 million tonnes of plastic waste. That's a lot of Carbon footprint!",
        cta: 'Go and change your plastic bottles to an eco-friendly alternative such as glass water bottles, stainless steel bottles, and bottles made out of wood because one action is never too small to make a difference!',
        links: [
          {
            title: 'Bottled Water Alternatives - Mayu Water',
            link: 'https://mayuwater.com/a/s/blog/bottled-water-alternatives-that-are-eco-friendly-and-sustainable',
          },
        ],
      },
    },
    'greenhouse gases': {
      images: [
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assetsimg_3874.webp',
      ],
      what: {
        desc: "Greenhouse gases are atmospheric gases that trap heat, maintaining Earth's temperature. Human activities have increased their levels, causing climate change.",
        links: [
          {
            title: 'Greenhouse Effect - NASA',
            link: 'https://climate.nasa.gov/faq/19/what-is-the-greenhouse-effect/',
          },
        ],
      },
      effect: {
        desc: "Increased greenhouse gases from human activities have disrupted Earth's energy balance, leading to global warming and climate change.",
        links: [
          {
            title: 'Greenhouse Gas Emissions Data - Our World in Data',
            link: 'https://ourworldindata.org/greenhouse-gas-emissions',
          },
        ],
      },
      reduce: {
        alternative:
          'Scientists had agree that greenhouse gases are the cause of global warming and climate change! Help reduce greenhouse gases by eliminating out fossil fuels, such as coal, oil, and gas and move to a renewable energy just like solar and wind!',
        altImgs: [],
        do: 'Reduce greenhouse gases by cutting fossil fuel use and embracing renewable energy. Individual actions like recycling and using electric vehicles also help.',
        cta: 'We can all play a part in protecting our planet, from simple daily changes, like reusing and recycling, to bigger lifestyle decisions like switching to electric vehicles! There is much more we can do! We believe we all have a responsibility to lead the way and help drive emissions down across the energy sector and have a strategy to do this.',
        links: [
          {
            title: 'Greenhouse Gases Explained - National Grid',
            link: 'https://www.nationalgrid.com/stories/energy-explained/what-are-greenhouse-gases',
          },
        ],
      },
    },
    'carbon footprint': {
      images: [
        'https://raw.githubusercontent.com/huenique/carbonitor/main/assets/assets2.webp',
      ],
      what: {
        desc: 'Carbon footprint is the total greenhouse gas emissions caused by an individual, event, organization, service, or product, expressed as carbon dioxide equivalent.',
        links: [
          {
            title: 'What is a carbon footprint? - Carbon Footprint',
            link: 'https://www.carbonfootprint.com/carbonfootprint.html',
          },
        ],
      },
      effect: {
        desc: 'Carbon footprints are a measure of greenhouse gas emissions. They are a useful tool for individuals and organizations to understand their environmental impact.',
        links: [],
      },
      reduce: {
        alternative: '',
        altImgs: [],
        do: 'Reduce your carbon footprint by cutting fossil fuel use and embracing renewable energy. Individual actions like recycling and using electric vehicles also help.',
        cta: '',
        links: [],
      },
    },
    'plastic by numbers': {
      images: [],
      what: {
        desc: 'The “chasing arrows” symbol on plastics doesn’t guarantee recyclability. It indicates the type of plastic resin used. Most plastics are not recyclable.',
        links: [
          {
            title: 'Plastics by the Numbers - EarthEasy',
            link: 'https://learn.eartheasy.com/articles/plastics-by-the-numbers/',
          },
        ],
      },
      effect: {
        desc: 'Misunderstanding of recycling symbols leads to increased plastic waste. Only certain types of plastics are commonly recycled.',
        links: [
          {
            title: 'The Truth About Plastic Recycling - EESI',
            link: 'https://www.eesi.org/articles/view/qa-how-phony-chasing-arrows-were-run-out-of-california',
          },
        ],
      },
      reduce: {
        alternative: '',
        altImgs: [],
        do: 'Reducing plastic waste requires awareness of plastic types and their recyclability. Opt for reusable products and properly recycle when possible.',
        cta: '',
        links: [
          {
            title: 'Types of Plastic Waste - TRVST',
            link: 'https://www.trvst.world/waste-recycling/plastic-pollution/different-types-of-plastic-waste/',
          },
        ],
      },
    },
  },
};

export type Category = keyof typeof plasticItems;
export type PlasticItem = string;
