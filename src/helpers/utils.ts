import { Cross, Edit, Tick } from '@/assets/images';
import { CountryCodes } from '@/common/utility/auto-insurance';
import { GeoReverseResponse } from '@/services/types/automotive-insurance';
import { LocationDetailsProps } from '@/Types/homeInsurance';
import dayjs from 'dayjs';
import { Marker } from 'maplibre-gl';

export function getLocalStorage(name: string) {
  return JSON.parse(localStorage?.getItem(name) as string);
}

export function setLocalStorage(name: string, data: string) {
  localStorage.setItem(name, JSON.stringify(data));
}

/*
 * convert date in dd/mm/yy format to ISO string
 * @param {string} date in dd/mm/yy format
 * @returns {string} date as ISO string
 */
export const dateToISO = (date: string): string => {
  const [day, month, year] = date.split('/');
  return new Date(`${year}-${month}-${day}`).toISOString();
};

export const ofTime = (date: string, start: boolean) => {
  if (start) return dayjs(date).startOf('day').toISOString();
  else return dayjs(date).endOf('day').toISOString();
};

export const getInitial = (name: string) => name?.split(' ').map((n) => n[0]);

export function getStringInsideParentheses(str: string) {
  const json = '[' + str + ']';
  const array = JSON.parse(json);
  return array;
}

export const servicableCountries = (code: string) => {
  if (Object.keys(CountryCodes).includes(code)) return CountryCodes[code];
  else return code;
};

export const generateLocationData = (
  response: GeoReverseResponse
): LocationDetailsProps => {
  return {
    locationID: response?.locationId,
    streetAddress: response?.address.streetAddress,
    region: response?.name,
    countryCode: response?.address.countryCode,
  };
};

export const createMarkerPopup = (
  res: LocationDetailsProps,
  markers: Marker,
  sidbar: string,
  setSideBar?: () => void
) => {
  const { countryCode, locationID, region, streetAddress } = res;
  const existingMarkerArrow = document.getElementById('markerArrow');
  existingMarkerArrow?.remove();
  const existingElement = document.getElementById('marker');
  existingElement?.parentNode?.removeChild(existingElement);
  const element = markers.getElement();
  const div = document.createElement('div');
  const arrow = document.createElement('div');
  div.id = 'marker';
  arrow.id = 'markerArrow';
  const p = document.createElement('p');
  const country = document.createElement('p');
  const Region = document.createElement('p');
  const GeoID = document.createElement('p');
  const Location = document.createElement('p');
  const CountryHeading = document.createElement('span');
  const RegionHeading = document.createElement('span');
  const GeoIDHeading = document.createElement('span');
  country.textContent = 'Country: ';
  Region.textContent = 'Region: ';
  GeoID.textContent = 'GeoID: ';
  CountryHeading.textContent = servicableCountries(countryCode);
  RegionHeading.textContent = streetAddress;
  GeoIDHeading.textContent = locationID;
  country.appendChild(CountryHeading);
  Region.appendChild(RegionHeading);
  GeoID.appendChild(GeoIDHeading);
  Location.textContent = 'Location Details';

  div.className = 'pin-hover -top-[90px]';
  arrow.className = 'pin-hover-arrow';
  const button = document.createElement('button');
  button.textContent = 'Confirm Location';
  button.className = 'location-popup-btn';
  p.className = 'location-pop-up mb-3';
  p.textContent = region;

  Location.className =
    'text-[11px] font-medium leading[14px] pb-2 border-b border-gray-variant-11/[30] mb-3';
  country.className = 'text-[13px] leading-4 font-medium mb-1';
  GeoID.className = 'text-[13px] leading-4 font-medium mb-1';
  CountryHeading.className = 'location-pop-up_ans';
  RegionHeading.className = 'location-pop-up_ans ';
  GeoIDHeading.className = 'location-pop-up_ans ';
  Region.className = 'text-[13px] leading-4 font-medium mb-1';

  div.appendChild(p);
  div.appendChild(Location);
  div.appendChild(country);
  if (RegionHeading.textContent != '') {
    div.appendChild(Region);
  }
  div.appendChild(GeoID);

  if (sidbar != 'risk') div.appendChild(button);

  element?.appendChild(div);
  element?.appendChild(arrow);
  button.addEventListener('click', () => {
    if (setSideBar != undefined) setSideBar();
  });
};

export const createElevationMarkerPopup = (
  markers: Marker,
  height: string,
  handleConfirm: () => void
) => {
  const element = markers.getElement();
  const div = document.createElement('div');
  div.id = 'elevation-input';

  const input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('value', parseFloat(height).toFixed(2));
  input.style.width = '115px';
  input.className =
    'h-8 w-32 flex items-center bg-primary-gray/[0.12] px-3 font-medium text-xs text-primary-gray leading-[15px] focus:outline-none mr-3 hidden';
  div.className =
    'absolute bg-white border border-gray-variant-10 rounded-5 right-full text-lg font-apercu z-20 top-3 flex items-center px-3 py-2';
  const inputContainer = document.createElement('div');
  const title = document.createElement('span');
  const heightVal = document.createElement('span');
  const unit = document.createElement('span');
  unit.className = 'mr-1';
  title.textContent = 'Elevation :';
  heightVal.textContent = parseFloat(height).toFixed(2);
  unit.textContent = 'mtrs';
  inputContainer.className =
    'flex gap-1 items-center text-primary-gray w-full whitespace-nowrap font-medium text-sm leading-17 flex mr-2.5';
  inputContainer.appendChild(title);
  inputContainer.appendChild(heightVal);
  inputContainer.appendChild(unit);
  const buttonContainer = document.createElement('div');
  const buttonSubmitContainer = document.createElement('div');
  buttonContainer.className = 'flex items-center min-w-[16px] cursor-pointer';
  buttonSubmitContainer.className =
    'hidden items-center min-w-[40px] cursor-pointer';
  const buttonEdit = document.createElement('img');
  const buttonTick = document.createElement('img');
  const buttonCross = document.createElement('img');

  buttonEdit.className = 'w-4 h-4';
  buttonTick.className = 'w-4 h-4 mr-3';
  buttonCross.className = 'w-4 h-4';
  buttonEdit.src = Edit;
  buttonTick.src = Tick;
  buttonCross.src = Cross;
  buttonSubmitContainer.appendChild(buttonTick);
  buttonSubmitContainer.appendChild(buttonCross);
  buttonEdit.addEventListener('click', () => {
    if (handleConfirm != undefined) {
      input.classList.remove('hidden');
      buttonSubmitContainer.classList.remove('hidden');
      input.classList.add('flex');
      buttonSubmitContainer.classList.add('flex');
      // buttonCross.classList.add('flex');

      inputContainer.classList.remove('flex');
      buttonContainer.classList.remove('flex');
      inputContainer.classList.add('hidden');
      buttonContainer.classList.add('hidden');
    }
  });
  buttonCross.addEventListener('click', () => {
    if (handleConfirm != undefined) {
      input.classList.remove('flex');
      buttonSubmitContainer.classList.remove('flex');
      input.classList.add('hidden');
      buttonSubmitContainer.classList.add('hidden');

      inputContainer.classList.remove('hidden');
      buttonContainer.classList.remove('hidden');
      inputContainer.classList.add('flex');
      buttonContainer.classList.add('flex');
    }
  });

  let inpuValue = input.value;
  const countDecimals = (value: number) => {
    if (Math.floor(value) === value) return 0;
    return value?.toString()?.split('.')[1]?.length || 0;
  };
  input.addEventListener('input', () => {
    if (input.value) {
      input.classList.remove('border-error');
      input.classList.remove('border');
    }
    if (countDecimals(parseFloat(input.value)) > 2) {
      input.value = inpuValue;
    } else {
      inpuValue = input.value;
    }
  });
  buttonTick.addEventListener('click', () => {
    if (handleConfirm != undefined && input.value) {
      handleConfirm();
    } else {
      input.classList.add('border-error');
      input.classList.add('border');
    }
  });
  div.appendChild(input);
  buttonContainer.appendChild(buttonEdit);
  div.appendChild(inputContainer);
  div.appendChild(buttonContainer);
  div.appendChild(buttonSubmitContainer);
  element?.appendChild(div);
  input.onmousedown = (e) => {
    e.stopPropagation();
  };
  input.onkeydown = (e) => {
    e.stopPropagation();
  };
};

export const createCustomButtonPopup = (
  icon: string,
  id: string,
  position: string,
  action: () => void
) => {
  const existingElement = document.getElementById('map');
  const Icon = document.createElement('img');
  Icon.src = icon;
  Icon.className = `fixed ${position}  bg-white cursor-pointer`;
  Icon.addEventListener('click', () => {
    action();
  });
  Icon.id = id;
  existingElement?.appendChild(Icon);
};

export const createMarker = (icon: string) => {
  const element = document.createElement('div');
  const span = document.createElement('span');
  span.className = 'absolute top-4 left-6 text-white font-bold text-base';
  // span.textContent = '6';
  span.textContent = '';
  element.appendChild(span);
  element.style.backgroundImage = 'url(' + icon + ')';
  element.style.backgroundRepeat = 'no-repeat';
  element.style.width = 52 + 'px';
  element.style.height = 104 + 'px';
  return element;
};
