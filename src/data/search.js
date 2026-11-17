export const PROPERTY_TYPES = ['Single-family', 'Manufactured', 'Land', 'Commercial', 'Condo/Townhome']

// Her original eight sort options, unchanged
export const SORT_OPTIONS = [
  'Newest',
  'Oldest',
  'Least Expensive to Most',
  'Most Expensive to Least',
  'Bedrooms (Low to High)',
  'Bedrooms (High to Low)',
  'Bathrooms (Low to High)',
  'Bathrooms (High to Low)',
]

export const BEDROOM_OPTIONS = [
  { value: '', label: 'Any Number' },
  { value: 'studio', label: 'Studio' },
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ value: String(n), label: `${n}+` })),
]

export const BATH_OPTIONS = [
  { value: '', label: 'Any Number' },
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ value: String(n), label: `${n}+` })),
]

export const MIN_PRICES = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000, 750000]
export const MAX_PRICES = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 500000, 750000, 1000000]

export const formatPrice = (n) => (n >= 1000000 ? `$${n / 1000000}M` : `$${n / 1000}K`)