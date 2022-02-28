import GoogleAdsModule from './GoogleAdsModule';
import GAdsConversionTracking from '../steps/GAdsConversionTracking';
import MicrosoftAdsModule from './MSAdsModule';
import MicrosoftAdsConversionTracking from '../steps/MicrosoftAdsConversionTracking';
import GoogleUAModule from './GoogleUAModule';
import GUATracking from '../steps/GUATracking';
import GoogleAnalytics4Module from './GoogleAnalytics4Module';
import GoogleAnalytics4Tracking from '../steps/GoogleAnalytics4Tracking';

export const AVAILABLE_MODULES = [
  {
    name: 'Google Ads Conversion Tracking + Remarketing',
    page: GAdsConversionTracking,
    mod: GoogleAdsModule,
  },
  {
    name: 'Microsoft Ads Conversion Tracking',
    page: MicrosoftAdsConversionTracking,
    mod: MicrosoftAdsModule
  },
  {
    name: 'Google Analytics 4',
    page: GoogleAnalytics4Tracking,
    mod: GoogleAnalytics4Module
  },
  {
    name: 'Google Universal Analytics',
    page: GUATracking,
    mod: GoogleUAModule,
  },
]