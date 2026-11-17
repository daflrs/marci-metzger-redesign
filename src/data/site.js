import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYelp } from 'react-icons/fa6'

export const PHONE_DISPLAY = '(206) 919-6886'
export const PHONE_HREF = 'tel:+12069196886'

export const NAV_LEFT = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
]

export const NAV_RIGHT = [
  { label: 'Listings', action: 'search' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/MarciHomes/', Icon: FaFacebookF },
  { label: 'Instagram', href: 'https://www.instagram.com/marcimetzger_theridge/', Icon: FaInstagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/marci-metzger-30642496/', Icon: FaLinkedinIn },
  { label: 'Yelp', href: 'https://www.yelp.com/biz/xr3yQN_m2SgO0R_7S6p62w', Icon: FaYelp },
]

export const OFFICE = {
  name: 'Marci Metzger — The Ridge Realty Group',
  street: '3190 HW-160, Suite F',
  city: 'Pahrump, Nevada 89048, United States',
  timeZone: 'America/Los_Angeles', // Pahrump runs on Pacific time
  opensAt: 8,
  closesAt: 19,
}

const ADDRESS_QUERY = encodeURIComponent('3190 NV-160 Suite F, Pahrump, NV 89048')

export const MAP_EMBED = `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`