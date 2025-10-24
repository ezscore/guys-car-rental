# Quick Setup Guide

## ⚠️ Important: Node.js Version

Your current Node.js version is **14.15.3**, but this project requires **Node.js 16+**.

### Upgrade Node.js

**Option 1: Using Homebrew (Recommended for macOS)**
```bash
brew update
brew install node@20
```

**Option 2: Using nvm (Node Version Manager)**
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node 20
nvm install 20
nvm use 20
```

**Option 3: Download from nodejs.org**
Visit https://nodejs.org/ and download the LTS version

### Verify Installation
```bash
node --version  # Should show v16.x.x or higher
npm --version   # Should show 8.x.x or higher
```

## Installation Steps

1. **Upgrade Node.js** (see above)

2. **Navigate to project directory:**
```bash
cd "/Users/grayangelo/Guys Car Rental/guys-car-rental"
```

3. **Install dependencies:**
```bash
npm install
```

4. **Start development server:**
```bash
npm run dev
```

5. **Open your browser:**
Visit http://localhost:3005

## Next Steps

### 1. Add Real Images
Create vehicle images and save them to `public/images/`:
- economy-car.jpg
- compact-car.jpg
- midsize-car.jpg
- fullsize-car.jpg
- midsize-jeep.jpg
- luxury-jeep.jpg
- pickup-truck.jpg
- large-suv.jpg
- luxury-suv.jpg
- minivan.jpg
- luxury-car.jpg

### 2. Update Contact Information
If any contact details have changed, update them in:
- `components/Footer.tsx` (lines with phone numbers, email, address)
- `app/contact/page.tsx` (contactInfo object)

### 3. Configure HQ Rental API
When ready to integrate:
1. Get your API credentials from HQ Rental
2. Create `.env.local` file with your API key
3. Update `app/reservations/page.tsx` handleSubmit function

### 4. Test on Mobile
Open on your phone to test responsive design:
```bash
# Find your local IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# Then visit on phone: http://YOUR_IP:3005
```

### 5. Deploy to Production
Easiest option is Vercel:
```bash
npm install -g vercel
vercel
```

## Common Issues

**Issue: "Unexpected token '??='"**
- Solution: Upgrade Node.js to version 16 or higher

**Issue: Port 3005 already in use**
- Solution: Use a different port: `npm run dev -- -p 3006`

**Issue: Module not found**
- Solution: Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## File Structure Overview

```
guys-car-rental/
├── app/                    # Pages
│   ├── page.tsx           # Home page (/)
│   ├── about/             # About Us (/about)
│   ├── fleet/             # Fleet (/fleet)
│   ├── reservations/      # Reservations (/reservations)
│   ├── enhancements/      # Enhancements (/enhancements)
│   └── contact/           # Contact (/contact)
├── components/            # Reusable components
├── data/                  # Vehicle data, locations
├── types/                 # TypeScript types
└── public/               # Static files (images, etc.)
```

## Customization Quick Ref

**Change colors:**
- Edit `tailwind.config.ts`

**Update vehicle inventory:**
- Edit `data/vehicles.ts`

**Modify navigation links:**
- Edit `components/Navigation.tsx`

**Change footer content:**
- Edit `components/Footer.tsx`

## Support

Need help? Contact:
- Email: info@guyscarrental.com
- Phone: 1758 451-7885

---

**Ready to go! Your dad's new website is looking great! 🚗✨**
