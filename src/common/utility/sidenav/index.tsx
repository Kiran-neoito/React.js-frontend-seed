import {
  AUTOMOTIVE_INSURANCE,
  HOME_INSURANCE,
  USER_MANAGEMENT,
  ORGANISATION,
} from '@/common/urlConstants';
import {
  AutoInsurance,
  HomeInsurance,
  Settings,
  Dashboard,
  Organisation,
} from '@/assets/images';

export const SIDE_NAV_TABS = [
  {
    name: 'Dashboard',
    url: '#',
    image: Dashboard,
    isDisabled: true,
  },
  {
    name: 'Home Insurance',
    url: HOME_INSURANCE,
    image: HomeInsurance,
    isDisabled: false,
  },
  {
    name: 'Automotive Insurance',
    url: AUTOMOTIVE_INSURANCE,
    image: AutoInsurance,
    isDisabled: false,
  },
  {
    name: 'Manage Users',
    url: USER_MANAGEMENT,
    image: Settings,
    isDisabled: true,
  },
  {
    name: 'Organization',
    url: ORGANISATION,
    image: Organisation,
    isDisabled: false,
  },
];
