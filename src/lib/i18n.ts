// Simple i18n implementation for English/Swahili
export type Language = 'en' | 'sw';

export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    farmers: 'Farmers',
    plots: 'Plots',
    practices: 'Practices',
    verification: 'Verification',
    lots: 'Credit Lots',
    admin: 'Admin',
    about: 'About',
    
    // Common
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    company: 'Company',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    approve: 'Approve',
    reject: 'Reject',
    purchase: 'Purchase',
    
    // Farmer
    farmerName: 'Farmer Name',
    cooperative: 'Cooperative',
    onboardFarmer: 'Onboard New Farmer',
    
    // Plot
    plotSetup: 'Plot Setup',
    county: 'County',
    soilClass: 'Soil Class',
    location: 'Location',
    
    // Practice
    practiceType: 'Practice Type',
    agroforestry: 'Agroforestry',
    coverCrop: 'Cover Cropping',
    quantity: 'Quantity',
    logPractice: 'Log Practice',
    
    // Credits
    carbonCredits: 'Carbon Credits',
    provisional: 'Provisional',
    verified: 'Verified',
    issued: 'Issued',
    tco2e: 'tCO₂e',
    
    // Status
    pending: 'Pending',
    completed: 'Completed',
    available: 'Available',
    sold: 'Sold',
  },
  
  sw: {
    // Navigation
    dashboard: 'Dashibodi',
    farmers: 'Wakulima',
    plots: 'Mashamba',
    practices: 'Shughuli',
    verification: 'Uhakiki',
    lots: 'Mikopo ya Hewa',
    admin: 'Msimamizi',
    about: 'Kuhusu',
    
    // Common
    name: 'Jina',
    phone: 'Simu',
    email: 'Barua pepe',
    company: 'Kampuni',
    save: 'Hifadhi',
    cancel: 'Ghairi',
    submit: 'Wasilisha',
    approve: 'Kubali',
    reject: 'Kataa',
    purchase: 'Nunua',
    
    // Farmer
    farmerName: 'Jina la Mkulima',
    cooperative: 'Ushirika',
    onboardFarmer: 'Sajili Mkulima Mpya',
    
    // Plot
    plotSetup: 'Mpango wa Shamba',
    county: 'Kaunti',
    soilClass: 'Aina ya Udongo',
    location: 'Mahali',
    
    // Practice
    practiceType: 'Aina ya Shughuli',
    agroforestry: 'Kilimo cha Misitu',
    coverCrop: 'Mazao ya Kufunika',
    quantity: 'Kiasi',
    logPractice: 'Rekodi Shughuli',
    
    // Credits
    carbonCredits: 'Hati za Kaboni',
    provisional: 'Ya Muda',
    verified: 'Imehakikiwa',
    issued: 'Imetolewa',
    tco2e: 'tCO₂e',
    
    // Status
    pending: 'Inasubiri',
    completed: 'Imekamilika',
    available: 'Inapatikana',
    sold: 'Imeuzwa',
  }
} as const;

let currentLanguage: Language = 'en';

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
};

export const getLanguage = (): Language => currentLanguage;

export const t = (key: keyof typeof translations.en): string => {
  return translations[currentLanguage][key] || translations.en[key];
};