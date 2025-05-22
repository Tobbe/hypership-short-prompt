/**
 * Formats a price as a currency string
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  }).format(price);
};

/**
 * Generates a date range for the next 14 days
 */
export const generateDateRange = (days: number = 14): string[] => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 1; i <= days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip Sundays (0 is Sunday in JavaScript's getDay())
    if (date.getDay() !== 0) {
      dates.push(date.toISOString().split('T')[0]);
    }
  }
  
  return dates;
};

/**
 * Truncates text to a specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Filters products by search term
 */
export const filterProductsBySearch = <T extends { name: string; description: string }>(
  products: T[],
  searchTerm: string
): T[] => {
  if (!searchTerm) return products;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerCaseSearchTerm) || 
    product.description.toLowerCase().includes(lowerCaseSearchTerm)
  );
};

/**
 * Generates a random order ID
 */
export const generateOrderId = (): string => {
  return `ACM-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};
