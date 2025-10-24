# Guy's Car Rental - Modern Website

A modern, responsive website for Guy's Car Rental, St. Lucia's premier car rental service.

## Features

### Core Functionality
- ✅ **Modern, Responsive Design** - Mobile-first approach with beautiful UI
- ✅ **Vehicle Fleet Management** - Filterable vehicle catalog with detailed specs
- ✅ **Multi-Step Reservation System** - User-friendly booking process ready for HQ Rental API
- ✅ **Interactive Contact Form** - With CAPTCHA protection
- ✅ **WhatsApp Integration** - Floating button for instant customer contact
- ✅ **Multiple Locations** - Interactive map showing all 4 rental locations
- ✅ **Rental Enhancements** - Add-ons and insurance options

### Pages
1. **Home** - Hero section, featured vehicles, company overview, achievements
2. **About Us** - Company history, values, achievements timeline
3. **Fleet** - Complete vehicle catalog with filtering (type, price, passengers)
4. **Reservations** - 5-step booking process (HQ Rental API ready)
5. **Rental Enhancements** - Add-ons, insurance options, policies
6. **Contact** - Contact form, location map, business info

### Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Google Material Icons
- **Forms**: React Hook Form (ready to integrate)
- **Maps**: Leaflet/React-Leaflet (structure ready)

## Getting Started

### Prerequisites
- Node.js 16+ (Note: Your current version is 14.15.3 - you'll need to upgrade)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd guys-car-rental
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3005](http://localhost:3005) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
guys-car-rental/
├── app/                          # Next.js App Router pages
│   ├── about/page.tsx           # About Us page
│   ├── fleet/page.tsx           # Fleet page with filtering
│   ├── reservations/page.tsx    # Multi-step reservation form
│   ├── enhancements/page.tsx    # Rental enhancements
│   ├── contact/page.tsx         # Contact page
│   ├── layout.tsx               # Root layout with Nav & Footer
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── Navigation.tsx           # Responsive navigation
│   ├── Footer.tsx               # Footer with WhatsApp button
│   ├── Hero.tsx                 # Hero section with booking widget
│   ├── VehicleCard.tsx          # Vehicle display card
│   └── VehicleFilter.tsx        # Fleet filtering sidebar
├── types/                        # TypeScript type definitions
│   └── index.ts                 # Vehicle, Location, Reservation types
├── data/                         # Static data
│   └── vehicles.ts              # Vehicle inventory, locations, enhancements
└── public/                       # Static assets
    └── images/                  # Vehicle placeholder images
```

## HQ Rental API Integration

The reservation form is structured to integrate with the HQ Rental API. To complete the integration:

1. Create an API route at `app/api/hq-rental/route.ts`
2. Add your HQ Rental API credentials to environment variables
3. Update the `handleSubmit` function in `app/reservations/page.tsx`

Example integration point (line ~150 in reservations/page.tsx):

```typescript
const handleSubmit = async () => {
  // TODO: Replace with actual HQ Rental API call
  const response = await fetch('/api/hq-rental', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  // Handle response
};
```

## Customization

### Colors
Update theme colors in `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: '#0066FF',  // Main blue
    light: '#00B4D8',    // Light blue
    dark: '#0047B3',     // Dark blue
  },
  accent: {
    DEFAULT: '#FF6B35',  // Orange CTA
    light: '#FF8C61',
    dark: '#E65529',
  },
}
```

### Vehicle Data
Update vehicle inventory in `data/vehicles.ts`:
- Add/remove vehicles
- Update pricing
- Modify equipment lists
- Change featured vehicles

### Contact Information
Update contact details in:
- `components/Footer.tsx`
- `app/contact/page.tsx`
- `data/vehicles.ts` (locations)

## Adding Real Images

Replace placeholder images in `public/images/`:

Required images:
- `economy-car.jpg`
- `compact-car.jpg`
- `midsize-car.jpg`
- `fullsize-car.jpg`
- `midsize-jeep.jpg`
- `luxury-jeep.jpg`
- `pickup-truck.jpg`
- `large-suv.jpg`
- `luxury-suv.jpg`
- `minivan.jpg`
- `luxury-car.jpg`

Recommended size: 800x600px, optimized for web

## Environment Variables

Create a `.env.local` file for sensitive data:

```env
# HQ Rental API
NEXT_PUBLIC_HQ_RENTAL_API_KEY=your_api_key
NEXT_PUBLIC_HQ_RENTAL_API_URL=https://api-docs.hqrentalsoftware.com

# Email (for contact form)
EMAIL_SERVICE_API_KEY=your_email_api_key

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key
```

## Features to Implement Next

### High Priority
- [ ] HQ Rental API integration for reservations
- [ ] Email service for contact form
- [ ] Real vehicle images
- [ ] Google Maps integration for locations
- [ ] Payment processing integration

### Medium Priority
- [ ] Customer reviews/testimonials section
- [ ] FAQ page
- [ ] Blog for travel tips
- [ ] Multi-language support (English/French)
- [ ] Loyalty program page

### Nice to Have
- [ ] Customer portal for managing reservations
- [ ] Live chat integration
- [ ] Vehicle availability calendar
- [ ] Special offers/promotions system
- [ ] Newsletter subscription backend

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse score target: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Core Web Vitals optimized

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
Build the production bundle:
```bash
npm run build
```

Deploy the `.next` folder and `package.json` to your hosting provider.

## Support

For questions or issues:
- Email: info@guyscarrental.com
- Phone: 1758 451-7885 / 1758 451-7147
- WhatsApp: +1 (758) 451-7885

## License

© 2024 Guy's Car Rental. All Rights Reserved.

---

**Built with ❤️ for Guy's Car Rental, St. Lucia's Premier Car Rental Service**
