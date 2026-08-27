#!/usr/bin/env python3
"""Generate the Guy's Car Rental site.

One generator, one design system, one content source. Every page is emitted from
the same layout so headers, footers, brand colours and the search widget cannot
drift apart between pages.

Run:  python3 build.py     (writes ./public)
"""
import json, os, shutil, html

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT  = os.path.join(ROOT, "public")

SITE = "https://guyscarrentals.com"          # canonical target once DNS moves
BOOK = ("https://guys-car-rental.hqrentals.app/public/car-rental/reservations/"
        "step1?brand=duwllbse-rxod-dgzy-wopr-hlmmmznqflc6&new=true")
MANAGE = ("https://guys-car-rental.hqrentals.app/public/car-rental/reservations/"
          "my-reservations/login?brand_id=duwllbse-rxod-dgzy-wopr-hlmmmznqflc6")
TEL_DISPLAY = "+1 758 451 7885"
TEL_HREF    = "+17584517885"
TEL2_DISPLAY= "+1 758 720 9983"
TEL2_HREF   = "+17587209983"
EMAIL       = "info@guyscarrentals.com"
BING_VERIFICATION = "94C55CE64030293EC46CAEDB2F5F68D0"
INDEXNOW_KEY = "f8155fd4b3093ca6decdaa2b04200128"
GSC_VERIFICATION = "kYy2DJRkiS7czJVndEAFCeiIThr3atP4RPjqWiAbfGY"

# ---------------------------------------------------------------- content data
# Rates and availability were re-verified in the public HQ Rentals booking flow
# on 27 Aug 2026 for a Hewanorra pickup from 10 to 17 Sep 2026. Keep this table
# aligned with the customer-visible booking engine, which is the pricing system
# of record. A class marked unavailable remains visible but cannot be booked.
FLEET = [
    dict(slug="intermediate", name="Intermediate", eg="Mitsubishi Lancer, Subaru Impreza or similar",
         seats=5, doors=4, bags=3, day=65, week=390, sipp="IDAR", avail=True,
         blurb="A full size saloon with room for four adults and real boot space, which is "
               "what most visiting families end up wanting. This is our most booked class."),
    dict(slug="compact-suv", name="Compact SUV", eg="Suzuki Vitara, Mitsubishi ASX or similar",
         seats=5, doors=5, bags=3, day=95, week=570, sipp="CGAR", avail=True,
         blurb="The sensible choice for Saint Lucia. Higher ground clearance for the steep "
               "inland roads to Soufriere and the rainforest, without the fuel bill of a "
               "large SUV."),
    dict(slug="intermediate-suv", name="Intermediate SUV", eg="Mitsubishi RVR, Kia Sportage or similar",
         seats=5, doors=5, bags=4, day=100, week=600, sipp="IGAR", avail=True,
         blurb="More space and more power than the compact, and the class we recommend if "
               "you are staying in the south or plan to drive across the island regularly."),
    dict(slug="standard-suv", name="Standard SUV", eg="Suzuki Grand Vitara, Kia Sportage or similar",
         seats=5, doors=5, bags=4, day=120, week=720, sipp="SGAR", avail=True,
         blurb="A comfortable five seat SUV with enough boot space for a family's luggage "
               "straight off a long haul flight into Hewanorra."),
    dict(slug="full-size-suv", name="Full-size Special SUV", eg="Honda CR-V or similar",
         seats=5, doors=5, bags=4, day=156, week=780, sipp="SFAR", avail=False,
         blurb="Bigger, quieter and better on the hill roads. Worth it if there are five of "
               "you or if you are driving between the north and Soufriere more than once."),
    dict(slug="premium-suv", name="Premium SUV", eg="Suzuki XL7 or similar",
         seats=7, doors=5, bags=5, day=250, week=1500, sipp="PFAR", avail=True,
         blurb="Seven seats, and the class groups and larger families take when everyone and "
               "their luggage has to travel together."),
]

LOCATIONS = [
    dict(slug="hewanorra-uvf", code="UVF", station="UVFT02",
         name="Hewanorra International Airport",
         short="Hewanorra (UVF)",
         addr="Hewanorra Airport Arrival Hall, Vieux Fort", post="LC12 201",
         hours="10:00 to 18:00, seven days", opens="10:00", closes="18:00",
         img="pitons-sunset.jpg",
         alt="The south of Saint Lucia near Vieux Fort",
         lede="Hewanorra is where almost every international flight lands, and it sits at "
              "the southern tip of the island. If you are staying anywhere north of "
              "Soufriere you have a real drive ahead of you, which is exactly why picking "
              "up a car here rather than booking a transfer tends to be the better decision.",
         facts=[("Where","Vieux Fort, at the southern end of the island"),
                ("Best for","Long haul and international arrivals"),
                ("To Soufriere","About 50 minutes"),
                ("To Castries","About 75 minutes"),
                ("To Rodney Bay","About 90 minutes")],
         note="A taxi transfer from Hewanorra to the northern resorts is quoted between "
              "USD 50 and USD 100 each way, per trip. A week in an Economy car costs less "
              "than the return transfer and leaves you with a car for the rest of the stay."),
    dict(slug="george-fl-charles-slu", code="SLU", station="SLUT02",
         name="George F. L. Charles Airport",
         short="George F. L. Charles (SLU)",
         addr="George F. L. Charles Airport, Castries", post="LC04 101",
         hours="07:00 to 18:00, seven days", opens="07:00", closes="18:00",
         img="rodney-bay.jpg",
         alt="Castries and the north west coast of Saint Lucia",
         lede="George F. L. Charles sits in Castries itself, minutes from the north west "
              "coast. It handles regional and inter island flights, so if you are arriving "
              "from Barbados, Martinique, Antigua or Saint Vincent this is almost certainly "
              "your airport, and you are already where most visitors are staying.",
         facts=[("Where","Castries, on the north west coast"),
                ("Best for","Regional and inter island arrivals"),
                ("To Rodney Bay","About 15 minutes"),
                ("To Marigot Bay","About 25 minutes"),
                ("To Soufriere","About 60 minutes")],
         note="This is the busiest of our three counters. If you are arriving on a "
              "regional flight and want a specific class, book ahead rather than walking up."),
    dict(slug="castries-cruise-terminal", code="PORT", station="SLUP01",
         name="Castries Cruise Terminal",
         short="Castries Cruise Terminal",
         addr="Pointe Seraphine, Castries", post="LC04 101",
         hours="08:00 to 18:00, seven days", opens="08:00", closes="18:00",
         img="coast.jpg",
         alt="The Saint Lucia coastline near Castries",
         lede="If your ship calls at Castries you can have a car for the day and see the "
              "island on your own schedule rather than on a coach timetable. Pointe "
              "Seraphine is a short walk from the berth, and we will have the paperwork "
              "ready so you are not spending your one day ashore at a desk.",
         facts=[("Where","Pointe Seraphine, Castries"),
                ("Best for","Cruise passengers and day rentals"),
                ("To Marigot Bay","About 25 minutes"),
                ("To Soufriere and the Pitons","About 60 minutes each way"),
                ("Return by","Your ship's all aboard time")],
         note="Tell us your ship and your all aboard time when you book. We will hold the "
              "car and make sure the return is timed so you are never cutting it fine."),
]

# Saint Lucia's ten administrative districts, as listed by the Central
# Statistical Office. These are service areas, not claims of physical branches.
AREAS = [
    ("Castries", "Capital, cruise port, Vigie and the George F. L. Charles Airport area."),
    ("Gros Islet", "Rodney Bay, Reduit Beach, Pigeon Island and Cap Estate in the north."),
    ("Vieux Fort", "Hewanorra International Airport, Sandy Beach and Moule a Chique."),
    ("Soufriere", "The Pitons, Sulphur Springs, Anse Chastanet and the southwest coast."),
    ("Anse La Raye", "The west-coast village and communities between Castries and Canaries."),
    ("Canaries", "The west-coast district between Anse La Raye and Soufriere."),
    ("Choiseul", "Southwest communities between Soufriere and Laborie."),
    ("Laborie", "The south-coast village and surrounding communities near Vieux Fort."),
    ("Micoud", "East-coast communities between Dennery and Vieux Fort."),
    ("Dennery", "The east-coast village and surrounding communities."),
]

# The questions with real search demand and, per the research, no rental operator
# currently ranking for them.
ANSWERS = [
    dict(slug="driving-permit",
         title="Saint Lucia driving permit: what visitors need",
         h1="Do you need a driving permit to rent a car in St Lucia?",
         desc="Yes. Visitors need a Saint Lucia temporary driving permit alongside their own "
              "licence. Guy's issues it at the counter for USD 23 when you collect the car.",
         q="Do I need a permit to drive in Saint Lucia?",
         body=[
           ("The short answer",
            "Yes. A visiting driver needs a Saint Lucia temporary driving permit as well as a "
            "valid licence from home. It is a legal requirement, not a rental company upsell, "
            "and driving without one leaves you uninsured if anything happens."),
           ("You do not need to find an office",
            "We issue the permit at the counter when you collect the car. It costs USD 23 and "
            "it is added to your rental, so there is no separate trip to a police station or "
            "a licensing office and nothing to arrange before you fly. Bring the licence you "
            "drive on at home and we handle the rest."),
           ("What to bring",
            "Your own current driving licence, the credit card in the main driver's name, and "
            "your passport. If your licence is not in English, bring an International Driving "
            "Permit alongside it. The permit we issue is tied to the licence you present, so "
            "the person collecting the car has to be the person who will drive it."),
           ("Additional drivers",
            "Every driver needs their own permit, so an additional driver pays the USD 23 as "
            "well as the USD 10 per day additional driver charge. Add them at the counter "
            "with their licence present."),
         ]),
    dict(slug="driving-in-st-lucia",
         title="Driving in St Lucia: roads, rules and what to expect",
         h1="Driving in St Lucia, honestly",
         desc="Saint Lucia drives on the left. The roads are narrow, steep and worth it. "
              "What to expect on the coast road, the inland routes and the drive from Hewanorra.",
         q="Which side of the road does Saint Lucia drive on?",
         body=[
           ("We drive on the left",
            "Saint Lucia drives on the left, and most of our fleet is right hand drive and "
            "automatic. If you are coming from North America or continental Europe the first "
            "twenty minutes take concentration, particularly at roundabouts, and after that "
            "most people stop thinking about it."),
           ("The roads are narrow and steep, and that is the point",
            "The main coast road between Castries and Soufriere climbs and descends constantly "
            "with tight switchbacks and few barriers. It is comfortably driveable at a sensible "
            "speed, and the views from it are the reason people rent a car here rather than "
            "sitting in a coach. Allow more time than the distance suggests."),
           ("Do you need a 4x4?",
            "For the main roads and the resorts, no. A Compact SUV is the class we recommend "
            "for most visitors because the extra ground clearance helps on the steeper inland "
            "turnings without the running costs of a large vehicle. If you are heading well "
            "inland on unpaved tracks, take the Premium SUV, which is genuine four wheel drive."),
           ("Practical things nobody tells you",
            "Fuel stations are plentiful in Castries and Rodney Bay and sparse in the south, so "
            "fill up before a long inland run. Drivers here flash their lights to let you "
            "through rather than to warn you off. Minibuses stop without much notice. Rain "
            "comes hard and briefly, and the road surface takes a few minutes to recover."),
         ]),
    dict(slug="deposit-and-payment",
         title="Car rental deposit and payment in St Lucia",
         h1="The deposit, the card and what you actually pay",
         desc="A security deposit from USD 1,500 is held on a credit card at the counter. "
              "Visa, Mastercard, American Express and Diners Club accepted. Cash cannot be used "
              "for the deposit.",
         q="What deposit do I need to rent a car in Saint Lucia?",
         body=[
           ("The deposit is the thing that catches people out",
            "A security deposit is held against a credit card when you collect the car, "
            "starting at USD 1,500 and rising for the larger SUV classes. It is a hold rather "
            "than a payment, and it is released after the car comes back. We publish it here "
            "because arriving at a counter after a long flight and discovering it is the worst "
            "possible moment to find out."),
           ("It has to be a credit card",
            "We accept Visa, Mastercard, American Express and Diners Club. The card must be in "
            "the main driver's name and the driver must be present with it. We cannot take cash "
            "for the deposit, and a debit card will not hold the amount reliably."),
           ("What the rental price includes",
            "Every rental includes unlimited mileage. The daily rate covers the vehicle. Saint "
            "Lucia's country tax of 12.5 percent applies. Insurance, the driving permit at USD "
            "23, an additional driver at USD 10 per day and a young driver charge at USD 10 per "
            "day where it applies are shown separately so you can see what you are choosing."),
           ("Young drivers",
            "Online reservations are available to drivers aged 21 and older. Drivers aged "
            "21 to 24 pay a young driver charge of USD 10 per day. The charge is shown in "
            "the booking flow rather than appearing as a surprise at the counter."),
         ]),
    dict(slug="hewanorra-to-your-hotel",
         title="Getting from Hewanorra (UVF) to your hotel in St Lucia",
         h1="How far is Hewanorra from the resorts?",
         desc="Hewanorra International (UVF) is in the south. Rodney Bay is about 90 minutes, "
              "Castries about 75, Soufriere about 50. What that means for transfers and car hire.",
         q="How far is Hewanorra Airport from Rodney Bay?",
         body=[
           ("The distance is real and worth planning for",
            "Hewanorra sits at the southern tip of the island near Vieux Fort, and the hotels "
            "most visitors book are in the north west around Rodney Bay, Gros Islet and "
            "Castries. That is roughly ninety minutes of driving on a road that is scenic and "
            "slow rather than fast. Nobody enjoys discovering this at the arrivals hall."),
           ("What the alternatives cost",
            "A private taxi transfer is generally quoted between USD 50 and USD 100 each way "
            "depending on the vehicle and the destination, so a return transfer for a family "
            "adds up quickly, and it leaves you without a car for the rest of the week. A "
            "helicopter transfer exists and costs considerably more."),
           ("Why most people end up renting",
            "Over a typical stay, an Economy or Compact SUV rental for the week costs less than "
            "the return transfer alone, and it turns the drive north into the first proper look "
            "at the island rather than a chore. You also get to Soufriere, Marigot Bay and the "
            "east coast on your own schedule."),
           ("If you land at George F. L. Charles instead",
            "SLU is in Castries, about fifteen minutes from Rodney Bay, so the distance problem "
            "does not apply. We have a counter at both airports, and you can collect at one and "
            "return at the other if your outbound flight is from the other end of the island."),
         ]),
]

# --------------------------------------------------------------------- helpers
def esc(t): return html.escape(str(t), quote=True)

def money(n):
    return f"{n:,}"

CAR_SVG = ('<svg class="ghost" viewBox="0 0 220 86" fill="none" stroke="#0B1240" stroke-width="4">'
           '<path d="M18 62h184M38 62c0 8 6 14 14 14s14-6 14-14M156 62c0 8 6 14 14 14s14-6 14-14'
           'M18 62V40l20-26h130l26 26v22" stroke-linecap="round" stroke-linejoin="round"/>'
           '<path d="M64 14v26M124 14v26" stroke-linecap="round"/></svg>')

LOGO = ('<svg class="mk" viewBox="0 0 120 78" aria-hidden="true">'
        '<ellipse cx="60" cy="39" rx="57" ry="35" fill="none" stroke="#DB0000" stroke-width="5"/>'
        '<ellipse cx="60" cy="39" rx="24" ry="35" fill="none" stroke="#DB0000" stroke-width="3.5"/>'
        '<path d="M3 39h114M11 20h98M11 58h98" stroke="#DB0000" stroke-width="3.5" fill="none"/>'
        '<text x="60" y="50" text-anchor="middle" font-family="Georgia,serif" font-weight="700" '
        'font-size="30" fill="#0000CF" stroke="#fff" stroke-width="5" paint-order="stroke">GUY\'S</text>'
        '</svg>')

def nav(active, depth):
    up = "../" * depth
    items = [("Cars", f"{up}fleet/", "fleet"),
             ("Locations", f"{up}locations/", "locations"),
             ("Island-wide", f"{up}areas/", "areas"),
             ("Rates", f"{up}rates/", "rates"),
             ("Driving guide", f"{up}driving-in-st-lucia/", "driving-in-st-lucia"),
             ("Contact", f"{up}contact/", "contact")]
    out = []
    for t, h, k in items:
        cls = ' class="on"' if k == active else ''
        out.append(f'<a href="{h}"{cls}>{t}</a>')
    return "".join(out)

def search_widget(preset=None, compact=False):
    loc = preset or LOCATIONS[0]
    return f'''<div class="search">
      <h2>Check live cars and prices</h2>
      <div class="fgrid">
        <div class="fld sel">
          <span class="flabel">Starting location</span>
          <div class="v">{esc(loc["name"])} <span class="cv">{esc(loc["code"])}</span></div>
          <div class="hint">{esc(loc["facts"][1][1])}. {esc(loc["facts"][0][1])}.</div>
        </div>
        <p class="booking-copy">Choose dates, pickup and return locations, driver details and optional coverage in our secure reservation system. Online bookings are available to drivers aged 21 and older.</p>
        <a class="btn btn-p btn-lg" href="{BOOK}" target="_blank" rel="noopener">Choose dates and see live prices</a>
        <a class="manage-link" href="{MANAGE}" target="_blank" rel="noopener">Already booked? View or cancel a reservation</a>
      </div>
      <div class="beneath">
        <span><span class="tick">&#10003;</span> No booking fee</span>
        <span><span class="tick">&#10003;</span> Live availability</span>
      </div>
    </div>'''

def layout(*, path, title, desc, h1, body, depth=0, active="", jsonld=None,
           hero=None, og="hero-pitons.jpg", indexable=True):
    up = "../" * depth
    canon = f"{SITE}/{path}" if path else f"{SITE}/"
    ld = f'<script type="application/ld+json">{json.dumps(jsonld, separators=(",",":"))}</script>' if jsonld else ""
    heroblock = hero if hero is not None else f'''
<div class="pagehead">
  <div class="wrap"><h1>{h1}</h1></div>
</div>'''
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="{'index,follow' if indexable else 'noindex,follow'}">
<meta name="msvalidate.01" content="{BING_VERIFICATION}">
<meta name="google-site-verification" content="{GSC_VERIFICATION}">
<link rel="canonical" href="{canon}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{SITE}/assets/img/{og}">
<meta property="og:site_name" content="Guy's Car Rental">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0B1240">
<link rel="stylesheet" href="{up}assets/css/site.css">
{ld}
</head>
<body>
<a class="skip" href="#main-content">Skip to main content</a>
<div class="util"><div class="wrap">
  <span><span class="dot"></span>Both airports and the cruise terminal</span>
  <div class="sp"><span>Prices in USD</span>
    <a href="{MANAGE}" target="_blank" rel="noopener">Manage my booking</a>
    <a href="tel:{TEL_HREF}">{TEL_DISPLAY}</a></div>
</div></div>
<header><div class="wrap">
  <a class="logo" href="{up or "./"}">{LOGO}
    <span><b>Guy's Car Rental</b><span>Saint Lucia</span></span></a>
  <nav aria-label="Primary navigation">{nav(active, depth)}</nav>
  <div class="hd-cta">
    <a class="tel" href="tel:{TEL_HREF}"><small>Reservations</small>{TEL_DISPLAY}</a>
    <a class="btn btn-p" href="{BOOK}" target="_blank" rel="noopener">Book a car</a>
  </div>
</div></header>
<main id="main-content">
{heroblock}
{body}
</main>
<footer><div class="wrap">
  <div class="fgr">
    <div>
      <div class="lg">Guy's Car Rental</div>
      <p class="fp">The Caribbean's first certified car rental operator.<br>
      Locally owned and operated in Saint Lucia.<br>
      P.O. Box GM888, Castries, Saint Lucia</p>
      <p class="fp"><a href="tel:{TEL_HREF}">{TEL_DISPLAY}</a>
        <a href="tel:{TEL2_HREF}">{TEL2_DISPLAY}</a>
        <a href="mailto:{EMAIL}">{EMAIL}</a></p>
    </div>
    <div><h4>Cars</h4>{"".join(f'<a href="{up}fleet/{c["slug"]}/">{esc(c["name"])}</a>' for c in FLEET[:5])}
      <a href="{up}fleet/">All vehicles</a></div>
    <div><h4>Locations</h4>{"".join(f'<a href="{up}locations/{l["slug"]}/">{esc(l["short"])}</a>' for l in LOCATIONS)}
      <a href="{up}areas/">Island-wide coverage</a></div>
    <div><h4>Before you drive</h4>{"".join(f'<a href="{up}{a["slug"]}/">{esc(a["h1"])}</a>' for a in ANSWERS)}
      <a href="{up}rates/">Rates and policies</a>
      <a href="{up}rental-terms/">Reservation terms</a>
      <a href="{up}reservation-help/">Manage or cancel a booking</a>
      <a href="{up}privacy/">Privacy</a></div>
  </div>
  <div class="fbot"><span>&copy; 2026 Guys Limited. All rights reserved.</span>
    <span>Prices in US dollars. Saint Lucia country tax 12.5% applies.</span></div>
</div></footer>
<div class="mbar">
  <a class="btn btn-p" href="{BOOK}" target="_blank" rel="noopener">Book a car</a>
  <a class="btn btn-w ic" href="tel:{TEL_HREF}" aria-label="Call Guy's Car Rental">&#9742;</a>
  <a class="btn btn-g ic" href="https://wa.me/{TEL2_HREF.lstrip('+')}" aria-label="WhatsApp Guy's Car Rental">&#128172;</a>
</div>
</body>
</html>'''

def write(relpath, content):
    full = os.path.join(OUT, relpath)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w", encoding="utf-8").write(content)

# ------------------------------------------------------------------- json-ld
ORG = {"@type":"AutoRental","@id":f"{SITE}/#org","name":"Guy's Car Rental",
  "alternateName":"Guys Car Rental",
  "description":"Car rental in St Lucia. The Caribbean's first certified car rental operator, "
                "locally owned, with pickup at Hewanorra International Airport (UVF), George F. L. "
                "Charles Airport (SLU) and the Castries cruise terminal.",
  "url":f"{SITE}/","telephone":f"+1-758-451-7885","email":EMAIL,
  "currenciesAccepted":"USD","paymentAccepted":"Visa, Mastercard, American Express, Diners Club",
  "areaServed":{"@type":"Country","name":"Saint Lucia"},
  "address":{"@type":"PostalAddress","postOfficeBoxNumber":"GM888","addressLocality":"Castries","addressCountry":"LC"}}

def loc_ld(l):
    return {"@type":"AutoRental","@id":f"{SITE}/locations/{l['slug']}/#loc",
      "name":f"Guy's Car Rental, {l['name']}","parentOrganization":{"@id":f"{SITE}/#org"},
      "telephone":"+1-758-451-7885","url":f"{SITE}/locations/{l['slug']}/",
      "address":{"@type":"PostalAddress","streetAddress":l["addr"],
                 "addressLocality":"Castries" if l["code"]!="UVF" else "Vieux Fort",
                 "postalCode":l["post"],"addressCountry":"LC"},
      "openingHoursSpecification":[{"@type":"OpeningHoursSpecification",
        "dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens":l["opens"],"closes":l["closes"]}]}

FAQ_LD = {"@type":"FAQPage","@id":f"{SITE}/#faq","mainEntity":[
    {"@type":"Question","name":a["q"],
     "acceptedAnswer":{"@type":"Answer","text":a["body"][0][1]}} for a in ANSWERS]}

# ------------------------------------------------------------------ page bodies
def home():
    cards = "".join(f'''
      <div class="car">
        <div class="shot"><span class="tag">{esc(c["name"]).upper()}</span>{CAR_SVG}</div>
        <div class="bd">
          <h3>{esc(c["name"])}</h3><p class="eg">{esc(c["eg"])}</p>
          <div class="spec"><span>{c["doors"]} <i>doors</i></span><span>{c["seats"]} <i>seats</i></span><span>Automatic</span></div>
          <div class="price"><div><div class="amt"><sup>$</sup>{c["day"]}</div><div class="per">per day</div></div>
            <div class="wk">${money(c["week"])}<br>7 days</div></div>
          <a class="go" href="fleet/{c["slug"]}/">See this car</a>
        </div>
      </div>''' for c in FLEET[:3])

    answers = "".join(f'''
      <div class="a"><h3>{esc(a["h1"])}</h3><p>{esc(a["body"][0][1])}</p>
        <a class="more" href="{a["slug"]}/">Read more &rarr;</a></div>''' for a in ANSWERS)

    locs = "".join(f'''
      <div class="loc">
        <div class="ph"><img src="assets/img/{l["img"]}" alt="{esc(l["alt"])}" loading="lazy"><span class="code">{esc(l["code"])}</span></div>
        <div class="bd"><h3>{esc(l["name"])}</h3>
          <div class="meta">{"".join(f'<div><b>{esc(k)}</b><span>{esc(v)}</span></div>' for k,v in l["facts"][:3])}</div>
          <a class="more" href="locations/{l["slug"]}/">About this location &rarr;</a>
        </div>
      </div>''' for l in LOCATIONS)

    hero = f'''
<div class="hero">
  <div class="ph"><img src="assets/img/hero-pitons.jpg" alt="Soufriere and the Pitons on the west coast of Saint Lucia" fetchpriority="high"></div>
  <div class="scrim"></div>
  <div class="wrap">
    <div>
      <h1>Car rental in St Lucia, from the island's most established name.</h1>
      <p class="sub">Guy's is the Caribbean's first certified car rental operator, locally owned and
      running at Hewanorra (UVF), George F. L. Charles (SLU) and the Castries cruise terminal.
      Unlimited mileage on every rental, priced in US dollars before you book.</p>
      <div class="pills">
        <span class="pill">Caribbean's 1st certified operator</span>
        <span class="pill">Both airports and the cruise terminal</span>
        <span class="pill"><b>Unlimited</b> mileage</span>
      </div>
    </div>
    {search_widget()}
  </div>
</div>'''

    body = f'''
<section>
  <div class="wrap">
    <div class="shead"><h2>Our St Lucia rental fleet</h2>
      <p>Every rental includes unlimited mileage. Rates are per day before Saint Lucia's 12.5 percent country tax, insurance and anything you add at the counter.</p></div>
    <div class="fleet">{cards}</div>
    <p class="cta-row"><a class="btn btn-o" href="fleet/">See all {len(FLEET)} vehicle classes</a></p>
  </div>
</section>

<section class="s-alt">
  <div class="wrap">
    <div class="shead"><h2>Why visitors book with Guy's</h2>
      <p>Saint Lucia has plenty of rental companies. Very few have been here long enough to be certified, and none of them meets you at all three arrival points.</p></div>
    <div class="ans">
      <div class="a"><h3>The Caribbean's first certified car rental operator</h3>
        <p>Guy's was the first car rental company in the Caribbean to reach certified operator status. In a market where a lot of vehicles are rented informally, that certification is the difference between a company that is audited and one that is not.</p></div>
      <div class="a"><h3>Locally owned, and here for the long run</h3>
        <p>Guy's is Saint Lucian owned and operated, and has sponsored the Saint Lucia Jazz and Arts Festival for twenty five years. We are not a desk that rotates contract staff through the island each season.</p></div>
      <div class="a"><h3>Every way you can arrive on the island</h3>
        <p>Hewanorra for long haul flights, George F. L. Charles for regional arrivals, and the Castries cruise terminal for a day ashore. One company, one account, whichever way you land.</p></div>
      <div class="a"><h3>The price you are quoted is the price</h3>
        <p>Unlimited mileage on every rental, priced in US dollars, with the deposit, the insurance and the driving permit all shown before you commit rather than added at the desk.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="shead"><h2>Driving in St Lucia, answered before you book</h2>
      <p>The questions that decide whether a visitor rents a car here or spends the week in taxis.</p></div>
    <div class="ans">{answers}</div>
  </div>
</section>

<section class="s-alt">
  <div class="wrap">
    <div class="shead"><h2>Car rental pickup across St Lucia</h2>
      <p>Three pickup points. Opening hours for each are on its own page.</p></div>
    <div class="locs">{locs}</div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="strip">
      <div><h2>The deposit, before you arrive rather than after</h2>
        <p>The thing that surprises visitors at a Caribbean rental counter is the security deposit. We publish ours up front so nobody is caught out at the desk with luggage in hand.</p>
        <p><a class="more light" href="deposit-and-payment/">How the deposit works &rarr;</a></p></div>
      <div class="dep">
        <div><span>Security deposit from</span><b>USD 1,500</b></div>
        <div><span>Held on</span><b>Credit card, not cash</b></div>
        <div><span>Cards accepted</span><b>Visa, MC, Amex, Diners</b></div>
        <div><span>Minimum online driver age</span><b>21</b></div>
      </div>
    </div>
  </div>
</section>'''
    return layout(path="", title="Car Rental in St Lucia | Hewanorra UVF & Castries | Guy's Car Rental",
        desc="Car rental in St Lucia from Guy's, the Caribbean's first certified car rental operator. "
             "Pick up at Hewanorra (UVF), George F. L. Charles (SLU) or the Castries cruise terminal. "
             "Unlimited mileage, USD pricing, driving permit issued at the counter.",
        h1="", body=body, depth=0, active="", hero=hero,
        jsonld={"@context":"https://schema.org","@graph":[ORG]+[loc_ld(l) for l in LOCATIONS]+[FAQ_LD]})

def fleet_index():
    rows = "".join(f'''
      <div class="car wide">
        <div class="shot"><span class="tag">{esc(c["name"]).upper()}</span>{CAR_SVG}</div>
        <div class="bd">
          <h3>{esc(c["name"])}</h3><p class="eg">{esc(c["eg"])}</p>
          <p class="cb">{esc(c["blurb"])}</p>
          <div class="spec"><span>{c["doors"]} <i>doors</i></span><span>{c["seats"]} <i>seats</i></span>
            <span>{c["bags"]} <i>bags</i></span><span>Automatic</span><span>Unlimited <i>mileage</i></span></div>
          {"" if c["avail"] else '<p class="avail-no">Currently on request. Call us and we will confirm availability for your dates.</p>'}
          <div class="price"><div><div class="amt"><sup>$</sup>{c["day"]}</div><div class="per">per day</div></div>
            <div class="wk">${money(c["week"])}<br>7 days</div></div>
          <a class="go" href="{c["slug"]}/">See this car</a>
        </div>
      </div>''' for c in FLEET)
    body = f'''
<section><div class="wrap">
  <p class="lede">Six vehicle classes, all automatic, all with unlimited mileage. Rates are per day
  before Saint Lucia's 12.5 percent country tax and anything you add at the counter. The vehicle shown
  is an example of the class rather than a guarantee of a specific model.</p>
  <div class="fleet one">{rows}</div>
</div></section>'''
    return layout(path="fleet/", title="Our Fleet | Car Hire St Lucia | Guy's Car Rental",
        desc="Car hire in St Lucia across six vehicle classes, from Intermediate to Premium SUV. "
             "Automatic, unlimited mileage, USD pricing. Available at Hewanorra (UVF), George F. L. Charles (SLU) and the Castries cruise terminal.",
        h1="Car hire in St Lucia: our fleet", body=body, depth=1, active="fleet")

def fleet_page(c):
    others = "".join(f'<a class="chip" href="../{o["slug"]}/">{esc(o["name"])} <b>${o["day"]}</b></a>'
                     for o in FLEET if o["slug"]!=c["slug"])
    body = f'''
<section><div class="wrap two-col">
  <div>
    <div class="shot big"><span class="tag">{esc(c["name"]).upper()}</span>{CAR_SVG}</div>
    <p class="lede">{esc(c["blurb"])}</p>
    <h2>What is included</h2>
    <ul class="ticks">
      <li>Unlimited mileage on every rental</li>
      <li>Automatic transmission and air conditioning</li>
      <li>Pick up at Hewanorra, George F. L. Charles or the Castries cruise terminal</li>
      <li>Saint Lucia driving permit issued at the counter, USD 23</li>
      <li>Additional driver available at USD 10 per day</li>
    </ul>
    <h2>What is not included</h2>
    <p>Saint Lucia country tax at 12.5 percent, insurance, fuel, and the refundable security deposit
    of USD 1,500 held on a credit card at the counter. Drivers aged 21 to 24 pay a young driver
    charge of USD 10 per day. Everything is shown before you confirm.</p>
    <h2>Other classes</h2>
    <div class="chips">{others}</div>
  </div>
  <aside>
    <div class="pricebox">
      <div class="pb-h">{esc(c["name"])}</div>
      <div class="pb-amt"><sup>$</sup>{c["day"]}<span>per day</span></div>
      <div class="pb-wk">${money(c["week"])} total for 7 days</div>
      <table class="pb-t">
        <tr><td>Seats</td><td>{c["seats"]}</td></tr>
        <tr><td>Doors</td><td>{c["doors"]}</td></tr>
        <tr><td>Luggage</td><td>{c["bags"]} bags</td></tr>
        <tr><td>Transmission</td><td>Automatic</td></tr>
        <tr><td>Mileage</td><td>Unlimited</td></tr>
        <tr><td>Class code</td><td>{esc(c["sipp"])}</td></tr>
      </table>
      <a class="btn btn-p btn-lg" href="{BOOK}" target="_blank" rel="noopener">Check availability</a>
      {"" if c["avail"] else '<a class="btn btn-w btn-lg" href="tel:' + TEL_HREF + '" style="margin-top:8px">Call to confirm this class</a>'}
      <p class="pb-note">Price before Saint Lucia country tax of 12.5%, insurance and any location fee. Airport pickups currently add a 6% airport fee. No booking fee.</p>
    </div>
  </aside>
</div></section>'''
    ld = {"@context":"https://schema.org","@graph":[ORG,
        {"@type":"Product","name":f"{c['name']} car rental in St Lucia",
         "description":c["blurb"],"brand":{"@id":f"{SITE}/#org"},
         "offers":{"@type":"Offer","price":c["day"],"priceCurrency":"USD",
                   "priceValidUntil":"2026-12-31",
                   "availability":"https://schema.org/InStock" if c["avail"] else "https://schema.org/OutOfStock",
                   "url":f"{SITE}/fleet/{c['slug']}/"}}]}
    return layout(path=f"fleet/{c['slug']}/",
        title=f"{c['name']} Car Rental St Lucia | from ${c['day']}/day | Guy's",
        desc=f"Rent a {c['name']} in St Lucia from ${c['day']} per day. {c['eg']}. {c['seats']} seats, "
             f"automatic, unlimited mileage. Pick up at Hewanorra (UVF), George F. L. Charles (SLU) or the cruise terminal.",
        h1=f"{c['name']} car rental in St Lucia", body=body, depth=2, active="fleet", jsonld=ld)

def locations_index():
    cards = "".join(f'''
      <div class="loc">
        <div class="ph"><img src="../assets/img/{l["img"]}" alt="{esc(l["alt"])}" loading="lazy"><span class="code">{esc(l["code"])}</span></div>
        <div class="bd"><h3>{esc(l["name"])}</h3>
          <p class="cb">{esc(l["lede"][:170])}...</p>
          <div class="meta">{"".join(f'<div><b>{esc(k)}</b><span>{esc(v)}</span></div>' for k,v in l["facts"][:3])}</div>
          <a class="more" href="{l["slug"]}/">About this location &rarr;</a></div>
      </div>''' for l in LOCATIONS)
    body = f'''<section><div class="wrap">
  <p class="lede">We have counters at both of Saint Lucia's airports and at the Castries cruise
  terminal, so wherever you arrive there is a car waiting. You can also collect at one and return
  at another if your outbound flight leaves from the other end of the island.</p>
  <div class="locs">{cards}</div>
</div></section>'''
    return layout(path="locations/", title="Car Rental Locations in St Lucia | UVF, SLU & Castries | Guy's",
        desc="Guy's Car Rental locations in St Lucia: Hewanorra International Airport (UVF), George F. L. "
             "Charles Airport (SLU) and the Castries cruise terminal at Pointe Seraphine.",
        h1="Where to collect your car in St Lucia", body=body, depth=1, active="locations")

def location_page(l):
    facts = "".join(f'<tr><td>{esc(k)}</td><td>{esc(v)}</td></tr>' for k,v in l["facts"])
    body = f'''
<section><div class="wrap two-col">
  <div>
    <div class="shot big ph"><img src="../../assets/img/{l["img"]}" alt="{esc(l["alt"])}"></div>
    <p class="lede">{esc(l["lede"])}</p>
    <div class="callout"><p>{esc(l["note"])}</p></div>
    <h2>Finding the counter</h2>
    <p>{esc(l["addr"])}, {esc(l["post"])}, Saint Lucia. Station code {esc(l["station"])}.
    Opening hours are {esc(l["hours"])}. Call {TEL_DISPLAY} if your flight is delayed and we will
    make arrangements rather than releasing your car.</p>
    <h2>What to bring</h2>
    <ul class="ticks">
      <li>Your own current driving licence</li>
      <li>A credit card in the main driver's name for the security deposit</li>
      <li>Your passport</li>
      <li>Your flight number, so we know when to expect you</li>
    </ul>
    <p>We issue the Saint Lucia driving permit here at the counter for USD 23, so there is nothing
    to arrange before you fly. <a href="../../driving-permit/">More about the permit</a>.</p>
  </div>
  <aside>
    <div class="pricebox">
      <div class="pb-h">{esc(l["short"])}</div>
      <table class="pb-t">{facts}
        <tr><td>Hours</td><td>{esc(l["hours"])}</td></tr>
        <tr><td>Station</td><td>{esc(l["station"])}</td></tr>
      </table>
      <a class="btn btn-p btn-lg" href="{BOOK}" target="_blank" rel="noopener">Book at {esc(l["code"])}</a>
      <a class="btn btn-w btn-lg" href="tel:{TEL_HREF}" style="margin-top:8px">Call {TEL_DISPLAY}</a>
    </div>
  </aside>
</div></section>
<section class="s-alt"><div class="wrap">
  <div class="shead"><h2>Cars available at {esc(l["short"])}</h2></div>
  <div class="fleet">{"".join(f"""
    <div class="car"><div class="shot"><span class="tag">{esc(c["name"]).upper()}</span>{CAR_SVG}</div>
      <div class="bd"><h3>{esc(c["name"])}</h3><p class="eg">{esc(c["eg"])}</p>
        <div class="price"><div><div class="amt"><sup>$</sup>{c["day"]}</div><div class="per">per day</div></div></div>
        <a class="go" href="../../fleet/{c["slug"]}/">See this car</a></div></div>""" for c in FLEET[:3])}</div>
</div></section>'''
    return layout(path=f"locations/{l['slug']}/",
        title=f"Car Rental at {l['name']} ({l['code']}) St Lucia | Guy's",
        desc=f"Car rental at {l['name']} ({l['code']}) in St Lucia. {l['facts'][1][1]}. Open {l['hours']}. "
             f"Unlimited mileage, USD pricing, driving permit issued at the counter.",
        h1=f"Car rental at {l['name']}", body=body, depth=2, active="locations",
        og=l["img"], jsonld={"@context":"https://schema.org","@graph":[ORG, loc_ld(l)]})

def answer_page(a):
    secs = "".join(f'<h2>{esc(t)}</h2><p>{esc(p)}</p>' for t,p in a["body"])
    related = "".join(f'<a class="chip" href="../{o["slug"]}/">{esc(o["h1"])}</a>'
                      for o in ANSWERS if o["slug"]!=a["slug"])
    body = f'''
<section><div class="wrap two-col">
  <div class="prose">{secs}
    <h2>Related questions</h2><div class="chips">{related}</div>
  </div>
  <aside>{search_widget()}</aside>
</div></section>'''
    ld = {"@context":"https://schema.org","@graph":[ORG,
      {"@type":"FAQPage","mainEntity":[{"@type":"Question","name":a["q"],
        "acceptedAnswer":{"@type":"Answer","text":a["body"][0][1]}}]}]}
    return layout(path=f"{a['slug']}/", title=a["title"]+" | Guy's Car Rental",
        desc=a["desc"], h1=a["h1"], body=body, depth=1,
        active=a["slug"] if a["slug"]=="driving-in-st-lucia" else "", jsonld=ld)

def rates_page():
    rows = "".join(f'''<tr><td><b>{esc(c["name"])}</b><br><span class="sm">{esc(c["eg"])}</span></td>
      <td class="num">{c["seats"]}</td><td class="num">${c["day"]}</td><td class="num">${money(c["week"])}</td></tr>'''
      for c in FLEET)
    body = f'''
<section><div class="wrap">
  <p class="lede">Every rate below includes unlimited mileage and is quoted in US dollars.
  Saint Lucia's country tax of 12.5 percent is added in the quote, along with anything you choose
  to add. Airport pickups currently add a 6 percent airport fee. Nothing here is a booking fee.</p>
  <table class="rates">
    <tr><th>Vehicle class</th><th class="num">Seats</th><th class="num">Per day</th><th class="num">7 days</th></tr>
    {rows}
  </table>
  <h2>Charges you can add</h2>
  <table class="rates">
    <tr><th>Item</th><th>When it applies</th><th class="num">Price</th></tr>
    <tr><td><b>Saint Lucia driving permit</b></td><td>Required for every visiting driver</td><td class="num">USD 23</td></tr>
    <tr><td><b>Additional driver</b></td><td>Per extra driver, per day</td><td class="num">USD 10 / day</td></tr>
    <tr><td><b>Young driver</b></td><td>Main driver aged 21 to 24, per day</td><td class="num">USD 10 / day</td></tr>
    <tr><td><b>Child seat</b></td><td>Per seat, per day</td><td class="num">USD 12 / day</td></tr>
    <tr><td><b>GPS</b></td><td>Per rental, per day</td><td class="num">USD 15 / day</td></tr>
    <tr><td><b>Collision damage waiver</b></td><td>Optional, tier depends on vehicle</td><td class="num">from USD 15 / day</td></tr>
    <tr><td><b>Airport fee</b></td><td>Applied to airport pickups in the live quote</td><td class="num">6%</td></tr>
  </table>
  <h2>Deposit and payment</h2>
  <p>A refundable security deposit from USD 1,500 is held on a credit card at the counter and
  released after the car is returned. We accept Visa, Mastercard, American Express and Diners Club.
  Cash cannot be used for the deposit. <a href="../deposit-and-payment/">Full deposit and payment terms</a>.</p>
  <h2>The rules, briefly</h2>
  <ul class="ticks">
    <li>Online reservations are available to drivers aged 21 and older. Drivers aged 21 to 24 pay the young driver charge.</li>
    <li>The credit card must be in the main driver's name and the driver must be present.</li>
    <li>Every driver needs their own Saint Lucia driving permit.</li>
    <li>Unlimited mileage on all classes, with no distance cap.</li>
    <li>Collection at one location and return at another can be arranged, subject to availability.</li>
  </ul>
</div></section>'''
    return layout(path="rates/", title="Car Rental Rates in St Lucia | Prices & Policies | Guy's",
        desc="Car rental rates in St Lucia from USD 65 per day with unlimited mileage. Full price list, "
             "additional charges, deposit terms and rental policies from Guy's Car Rental.",
        h1="Car rental rates and policies in St Lucia", body=body, depth=1, active="rates")

def areas_page():
    districts = "".join(f'''<article class="area-card"><h2>{esc(name)}</h2><p>{esc(detail)}</p></article>'''
                        for name, detail in AREAS)
    body = f'''
<section><div class="wrap">
  <p class="lede">Guy's has physical pickup counters at Hewanorra International Airport,
  George F. L. Charles Airport and Castries Cruise Terminal. The reservation system also
  accepts custom pickup and return requests across Saint Lucia, subject to confirmation,
  availability and any fee shown in your quote.</p>
  <div class="callout"><p>Choose the closest official counter for the fastest confirmed pickup.
  If your hotel, villa or community is elsewhere, select a custom location in the booking flow
  and enter the exact address.</p></div>
  <div class="prose"><h2>Popular Saint Lucia rental destinations</h2>
  <p>Guy's serves visitors staying in Soufriere, Rodney Bay, Gros Islet, Castries,
  Vieux Fort, Marigot Bay, Cap Estate, Reduit, Laborie and communities across the island.
  Pickup and return outside an official counter remain subject to confirmation and the fee
  shown in your quote.</p></div>
  <div class="area-grid">{districts}</div>
  <div class="coverage-cta">
    <div><h2>Start with your arrival point</h2><p>Visitors arriving by air or cruise can collect at the terminal, then drive to every district on the island.</p></div>
    <a class="btn btn-p" href="{BOOK}" target="_blank" rel="noopener">Check your dates</a>
  </div>
</div></section>'''
    ld = {"@context":"https://schema.org","@graph":[ORG,
        {"@type":"Service","name":"Car rental pickup and return across Saint Lucia",
         "provider":{"@id":f"{SITE}/#org"},
         "areaServed":[{"@type":"AdministrativeArea","name":name} for name,_ in AREAS],
         "url":f"{SITE}/areas/"}]}
    return layout(path="areas/",
        title="Car Rental in Soufriere, Rodney Bay & Vieux Fort | Guy's",
        desc="Rent a car across Saint Lucia, including Soufriere, Rodney Bay, Gros Islet, Castries, Vieux Fort, Marigot Bay and all 10 districts.",
        h1="Car rental coverage across Saint Lucia", body=body, depth=1, active="areas", jsonld=ld)

def reservation_help_page():
    body = f'''
<section><div class="wrap two-col">
  <div class="prose">
    <h2>View, change or cancel online</h2>
    <p>Open My Reservations and sign in with the email address used for the booking. You can
    review the reservation and use the options available for that booking. Keep the confirmation
    email nearby because it contains the reservation details.</p>
    <p><a class="btn btn-p" href="{MANAGE}" target="_blank" rel="noopener">Open My Reservations</a></p>
    <h2>If the online option is not available</h2>
    <p>Call <a href="tel:{TEL_HREF}">{TEL_DISPLAY}</a>, WhatsApp
    <a href="https://wa.me/{TEL2_HREF.lstrip('+')}">{TEL2_DISPLAY}</a>, or email
    <a href="mailto:{EMAIL}">{EMAIL}</a>. Include the renter's name, reservation number and
    pickup date. Do not send a full card number, password or identity-document image by email or WhatsApp.</p>
    <h2>Cancellation and refunds</h2>
    <p>Any cancellation charge or refund depends on the terms accepted with the reservation and
    the payment already recorded. The team will confirm the result before processing any payment
    adjustment. Cancelling a reservation does not by itself create a card refund.</p>
    <h2>Need to change dates, vehicle class or pickup point?</h2>
    <p>Changes depend on live availability and may change the quote. Contact the team if the
    requested change is not available in My Reservations.</p>
  </div>
  <aside><div class="pricebox">
    <div class="pb-h">Reservation support</div>
    <table class="pb-t">
      <tr><td>Phone</td><td><a href="tel:{TEL_HREF}">{TEL_DISPLAY}</a></td></tr>
      <tr><td>WhatsApp</td><td><a href="https://wa.me/{TEL2_HREF.lstrip('+')}">{TEL2_DISPLAY}</a></td></tr>
      <tr><td>Email</td><td><a href="mailto:{EMAIL}">{EMAIL}</a></td></tr>
    </table>
    <a class="btn btn-p btn-lg" href="{MANAGE}" target="_blank" rel="noopener">Manage my booking</a>
  </div></aside>
</div></section>'''
    return layout(path="reservation-help/",
        title="Manage or Cancel a Guy's Car Rental Booking",
        desc="View, change or cancel a Guy's Car Rental reservation online, or contact the Saint Lucia reservations team for help.",
        h1="Manage or cancel your reservation", body=body, depth=1)

def rental_terms_page():
    body = f'''
<section><div class="wrap prose legal">
  <p class="lede">These website terms explain the online reservation process. Your booking
  confirmation and the rental agreement signed at pickup contain the terms that apply to your rental.</p>
  <h2>Quotes and confirmation</h2>
  <p>Availability and prices come from the live reservation system. A reservation is confirmed only
  when the system issues a confirmation. Vehicle makes and models are examples of a class and are
  not guaranteed.</p>
  <h2>Driver and document requirements</h2>
  <p>Online reservations are available to drivers aged 21 and older. The main driver must present a
  valid driving licence, passport or accepted identification, and a credit card in the main driver's
  name. Visiting drivers must obtain the applicable Saint Lucia driving permit.</p>
  <h2>Price, taxes, fees and deposit</h2>
  <p>The quote shows the selected vehicle, taxes, location fees and optional extras. Insurance choices
  are shown separately. A security deposit is held on an accepted credit card at pickup. The amount
  depends on the vehicle and coverage selected and is shown in the booking flow.</p>
  <h2>Changes and cancellations</h2>
  <p>Changes depend on live availability and may change the price. Use My Reservations or contact the
  team to cancel. Any cancellation charge or refund follows the terms accepted with the booking and
  the payment status. A cancellation does not automatically create a refund.</p>
  <h2>Contact</h2>
  <p>Questions about a quote or reservation can be sent to <a href="mailto:{EMAIL}">{EMAIL}</a> or
  handled by phone at <a href="tel:{TEL_HREF}">{TEL_DISPLAY}</a>.</p>
</div></section>'''
    return layout(path="rental-terms/", title="Online Reservation Terms | Guy's Car Rental",
        desc="Online quote, driver, deposit, payment, change and cancellation terms for Guy's Car Rental reservations in Saint Lucia.",
        h1="Online reservation terms", body=body, depth=1)

def privacy_page():
    body = f'''
<section><div class="wrap prose legal">
  <p class="lede">Effective 27 August 2026. Guys Limited, trading as Guy's Car Rental, uses personal
  information to answer enquiries, prepare quotes, create and operate rentals, prevent fraud and meet
  legal and safety obligations.</p>
  <h2>Information we collect</h2>
  <p>Depending on how you contact or book with us, this can include your name, contact information,
  address, trip and flight details, date of birth, driving-licence details, uploaded documents,
  reservation choices, payment and deposit records, and communications with the team.</p>
  <h2>Where booking information goes</h2>
  <p>The public website sends you to Guy's secure HQ Rental Software reservation system. Service
  providers that support hosting, reservations, payments, communications and site measurement may
  process only the information needed to provide their service. Payment-card details should be entered
  only in the approved payment flow or presented at the rental counter.</p>
  <h2>How we use and protect information</h2>
  <p>We use information for the purpose it was collected, limit access to people and providers who need
  it, and apply reasonable technical and organizational safeguards. We keep records only as long as
  needed for the rental, accounting, legal, safety and dispute-resolution purposes that apply.</p>
  <h2>Your choices and rights</h2>
  <p>You may ask whether we hold your personal information and request access, correction or deletion
  where applicable. You may also object to direct marketing. We may need to verify your identity before
  acting on a request.</p>
  <h2>Contact about privacy</h2>
  <p>Email <a href="mailto:{EMAIL}">{EMAIL}</a>, call <a href="tel:{TEL_HREF}">{TEL_DISPLAY}</a>,
  or write to Guys Limited, P.O. Box GM888, Castries, Saint Lucia.</p>
</div></section>'''
    return layout(path="privacy/", title="Privacy Notice | Guy's Car Rental Saint Lucia",
        desc="How Guys Limited collects, uses, shares, protects and responds to requests about personal information for car rental enquiries and reservations.",
        h1="Privacy notice", body=body, depth=1)

def not_found_page():
    body = f'''<section><div class="wrap empty-state"><h2>That page is not here</h2>
      <p>Start a new reservation, manage an existing booking, or return to the Guy's Car Rental home page.</p>
      <div class="empty-actions"><a class="btn btn-p" href="{BOOK}" target="_blank" rel="noopener">Book a car</a>
      <a class="btn btn-o" href="/">Return home</a></div></div></section>'''
    return layout(path="404/", title="Page Not Found | Guy's Car Rental",
        desc="The requested page could not be found.", h1="Page not found", body=body, depth=0,
        indexable=False)

def contact_page():
    locs = "".join(f'''<div class="ccard"><h3>{esc(l["name"])}</h3>
      <p>{esc(l["addr"])}<br>{esc(l["post"])}, Saint Lucia</p>
      <p class="sm">Open {esc(l["hours"])}<br>Station {esc(l["station"])}</p>
      <a class="more" href="../locations/{l["slug"]}/">About this location &rarr;</a></div>''' for l in LOCATIONS)
    body = f'''
<section><div class="wrap two-col">
  <div>
    <p class="lede">The fastest way to get a car is to check availability online. If you would rather
    talk to a person, or you have a question the site has not answered, we are here.</p>
    <div class="ccards">{locs}</div>
  </div>
  <aside>
    <div class="pricebox">
      <div class="pb-h">Get in touch</div>
      <table class="pb-t">
        <tr><td>Reservations</td><td><a href="tel:{TEL_HREF}">{TEL_DISPLAY}</a></td></tr>
        <tr><td>Alternate</td><td><a href="tel:{TEL2_HREF}">{TEL2_DISPLAY}</a></td></tr>
        <tr><td>Email</td><td><a href="mailto:{EMAIL}">{EMAIL}</a></td></tr>
        <tr><td>Postal</td><td>P.O. Box GM888,<br>Castries, Saint Lucia</td></tr>
      </table>
      <a class="btn btn-p btn-lg" href="{BOOK}" target="_blank" rel="noopener">Check availability</a>
      <a class="btn btn-g btn-lg" href="https://wa.me/{TEL2_HREF.lstrip('+')}" style="margin-top:8px">WhatsApp us</a>
    </div>
  </aside>
</div></section>'''
    return layout(path="contact/", title="Contact Guy's Car Rental St Lucia | Phone, Email & Locations",
        desc="Contact Guy's Car Rental in St Lucia. Reservations +1 758 451 7885, info@guyscarrentals.com, "
             "counters at Hewanorra (UVF), George F. L. Charles (SLU) and the Castries cruise terminal.",
        h1="Contact Guy's Car Rental", body=body, depth=1, active="contact")

# ------------------------------------------------------------------------ main
def main():
    if os.path.isdir(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)

    urls = []
    def emit(rel, content, prio="0.7"):
        write(rel, content)
        if rel == "index.html":
            write("home.html", content)
        # Vercel's clean URL routing resolves flat .html assets. Keep directory
        # indexes as well so the same build works in a plain local web server.
        if rel.endswith("/index.html"):
            write(rel[:-len("/index.html")] + ".html", content)
        page = rel[:-len("index.html")] if rel.endswith("index.html") else rel
        urls.append((f"{SITE}/{page}", prio))

    emit("index.html", home(), "1.0")
    emit("fleet/index.html", fleet_index(), "0.9")
    for c in FLEET: emit(f"fleet/{c['slug']}/index.html", fleet_page(c), "0.8")
    emit("locations/index.html", locations_index(), "0.9")
    for l in LOCATIONS: emit(f"locations/{l['slug']}/index.html", location_page(l), "0.9")
    for a in ANSWERS: emit(f"{a['slug']}/index.html", answer_page(a), "0.8")
    emit("rates/index.html", rates_page(), "0.8")
    emit("areas/index.html", areas_page(), "0.8")
    emit("reservation-help/index.html", reservation_help_page(), "0.6")
    emit("rental-terms/index.html", rental_terms_page(), "0.5")
    emit("privacy/index.html", privacy_page(), "0.4")
    emit("contact/index.html", contact_page(), "0.6")
    write("404.html", not_found_page())

    # assets
    shutil.copytree(os.path.join(ROOT, "assets"), os.path.join(OUT, "assets"))

    write("robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
    # Public IndexNow proof file. This value proves control of the host but is
    # not a credential and is expected to be publicly reachable.
    write(f"{INDEXNOW_KEY}.txt", INDEXNOW_KEY)
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u,p in urls:
        sm.append(f"  <url><loc>{u}</loc><changefreq>weekly</changefreq><priority>{p}</priority></url>")
    sm.append("</urlset>")
    write("sitemap.xml", "\n".join(sm))

    # Redirects from the six legacy PHP URLs so nothing that is already indexed dies.
    write("vercel.json", json.dumps({
      "cleanUrls": True, "trailingSlash": True,
      "redirects": [
        {"source":"/index.php","destination":"/","permanent":True},
        {"source":"/aboutus.php","destination":"/","permanent":True},
        {"source":"/fleet.php","destination":"/fleet/","permanent":True},
        {"source":"/reservations.php","destination":"/fleet/","permanent":True},
        {"source":"/options.php","destination":"/rates/","permanent":True},
        {"source":"/contact.php","destination":"/contact/","permanent":True}]}, indent=2))

    print(f"built {len(urls)} pages into {OUT}")
    for u,_ in urls: print("   ", u)

if __name__ == "__main__":
    main()
