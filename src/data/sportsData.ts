export interface Sport {
  id: string;
  name: string;
  icon: string;
  image: string;
  description: string;
  popularityScore: number;
}

export interface Venue {
  id: string;
  name: string;
  sport: string;
  location: string;
  address: string;
  rating: number;
  reviews: number;
  pricePerHour: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  indoor: boolean;
  coordinates: { lat: number; lng: number };
  availability: string[];
  peakHours: string[];
  offPeakPrice: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export const sports: Sport[] = [
  {
    id: 'badminton',
    name: 'Badminton',
    icon: '🏸',
    image: 'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjQwNzM4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Indoor courts available for singles and doubles play',
    popularityScore: 95
  },
  {
    id: 'football',
    name: 'Football',
    icon: '⚽',
    image: 'https://images.unsplash.com/photo-1600130202712-fd01014ffa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZpZWxkJTIwc3RhZGl1bXxlbnwxfHx8fDE3NjQxNDg4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Full-size and 5-a-side pitches available',
    popularityScore: 98
  },
  {
    id: 'tennis',
    name: 'Tennis',
    icon: '🎾',
    image: 'https://images.unsplash.com/photo-1566241121793-3e25f3586e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMG91dGRvb3J8ZW58MXx8fHwxNzY0MDk1MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Professional grass and hard courts',
    popularityScore: 92
  },
  {
    id: 'basketball',
    name: 'Basketball',
    icon: '🏀',
    image: 'https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzY0MDQ2NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Indoor and outdoor courts available',
    popularityScore: 89
  },
  {
    id: 'cricket',
    name: 'Cricket',
    icon: '🏏',
    image: 'https://images.unsplash.com/photo-1743612135955-7ec949bfa2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwZ3JvdW5kJTIwZmllbGR8ZW58MXx8fHwxNzY0MTQ4ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Turf and grass wickets for practice and matches',
    popularityScore: 94
  },
  {
    id: 'swimming',
    name: 'Swimming',
    icon: '🏊',
    image: 'https://images.unsplash.com/photo-1615984259949-478df5382a10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBzcG9ydHN8ZW58MXx8fHwxNzY0MTQ4ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Olympic-size pools and training facilities',
    popularityScore: 87
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    icon: '🏐',
    image: 'https://images.unsplash.com/photo-1628314200733-5f7785cdc925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwY291cnQlMjBiZWFjaHxlbnwxfHx8fDE3NjQwOTUwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Beach and indoor volleyball courts',
    popularityScore: 85
  },
  {
    id: 'squash',
    name: 'Squash',
    icon: '🎯',
    image: 'https://images.unsplash.com/photo-1642506539297-6021bf65badc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBhY3Rpb24lMjBlbmVyZ3l8ZW58MXx8fHwxNzY0MTQ4ODk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Professional squash courts with glass walls',
    popularityScore: 78
  }
];

export const venues: Venue[] = [
  {
    id: 'v1',
    name: 'Elite Sports Arena',
    sport: 'badminton',
    location: 'Downtown',
    address: '123 Main Street, Downtown, NY 10001',
    rating: 4.8,
    reviews: 245,
    pricePerHour: 25,
    offPeakPrice: 20,
    image: 'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjQwNzM4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjQwNzM4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1642506539297-6021bf65badc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBhY3Rpb24lMjBlbmVyZ3l8ZW58MXx8fHwxNzY0MTQ4ODk4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    description: 'Premium badminton facility with 6 professional courts, advanced lighting, and air conditioning. Perfect for both casual players and competitive matches.',
    amenities: ['Parking', 'Locker Rooms', 'Showers', 'Refreshments', 'Equipment Rental', 'WiFi', 'Air Conditioning'],
    indoor: true,
    coordinates: { lat: 40.7128, lng: -74.0060 },
    availability: ['6:00 AM', '7:00 AM', '8:00 AM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'],
    peakHours: ['6:00 PM', '7:00 PM', '8:00 PM']
  },
  {
    id: 'v2',
    name: 'Champions Football Club',
    sport: 'football',
    location: 'North District',
    address: '456 Stadium Road, North District, NY 10002',
    rating: 4.9,
    reviews: 389,
    pricePerHour: 80,
    offPeakPrice: 60,
    image: 'https://images.unsplash.com/photo-1600130202712-fd01014ffa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZpZWxkJTIwc3RhZGl1bXxlbnwxfHx8fDE3NjQxNDg4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1600130202712-fd01014ffa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZpZWxkJTIwc3RhZGl1bXxlbnwxfHx8fDE3NjQxNDg4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    description: 'Full-size professional football pitch with premium turf and floodlights. Ideal for 11-a-side matches and tournaments.',
    amenities: ['Parking', 'Changing Rooms', 'Showers', 'Seating Area', 'Floodlights', 'Scoreboard', 'First Aid'],
    indoor: false,
    coordinates: { lat: 40.7580, lng: -73.9855 },
    availability: ['7:00 AM', '8:00 AM', '9:00 AM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
    peakHours: ['6:00 PM', '7:00 PM', '8:00 PM']
  },
  {
    id: 'v3',
    name: 'City Tennis Complex',
    sport: 'tennis',
    location: 'East Side',
    address: '789 Court Avenue, East Side, NY 10003',
    rating: 4.7,
    reviews: 156,
    pricePerHour: 30,
    offPeakPrice: 22,
    image: 'https://images.unsplash.com/photo-1566241121793-3e25f3586e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMG91dGRvb3J8ZW58MXx8fHwxNzY0MDk1MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1566241121793-3e25f3586e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMG91dGRvb3J8ZW58MXx8fHwxNzY0MDk1MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    description: '8 outdoor hard courts with professional surface and lighting. Coaching available on request.',
    amenities: ['Parking', 'Pro Shop', 'Coaching', 'Ball Machine', 'Viewing Area', 'Refreshments'],
    indoor: false,
    coordinates: { lat: 40.7489, lng: -73.9680 },
    availability: ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '5:00 PM', '6:00 PM', '7:00 PM'],
    peakHours: ['5:00 PM', '6:00 PM', '7:00 PM']
  },
  {
    id: 'v4',
    name: 'Hoops Basketball Center',
    sport: 'basketball',
    location: 'West End',
    address: '321 Dunk Drive, West End, NY 10004',
    rating: 4.6,
    reviews: 203,
    pricePerHour: 35,
    offPeakPrice: 28,
    image: 'https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzY0MDQ2NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzY0MDQ2NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    description: 'Indoor basketball facility with professional-grade wooden floors and NBA-standard hoops.',
    amenities: ['Parking', 'Locker Rooms', 'Showers', 'Scoreboard', 'Seating', 'Ball Rental', 'WiFi'],
    indoor: true,
    coordinates: { lat: 40.7414, lng: -74.0055 },
    availability: ['7:00 AM', '8:00 AM', '9:00 AM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
    peakHours: ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
  },
  {
    id: 'v5',
    name: 'Strikers Ground',
    sport: 'cricket',
    location: 'South Park',
    address: '555 Wicket Way, South Park, NY 10005',
    rating: 4.8,
    reviews: 178,
    pricePerHour: 70,
    offPeakPrice: 50,
    image: 'https://images.unsplash.com/photo-1743612135955-7ec949bfa2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwZ3JvdW5kJTIwZmllbGR8ZW58MXx8fHwxNzY0MTQ4ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1743612135955-7ec949bfa2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwZ3JvdW5kJTIwZmllbGR8ZW58MXx8fHwxNzY0MTQ4ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    description: 'Premier cricket ground with turf wicket and practice nets. Suitable for both practice sessions and matches.',
    amenities: ['Parking', 'Pavilion', 'Changing Rooms', 'Practice Nets', 'Equipment Storage', 'Seating'],
    indoor: false,
    coordinates: { lat: 40.7282, lng: -74.0776 },
    availability: ['8:00 AM', '9:00 AM', '10:00 AM', '5:00 PM', '6:00 PM', '7:00 PM'],
    peakHours: ['5:00 PM', '6:00 PM', '7:00 PM']
  },
  {
    id: 'v6',
    name: 'Aqua Sports Club',
    sport: 'swimming',
    location: 'Harbor View',
    address: '888 Pool Plaza, Harbor View, NY 10006',
    rating: 4.9,
    reviews: 312,
    pricePerHour: 20,
    offPeakPrice: 15,
    image: 'https://images.unsplash.com/photo-1615984259949-478df5382a10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBzcG9ydHN8ZW58MXx8fHwxNzY0MTQ4ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1615984259949-478df5382a10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBzcG9ydHN8ZW58MXx8fHwxNzY0MTQ4ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    description: 'Olympic-size swimming pool with heated water and professional training lanes. Lifeguards on duty.',
    amenities: ['Parking', 'Changing Rooms', 'Showers', 'Lockers', 'Sauna', 'Cafe', 'Lifeguard', 'Swimming Aids'],
    indoor: true,
    coordinates: { lat: 40.7061, lng: -74.0087 },
    availability: ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'],
    peakHours: ['6:00 PM', '7:00 PM', '8:00 PM']
  }
];

export const reviews: { [key: string]: Review[] } = {
  v1: [
    {
      id: 'r1',
      userName: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent facilities! The courts are well-maintained and the staff is very friendly. Will definitely come back.',
      date: '2025-11-15'
    },
    {
      id: 'r2',
      userName: 'Mike Chen',
      rating: 4,
      comment: 'Great venue for badminton. Only minor issue is parking can be tight during peak hours.',
      date: '2025-11-10'
    },
    {
      id: 'r3',
      userName: 'Emma Williams',
      rating: 5,
      comment: 'Best badminton courts in the city! Air conditioning is perfect and equipment rental is very convenient.',
      date: '2025-11-05'
    }
  ],
  v2: [
    {
      id: 'r4',
      userName: 'James Rodriguez',
      rating: 5,
      comment: 'Amazing football pitch! The turf quality is outstanding and the floodlights are perfect for evening games.',
      date: '2025-11-18'
    },
    {
      id: 'r5',
      userName: 'David Lee',
      rating: 5,
      comment: 'Professional setup. Our team plays here every week and we love it!',
      date: '2025-11-12'
    }
  ]
};
