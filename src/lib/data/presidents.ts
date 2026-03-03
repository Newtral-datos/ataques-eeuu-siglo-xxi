export type Party = 'republican' | 'democrat';

export interface President {
  id: string;
  name: string;
  period: string;
  image: string;
  countries: string[];
  party: Party;
}

export const partyColors: Record<Party, { fill: string; hover: string }> = {
  republican: { fill: '#E91D0E', hover: '#c41808' },
  democrat: { fill: '#0044aa', hover: '#003388' }
};

export const presidents: President[] = [
  {
    id: 'bush',
    name: 'George W. Bush',
    period: '2001-2009',
    image: 'https://live.staticflickr.com/65535/55124073692_95fa3dd838_n.jpg',
    countries: ['Afganistán', 'Irak', 'Yemen', 'Kenia', 'Siria', 'Pakistán', 'Somalia', 'Etiopía', 'Filipinas', 'Yibuti'],
    party: 'republican'
  },
  {
    id: 'obama',
    name: 'Barack Obama',
    period: '2009-2017',
    image: 'https://live.staticflickr.com/65535/55125195969_47afdd89d7_n.jpg',
    countries: ['Afganistán', 'Irak', 'Yemen', 'Siria', 'Nigeria', 'Pakistán', 'Somalia', 'Libia'],
    party: 'democrat'
  },
  {
    id: 'trump1',
    name: 'Donald Trump',
    period: '2017-2021',
    image: 'https://live.staticflickr.com/65535/55125344785_1e1f455326_n.jpg',
    countries: ['Irak'],
    party: 'republican'
  },
  {
    id: 'biden',
    name: 'Joe Biden',
    period: '2021-2025',
    image: 'https://live.staticflickr.com/65535/55124060927_38e1c8b82b_n.jpg',
    countries: ['Afganistán', 'Irak', 'Yemen', 'Siria', 'Somalia'],
    party: 'democrat'
  },
  {
    id: 'trump2',
    name: 'Donald Trump',
    period: '2025-actualidad',
    image: 'https://live.staticflickr.com/65535/55124073697_01fd6efa07_n.jpg',
    countries: ['Irak', 'Yemen', 'Siria', 'Nigeria', 'Somalia', 'Irán', 'Venezuela'],
    party: 'republican'
  }
];

// Mapping from Spanish country names to English (for GeoJSON matching)
export const countryNameMapping: Record<string, string> = {
  'Afganistán': 'Afghanistan',
  'Irak': 'Iraq',
  'Yemen': 'Yemen',
  'Kenia': 'Kenya',
  'Siria': 'Syria',
  'Nigeria': 'Nigeria',
  'Pakistán': 'Pakistan',
  'Somalia': 'Somalia',
  'Irán': 'Iran',
  'Etiopía': 'Ethiopia',
  'Libia': 'Libya',
  'Filipinas': 'Philippines',
  'Yibuti': 'Djibouti',
  'Venezuela': 'Venezuela'
};
