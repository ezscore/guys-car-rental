# Guy's Car Rental website

Static production website for [guyscarrentals.com](https://guyscarrentals.com/).
The public booking and reservation-management journeys are provided by the
Guy's Car Rental tenant in HQ Rental Software.

## Build

```sh
python3 build.py
```

The generator writes the deployable site to `public/`. Business facts, fleet
pricing, locations and page content live in `build.py`. Shared styling and
source photography live under `assets/`.

## Release checks

- Build succeeds and every sitemap route returns HTTP 200 locally.
- Every indexable page has a unique title, description and canonical URL.
- All internal links resolve.
- Structured-data blocks parse as JSON.
- Booking links retain the Guy's HQ Rentals brand identifier.
- The My Reservations link opens the separate reservation-management login.
- Desktop and mobile layouts are reviewed before production deployment.

Do not commit renter information, payment data, credentials or API tokens.
