import { useState, useEffect, useCallback } from "react";

const FONT = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
const C = { cream:"#faf7f2", dark:"#1a1209", ink:"#2d1f0e", gold:"#c9973a", gold2:"#e8c070", teal:"#2a6b6e", rose:"#c05b4a", muted:"#9c8a76", border:"#e8ddd0", sand:"#f5ede0", white:"#ffffff" };

/* ── photo data ── */
const PHOTOS = {
  "Oia Village": [
    { url:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=80", cap:"Oia's blue-domed churches at sunset" },
    { url:"https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=900&q=80", cap:"Whitewashed houses over the caldera" },
    { url:"https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80", cap:"The world-famous Santorini sunset" },
    { url:"https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=900&q=80", cap:"Cobblestone alleys of Oia village" },
  ],
  "Akrotiri": [
    { url:"https://images.unsplash.com/photo-1555993539-1732b0258235?w=900&q=80", cap:"Red Beach — volcanic cliffs and crimson sands" },
    { url:"https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=900&q=80", cap:"Volcanic landscape near Akrotiri" },
    { url:"https://images.unsplash.com/photo-1481026469463-66327c86e544?w=900&q=80", cap:"Aerial view of Santorini's south coast" },
  ],
  "Fira Town": [
    { url:"https://images.unsplash.com/photo-1567502669-83a02cefc6c0?w=900&q=80", cap:"Fira's cliffside church towers" },
    { url:"https://images.unsplash.com/photo-1519481691678-c2ba5d0f7a30?w=900&q=80", cap:"Cable car down the volcanic cliff" },
    { url:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=80", cap:"Fira panorama over the caldera" },
  ],
  "Arashiyama Bamboo Grove": [
    { url:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80", cap:"Towering bamboo corridor at dawn" },
    { url:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80", cap:"Morning light through bamboo stalks" },
    { url:"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=900&q=80", cap:"Tenryu-ji Zen garden in autumn" },
    { url:"https://images.unsplash.com/photo-1554797589-7241bb691973?w=900&q=80", cap:"Togetsukyo Bridge over the Oi River" },
  ],
  "Fushimi Inari": [
    { url:"https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=900&q=80", cap:"Thousands of vermilion torii gates" },
    { url:"https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=900&q=80", cap:"Pre-dawn mist through the corridor" },
    { url:"https://images.unsplash.com/photo-1624601573012-efb68931cc8f?w=900&q=80", cap:"Stone fox guardian at the shrine" },
    { url:"https://images.unsplash.com/photo-1569466895729-b9b68e1f2db5?w=900&q=80", cap:"View over Kyoto from the summit" },
  ],
  "Kinkaku-ji": [
    { url:"https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900&q=80", cap:"Golden Pavilion reflected in Mirror Pond" },
    { url:"https://images.unsplash.com/photo-1559818897-d33e3f5c6abc?w=900&q=80", cap:"Autumn maple leaves frame the temple" },
    { url:"https://images.unsplash.com/photo-1580922014732-f5e6f7dd6c9c?w=900&q=80", cap:"Winter snow at Kinkaku-ji" },
  ],
  "Jemaa el-Fna": [
    { url:"https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=900&q=80", cap:"The legendary square alive at dusk" },
    { url:"https://images.unsplash.com/photo-1562456600-7a7b66694f03?w=900&q=80", cap:"Street food smoke rising over the crowd" },
    { url:"https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80", cap:"Storytellers at the heart of Marrakech" },
  ],
  "Jardin Majorelle": [
    { url:"https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?w=900&q=80", cap:"The iconic cobalt-blue walls" },
    { url:"https://images.unsplash.com/photo-1576688539853-8a90e8fa9e9f?w=900&q=80", cap:"Exotic cactus garden paths" },
    { url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", cap:"Berber Museum entrance" },
  ],
  "Bahia Palace": [
    { url:"https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&q=80", cap:"Carved plasterwork of the Grand Courtyard" },
    { url:"https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=900&q=80", cap:"Mosaic zellige tilework" },
    { url:"https://images.unsplash.com/photo-1548032885-b5e38734688a?w=900&q=80", cap:"Arched colonnades of the palace" },
  ],
  "Amalfi": [
    { url:"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&q=80", cap:"Amalfi from the Tyrrhenian Sea" },
    { url:"https://images.unsplash.com/photo-1534957753291-e9c83f2c64e7?w=900&q=80", cap:"Lemon groves on the coastline" },
    { url:"https://images.unsplash.com/photo-1530099486328-e021101a494a?w=900&q=80", cap:"Cathedral of Sant'Andrea" },
  ],
  "Positano": [
    { url:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80", cap:"Pastel houses tumbling to the beach" },
    { url:"https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=900&q=80", cap:"Golden hour on the cliffside village" },
    { url:"https://images.unsplash.com/photo-1555990793-da11153b2473?w=900&q=80", cap:"Bougainvillea with sea view" },
  ],
  "Ravello": [
    { url:"https://images.unsplash.com/photo-1555400082-5bfad8e5abe2?w=900&q=80", cap:"Villa Rufolo garden terrace above the clouds" },
    { url:"https://images.unsplash.com/photo-1567459169668-07c4a4f63f27?w=900&q=80", cap:"Ravello hilltop at sunrise" },
    { url:"https://images.unsplash.com/photo-1534957753291-e9c83f2c64e7?w=900&q=80", cap:"Villa Cimbrone Terrace of Infinity" },
  ],
  "Tegallalang": [
    { url:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80", cap:"Cascading emerald rice terraces" },
    { url:"https://images.unsplash.com/photo-1573790387438-4da905039392?w=900&q=80", cap:"Sunrise mist through the paddies" },
    { url:"https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&q=80", cap:"Palm trees above the terraced hillside" },
    { url:"https://images.unsplash.com/photo-1531169509526-f8f1fdaa4a67?w=900&q=80", cap:"Ancient subak irrigation system" },
  ],
  "Tirta Empul": [
    { url:"https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=900&q=80", cap:"Sacred spring pools at the temple" },
    { url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", cap:"Worshippers purifying in holy water" },
    { url:"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=900&q=80", cap:"Ornate split gate of the temple" },
  ],
  "Mount Batur": [
    { url:"https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=900&q=80", cap:"Trekkers at the summit at first light" },
    { url:"https://images.unsplash.com/photo-1531169509526-f8f1fdaa4a67?w=900&q=80", cap:"Sunrise above the clouds" },
    { url:"https://images.unsplash.com/photo-1573790387438-4da905039392?w=900&q=80", cap:"The volcanic crater lake at dawn" },
  ],
  "Hagia Sophia": [
    { url:"https://images.unsplash.com/photo-1527838832700-5059252407fa?w=900&q=80", cap:"Hagia Sophia illuminated at night" },
    { url:"https://images.unsplash.com/photo-1519783158521-70975498b5bc?w=900&q=80", cap:"Hagia Sophia and Blue Mosque at dusk" },
    { url:"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=900&q=80", cap:"Byzantine mosaics in the grand nave" },
    { url:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=80", cap:"Golden calligraphy medallions" },
  ],
  "Topkapi Palace": [
    { url:"https://images.unsplash.com/photo-1532939163844-547f958e91b4?w=900&q=80", cap:"Harem with Iznik tile decoration" },
    { url:"https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=900&q=80", cap:"Imperial Treasury" },
    { url:"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=900&q=80", cap:"Gate of Salutation courtyard" },
  ],
  "Grand Bazaar": [
    { url:"https://images.unsplash.com/photo-1584647567985-0b4e8c5ceaa8?w=900&q=80", cap:"Turkish ceramics and textiles on display" },
    { url:"https://images.unsplash.com/photo-1514690635359-fa9a9a47d63b?w=900&q=80", cap:"Gilded vaulted corridors" },
    { url:"https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=900&q=80", cap:"Colourful lanterns cascading from stalls" },
    { url:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=80", cap:"Gold jewellery stall" },
  ],
};

const HERO = {
  1:["https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80","https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80","https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200&q=80"],
  2:["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80","https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80","https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1200&q=80","https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&q=80"],
  3:["https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80","https://images.unsplash.com/photo-1562456600-7a7b66694f03?w=1200&q=80","https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?w=1200&q=80","https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80"],
  4:["https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80","https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80","https://images.unsplash.com/photo-1534957753291-e9c83f2c64e7?w=1200&q=80","https://images.unsplash.com/photo-1555990793-da11153b2473?w=1200&q=80"],
  5:["https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80","https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&q=80","https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=1200&q=80","https://images.unsplash.com/photo-1531169509526-f8f1fdaa4a67?w=1200&q=80"],
  6:["https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200&q=80","https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80","https://images.unsplash.com/photo-1519783158521-70975498b5bc?w=1200&q=80","https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80"],
};

const TRIPS = [
  {id:1,destination:"Santorini, Greece",country:"Greece",city:"Santorini",startDate:"2025-04-12",endDate:"2025-04-19",price:1850,budget:400,totalSeats:20,bookedSeats:14,month:"April",hotel:"Canaves Oia Suites",transport:"Charter flight + transfers",description:"Experience the iconic whitewashed villages, volcanic beaches, and legendary sunsets of Santorini. This 7-day luxury escape combines relaxation, culture, and authentic Greek cuisine on the rim of a dormant volcano.",tags:["Islands","Luxury","Beach"],itinerary:[{day:1,title:"Arrival & Oia Village",desc:"Welcome reception, hotel check-in, sunset walk in Oia."},{day:2,title:"Akrotiri Excavations",desc:"Bronze Age city, Red Beach, traditional cooking class."},{day:3,title:"Caldera Catamaran Cruise",desc:"Sailing the caldera, hot springs swim, BBQ on board."},{day:4,title:"Fira & Wine Tasting",desc:"Explore Fira town, winery tour in Pyrgos."},{day:5,title:"Black Sand Beaches",desc:"Relax at Perissa and Kamari beaches."},{day:6,title:"Free Exploration",desc:"Spa, shopping, or boat trip to Thirasia."},{day:7,title:"Departure",desc:"Breakfast, checkout, transfer to airport."}],documents:["Valid passport (6+ months)","Travel insurance","2 passport photos"],locations:[{name:"Oia Village",lat:36.4618,lng:25.3753},{name:"Akrotiri",lat:36.3516,lng:25.4046},{name:"Fira Town",lat:36.4168,lng:25.4320}]},
  {id:2,destination:"Kyoto, Japan",country:"Japan",city:"Kyoto",startDate:"2025-04-05",endDate:"2025-04-14",price:2400,budget:500,totalSeats:20,bookedSeats:8,month:"April",hotel:"Nishiyama Onsen Keiunkan",transport:"International flight + Shinkansen",description:"Immerse yourself in Japan's ancient capital during cherry blossom season. Visit centuries-old temples, traditional tea houses, and the enchanting bamboo forests of Arashiyama.",tags:["Culture","History","Nature"],itinerary:[{day:1,title:"Arrival in Kyoto",desc:"Shinkansen from Osaka, ryokan check-in, kaiseki dinner."},{day:2,title:"Arashiyama Bamboo Grove",desc:"Dawn bamboo walk, Tenryu-ji gardens, Sagano train."},{day:3,title:"Fushimi Inari & Gion",desc:"Torii gates hike, geisha district tour."},{day:4,title:"Kinkaku-ji & Nijo Castle",desc:"Golden Pavilion, Ryoan-ji rock garden."},{day:5,title:"Nara Day Trip",desc:"Nara deer park, Todai-ji giant Buddha."},{day:6,title:"Tea Ceremony",desc:"Authentic tea ceremony, Philosopher's Path walk."},{day:7,title:"Osaka Day Trip",desc:"Dotonbori food street, Osaka Castle."},{day:8,title:"Free Day",desc:"Nishiki Market shopping, farewell dinner."},{day:9,title:"Departure",desc:"Shinkansen to Osaka, international flight."}],documents:["Valid passport","Japan visa (if required)","Travel insurance"],locations:[{name:"Arashiyama Bamboo Grove",lat:35.0094,lng:135.6720},{name:"Fushimi Inari",lat:34.9671,lng:135.7727},{name:"Kinkaku-ji",lat:35.0394,lng:135.7292}]},
  {id:3,destination:"Marrakech, Morocco",country:"Morocco",city:"Marrakech",startDate:"2025-05-02",endDate:"2025-05-08",price:1100,budget:250,totalSeats:20,bookedSeats:5,month:"May",hotel:"Riad Yasmine",transport:"Direct flight + transfers",description:"Lose yourself in the labyrinthine medina of Marrakech — a city of spices, riads, and Saharan magic. This 6-day adventure blends sensory overload with desert serenity.",tags:["Culture","Desert","Food"],itinerary:[{day:1,title:"Jemaa el-Fna",desc:"Arrival, riad check-in, evening at the legendary square."},{day:2,title:"Souks & Spice Tour",desc:"Souk tour, Bahia Palace, cooking class."},{day:3,title:"Sahara Day Trip",desc:"Atlas Mountains, Ait Benhaddou, camel ride."},{day:4,title:"Jardin Majorelle",desc:"YSL's blue garden, Berber Museum."},{day:5,title:"Hammam Day",desc:"Traditional spa, free afternoon."},{day:6,title:"Departure",desc:"Last shopping, checkout, airport."}],documents:["Valid passport","Travel insurance"],locations:[{name:"Jemaa el-Fna",lat:31.6258,lng:-7.9892},{name:"Jardin Majorelle",lat:31.6419,lng:-8.0087},{name:"Bahia Palace",lat:31.6211,lng:-7.9830}]},
  {id:4,destination:"Amalfi Coast, Italy",country:"Italy",city:"Amalfi",startDate:"2025-05-18",endDate:"2025-05-25",price:2100,budget:450,totalSeats:20,bookedSeats:20,month:"May",hotel:"Hotel Santa Caterina",transport:"International flight + coastal transfers",description:"Drive the world's most dramatic coastal road, swim in azure waters, and eat the finest seafood under lemon pergolas. La dolce vita awaits on the Amalfi Coast.",tags:["Luxury","Beach","Romance"],itinerary:[{day:1,title:"Naples & Pompeii",desc:"Pompeii excavation, transfer to Amalfi."},{day:2,title:"Positano",desc:"Boat trip, beach, limoncello tasting."},{day:3,title:"Ravello Gardens",desc:"Villa Rufolo, Villa Cimbrone, concert."},{day:4,title:"Capri Island",desc:"Ferry, Blue Grotto, Faraglioni rocks."},{day:5,title:"Paestum Temples",desc:"Greek temples, mozzarella farm."},{day:6,title:"Cooking Class",desc:"Pasta from scratch, farewell dinner."},{day:7,title:"Departure",desc:"Checkout, Naples airport."}],documents:["Valid passport","Travel insurance"],locations:[{name:"Amalfi",lat:40.6340,lng:14.6025},{name:"Positano",lat:40.6281,lng:14.4842},{name:"Ravello",lat:40.6489,lng:14.6125}]},
  {id:5,destination:"Bali, Indonesia",country:"Indonesia",city:"Ubud",startDate:"2025-06-06",endDate:"2025-06-15",price:1650,budget:300,totalSeats:20,bookedSeats:11,month:"June",hotel:"Komaneka at Bisma",transport:"International flight + transfers",description:"Discover Bali's spiritual heart in Ubud — terraced rice paddies, ancient temples, world-class wellness retreats, and the warmth of Balinese culture.",tags:["Nature","Wellness","Adventure"],itinerary:[{day:1,title:"Arrival & Kecak Dance",desc:"Welcome ceremony, fire dance performance."},{day:2,title:"Tegallalang Terraces",desc:"Sunrise walk, Tirta Empul temple."},{day:3,title:"Mount Batur Trek",desc:"Pre-dawn volcano hike, hot springs."},{day:4,title:"Ubud Arts",desc:"Royal Palace, art market, silversmithing."},{day:5,title:"Seminyak Beach",desc:"Surf lesson, sunset dinner."},{day:6,title:"Spiritual Day",desc:"Yoga, meditation, temple blessing."},{day:7,title:"Elephant Safari",desc:"Elephant Sanctuary, cooking class."},{day:8,title:"Free Day",desc:"Shopping, spa."},{day:9,title:"Departure",desc:"Morning ceremony, airport."}],documents:["Valid passport","Bali visa on arrival","Travel insurance"],locations:[{name:"Tegallalang",lat:-8.4338,lng:115.2793},{name:"Tirta Empul",lat:-8.4152,lng:115.3152},{name:"Mount Batur",lat:-8.2423,lng:115.3751}]},
  {id:6,destination:"Istanbul, Turkey",country:"Turkey",city:"Istanbul",startDate:"2025-06-20",endDate:"2025-06-26",price:1300,budget:280,totalSeats:20,bookedSeats:3,month:"June",hotel:"Çirağan Palace Kempinski",transport:"Direct flight + Bosphorus cruise",description:"Straddle two continents where East meets West. From the Blue Mosque to the Grand Bazaar, Istanbul is an overwhelming feast for every sense.",tags:["History","Culture","Food"],itinerary:[{day:1,title:"Old City",desc:"Hagia Sophia, Blue Mosque, rooftop dinner."},{day:2,title:"Topkapi & Grand Bazaar",desc:"Palace jewels, spice bazaar, baklava."},{day:3,title:"Bosphorus Cruise",desc:"Private boat, Dolmabahce Palace."},{day:4,title:"Princes Islands",desc:"Ferry, horse carriage, sea swim."},{day:5,title:"Modern Istanbul",desc:"Galata Tower, Istiklal Street, galleries."},{day:6,title:"Departure",desc:"Turkish breakfast, last shopping, airport."}],documents:["Valid passport","Turkey e-visa","Travel insurance"],locations:[{name:"Hagia Sophia",lat:41.0086,lng:28.9802},{name:"Topkapi Palace",lat:41.0115,lng:28.9833},{name:"Grand Bazaar",lat:41.0108,lng:28.9680}]},
];

const COUNTRIES = [...new Set(TRIPS.map(t => t.country))];
const MONTHS = [...new Set(TRIPS.map(t => t.month))];
const fmtDate = d => new Date(d).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"});
const nights = (s,e) => Math.round((new Date(e)-new Date(s))/86400000);
const seatsLeft = t => t.totalSeats - t.bookedSeats;

/* ════════════════════════════════════════════
   LIGHTBOX  — no hooks in loops anywhere
════════════════════════════════════════════ */
function Lightbox({ photos, start, onClose }) {
  const [idx, setIdx] = useState(start);
  const prev = useCallback(() => setIdx(i => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % photos.length), [photos.length]);
  useEffect(() => {
    const h = e => { if(e.key==="ArrowLeft") prev(); else if(e.key==="ArrowRight") next(); else if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next, onClose]);
  const ph = photos[idx];
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(5,3,1,0.97)",zIndex:9999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <button onClick={onClose} style={{position:"absolute",top:18,right:22,background:"none",border:"none",color:"rgba(255,255,255,0.6)",fontSize:38,cursor:"pointer",lineHeight:1}}>×</button>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:960,display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
        <div style={{position:"relative",width:"100%",textAlign:"center"}}>
          <img src={ph.url} alt={ph.cap} style={{maxHeight:"66vh",maxWidth:"100%",objectFit:"contain",borderRadius:10,boxShadow:"0 0 60px rgba(0,0,0,0.8)"}}/>
          <button onClick={e=>{e.stopPropagation();prev();}} style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,color:"#fff",padding:"10px 16px",cursor:"pointer",fontSize:22}}>‹</button>
          <button onClick={e=>{e.stopPropagation();next();}} style={{position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,color:"#fff",padding:"10px 16px",cursor:"pointer",fontSize:22}}>›</button>
        </div>
        {ph.cap && <p style={{color:"rgba(255,255,255,0.55)",fontSize:14,fontStyle:"italic",textAlign:"center",margin:0}}>{ph.cap}</p>}
        <p style={{color:"rgba(255,255,255,0.3)",fontSize:12,margin:0}}>{idx+1} / {photos.length}</p>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
          {photos.map((p,j) => (
            <img key={j} src={p.url} alt="" onClick={e=>{e.stopPropagation();setIdx(j);}}
              style={{width:55,height:40,objectFit:"cover",borderRadius:5,cursor:"pointer",border:`2px solid ${j===idx?C.gold:"transparent"}`,opacity:j===idx?1:0.4,transition:"all 0.15s"}}/>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   AUTO HERO SLIDER
════════════════════════════════════════════ */
function HeroSlider({ tripId, onGallery }) {
  const imgs = HERO[tripId] || [];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i+1) % imgs.length), 4500);
    return () => clearInterval(iv);
  }, [imgs.length]);
  return (
    <>
      {imgs.map((url, j) => (
        <img key={j} src={url} alt=""
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:j===idx?1:0,transition:"opacity 1s ease"}}/>
      ))}
      {/* dot nav */}
      <div style={{position:"absolute",top:12,right:12,display:"flex",gap:5,zIndex:6}} onClick={e=>e.stopPropagation()}>
        {imgs.map((_,j) => (
          <button key={j} onClick={()=>setIdx(j)}
            style={{width:8,height:8,borderRadius:"50%",border:"none",padding:0,cursor:"pointer",background:j===idx?C.gold:"rgba(255,255,255,0.4)",transition:"background 0.2s"}}/>
        ))}
      </div>
      {/* thumb strip */}
      <div style={{position:"absolute",bottom:12,left:12,display:"flex",gap:6,zIndex:6,alignItems:"center"}} onClick={e=>e.stopPropagation()}>
        {imgs.map((url,j) => (
          <img key={j} src={url} alt="" onClick={()=>setIdx(j)}
            style={{width:48,height:35,objectFit:"cover",borderRadius:5,cursor:"pointer",border:`2px solid ${j===idx?C.gold:"rgba(255,255,255,0.35)"}`,opacity:j===idx?1:0.65,transition:"all 0.2s"}}/>
        ))}
        <button onClick={onGallery}
          style={{background:"rgba(0,0,0,0.55)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:6,color:"#fff",padding:"4px 10px",cursor:"pointer",fontSize:12,fontFamily:"inherit",backdropFilter:"blur(4px)",whiteSpace:"nowrap"}}>
          🖼 All Photos
        </button>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   LOCATION PHOTO GRID
════════════════════════════════════════════ */
function LocationPhotoGrid({ name }) {
  const photos = PHOTOS[name] || [];
  const [lb, setLb] = useState(null);
  const [hovIdx, setHovIdx] = useState(-1);
  if (!photos.length) return null;
  const cols = Math.min(photos.length, 4);
  return (
    <>
      {lb !== null && <Lightbox photos={photos} start={lb} onClose={() => setLb(null)}/>}
      <div style={{marginTop:12}}>
        <p style={{fontSize:11,fontWeight:600,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:8,marginTop:0}}>
          📸 {photos.length} Photo{photos.length !== 1 ? "s" : ""}
        </p>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:6}}>
          {photos.map((ph, j) => (
            <div key={j} onClick={() => setLb(j)} onMouseEnter={() => setHovIdx(j)} onMouseLeave={() => setHovIdx(-1)}
              style={{position:"relative",overflow:"hidden",borderRadius:8,aspectRatio:"4/3",cursor:"pointer"}}>
              <img src={ph.url} alt={ph.cap}
                style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.35s",transform:hovIdx===j?"scale(1.08)":"scale(1)"}}/>
              <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.35)",opacity:hovIdx===j?1:0,transition:"opacity 0.25s",display:"flex",alignItems:"flex-end",padding:"6px 8px"}}>
                <p style={{color:"#fff",fontSize:11,fontStyle:"italic",margin:0,lineHeight:1.3}}>{ph.cap}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   REUSABLE UI — NO hooks in loops
════════════════════════════════════════════ */
function Badge({ children, color = C.gold }) {
  return <span style={{background:`${color}22`,color,border:`1px solid ${color}55`,borderRadius:100,padding:"2px 10px",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{children}</span>;
}

function Btn({ children, onClick, variant = "primary", small, disabled, fullWidth, style: ex = {} }) {
  const [hov, setHov] = useState(false);
  const bg = { primary: hov&&!disabled?C.gold2:C.gold, outline:"transparent", teal: hov&&!disabled?"#3d9ea3":C.teal, danger: hov&&!disabled?"#e05050":C.rose };
  const fg = { primary: C.dark, outline: C.gold, teal:"#fff", danger:"#fff" };
  const br = { outline:`1.5px solid ${C.gold}` };
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={!disabled ? onClick : undefined}
      style={{border:br[variant]||"none",borderRadius:8,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",fontWeight:600,transition:"all .2s",outline:"none",opacity:disabled?.55:1,padding:small?"8px 18px":"12px 28px",fontSize:small?13:15,background:bg[variant],color:fg[variant],transform:hov&&!disabled?"translateY(-1px)":"none",boxShadow:hov&&!disabled?"0 4px 14px rgba(0,0,0,0.15)":"none",width:fullWidth?"100%":"auto",...ex}}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, required }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      {label && <label style={{fontSize:13,fontWeight:600,color:C.ink}}>{label}{required&&<span style={{color:C.rose}}> *</span>}</label>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{padding:"10px 14px",borderRadius:8,border:`1.5px solid ${focus?C.gold:C.border}`,background:C.white,fontSize:14,color:C.ink,fontFamily:"inherit",outline:"none",transition:"border .2s"}}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}/>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      {label && <label style={{fontSize:13,fontWeight:600,color:C.ink}}>{label}</label>}
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{padding:"10px 14px",borderRadius:8,border:`1.5px solid ${C.border}`,background:C.white,fontSize:14,color:C.ink,fontFamily:"inherit",cursor:"pointer",outline:"none"}}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(26,18,9,0.75)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(4px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.cream,borderRadius:20,width:"min(560px,96vw)",maxHeight:"90vh",overflow:"auto",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",animation:"mIn .25s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px 16px",borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,background:C.cream,zIndex:1}}>
          <h3 style={{fontSize:20,fontWeight:600,color:C.ink,fontFamily:"Cormorant Garamond,serif",margin:0}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:26,cursor:"pointer",color:C.muted,lineHeight:1}}>×</button>
        </div>
        <div style={{padding:"24px 28px"}}>{children}</div>
      </div>
    </div>
  );
}

function Countdown({ deadline }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const calc = () => Math.max(0, Math.floor((new Date(deadline) - Date.now()) / 1000));
    setSecs(calc());
    const iv = setInterval(() => setSecs(calc()), 1000);
    return () => clearInterval(iv);
  }, [deadline]);
  const h=Math.floor(secs/3600), m=Math.floor((secs%3600)/60), s=secs%60, urg=secs<3600;
  return (
    <div style={{display:"flex",gap:6}}>
      {[{v:h,l:"h"},{v:m,l:"m"},{v:s,l:"s"}].map(({v,l}) => (
        <div key={l} style={{textAlign:"center"}}>
          <div style={{background:urg?`${C.rose}18`:`${C.gold}18`,color:urg?C.rose:C.gold,borderRadius:6,padding:"4px 8px",fontSize:15,fontWeight:700,minWidth:36}}>{String(v).padStart(2,"0")}</div>
          <div style={{fontSize:9,color:C.muted,marginTop:2}}>{l}</div>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   TRIP CARD
════════════════════════════════════════════ */
function TripCard({ trip, onSelect }) {
  const [hov, setHov] = useState(false);
  const [lb, setLb] = useState(null);
  const imgs = HERO[trip.id] || [];
  const sl = seatsLeft(trip);
  return (
    <>
      {lb !== null && <Lightbox photos={imgs.map(u=>({url:u,cap:trip.destination}))} start={lb} onClose={()=>setLb(null)}/>}
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        onClick={() => onSelect(trip)}
        style={{background:C.white,borderRadius:16,overflow:"hidden",cursor:"pointer",border:`1px solid ${C.border}`,transition:"all .28s",transform:hov?"translateY(-5px)":"none",boxShadow:hov?"0 20px 50px rgba(26,18,9,0.16)":"0 3px 16px rgba(26,18,9,0.07)"}}>
        <div style={{position:"relative",height:210,overflow:"hidden",background:C.sand}}>
          <HeroSlider tripId={trip.id} onGallery={e=>{if(e&&e.stopPropagation)e.stopPropagation();setLb(0);}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(26,18,9,0.7) 0%,transparent 55%)",pointerEvents:"none",zIndex:4}}/>
          {sl===0 && <div style={{position:"absolute",top:10,left:10,background:C.rose,color:"#fff",borderRadius:6,padding:"3px 10px",fontSize:12,fontWeight:700,zIndex:7}}>FULLY BOOKED</div>}
          <div style={{position:"absolute",top:10,right:38,display:"flex",gap:4,pointerEvents:"none",zIndex:5}}>
            {trip.tags.slice(0,2).map(t => <Badge key={t} color={C.gold2}>{t}</Badge>)}
          </div>
          <div style={{position:"absolute",bottom:54,left:12,pointerEvents:"none",zIndex:5}}>
            <p style={{color:C.gold2,fontSize:11,fontWeight:600,letterSpacing:1,textTransform:"uppercase",margin:0}}>{trip.country}</p>
            <h3 style={{color:"#fff",fontSize:19,fontFamily:"Cormorant Garamond,serif",fontWeight:600,lineHeight:1.15,margin:"2px 0 0"}}>{trip.city}</h3>
          </div>
        </div>
        <div style={{padding:"13px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <p style={{fontSize:12,color:C.muted,margin:0}}>📅 {fmtDate(trip.startDate)}</p>
              <p style={{fontSize:12,color:C.muted,margin:"3px 0 0"}}>🌙 {nights(trip.startDate,trip.endDate)} nights</p>
            </div>
            <div style={{textAlign:"right"}}>
              <p style={{fontSize:21,fontWeight:700,color:C.gold,fontFamily:"Cormorant Garamond,serif",margin:0}}>${trip.price.toLocaleString()}</p>
              <p style={{fontSize:11,color:C.muted,margin:0}}>per person</p>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:`1px solid ${C.border}`,paddingTop:10}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:sl===0?C.rose:sl<=5?"#f0a020":C.teal,flexShrink:0}}/>
              <span style={{fontSize:12,color:sl===0?C.rose:sl<=5?"#f0a020":C.teal,fontWeight:600}}>{sl===0?"No seats left":`${sl} seats left`}</span>
            </div>
            <span style={{fontSize:11,color:C.muted}}>📷 {imgs.length} photos</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   LOCATIONS PANEL
════════════════════════════════════════════ */
function LocationsPanel({ locations }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{display:"grid",gap:12}}>
      {locations.map((loc, i) => {
        const photos = PHOTOS[loc.name] || [];
        const isOpen = open === i;
        return (
          <div key={i} style={{background:C.white,borderRadius:14,border:`1px solid ${isOpen?C.gold:C.border}`,overflow:"hidden",transition:"border .2s"}}>
            <div onClick={() => setOpen(isOpen ? null : i)}
              style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",cursor:"pointer",userSelect:"none"}}>
              <div style={{position:"relative",width:60,height:44,borderRadius:8,overflow:"hidden",flexShrink:0,background:C.sand}}>
                {photos[0] && <img src={photos[0].url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>}
                <div style={{position:"absolute",bottom:2,right:3,background:"rgba(0,0,0,0.55)",borderRadius:3,padding:"1px 4px",fontSize:10,color:"#fff",fontWeight:600}}>{photos.length}📷</div>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:22,height:22,borderRadius:"50%",background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.dark,flexShrink:0}}>{i+1}</div>
                  <p style={{fontWeight:700,fontSize:15,color:C.ink,margin:0}}>{loc.name}</p>
                </div>
                <p style={{fontSize:11,color:C.muted,margin:"3px 0 0"}}>📌 {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</p>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                <Badge color={C.teal}>{photos.length} photo{photos.length!==1?"s":""}</Badge>
                <span style={{fontSize:18,color:C.muted,transition:"transform .25s",display:"block",transform:isOpen?"rotate(90deg)":"none"}}>›</span>
              </div>
            </div>
            {isOpen && (
              <div style={{padding:"4px 18px 18px",borderTop:`1px solid ${C.border}`}}>
                <LocationPhotoGrid name={loc.name}/>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════
   BUDGET CALC
════════════════════════════════════════════ */
function BudgetCalc({ trip }) {
  const [val, setVal] = useState("");
  const total = trip.price + trip.budget;
  const ub = parseFloat(val) || 0;
  const ok = ub >= total;
  return (
    <div style={{background:C.cream,borderRadius:14,padding:22,border:`1px solid ${C.border}`}}>
      <h4 style={{fontFamily:"Cormorant Garamond,serif",fontSize:18,margin:"0 0 16px"}}>💰 Budget Calculator</h4>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        {[["Trip Price",`$${trip.price.toLocaleString()}`],["Personal Budget",`$${trip.budget.toLocaleString()}`]].map(([l,v]) => (
          <div key={l} style={{background:C.white,borderRadius:8,padding:"10px 14px"}}>
            <p style={{color:C.muted,fontSize:12,margin:0}}>{l}</p>
            <p style={{fontWeight:700,fontSize:16,margin:"3px 0 0"}}>{v}</p>
          </div>
        ))}
        <div style={{background:C.gold,borderRadius:8,padding:"10px 14px",gridColumn:"span 2"}}>
          <p style={{color:C.dark,fontSize:12,opacity:.8,margin:0}}>Recommended Total</p>
          <p style={{fontWeight:700,color:C.dark,fontSize:22,fontFamily:"Cormorant Garamond,serif",margin:"3px 0 0"}}>${total.toLocaleString()}</p>
        </div>
      </div>
      <Input label="Your available budget ($)" value={val} onChange={setVal} type="number" placeholder="Enter your budget…"/>
      {val !== "" && (
        <div style={{marginTop:12,borderRadius:10,padding:14,background:ok?`${C.teal}18`:`${C.rose}18`,border:`1px solid ${ok?C.teal:C.rose}`}}>
          {ok
            ? <p style={{color:C.teal,fontWeight:600,fontSize:14,margin:0}}>✅ You have enough — ${(ub-total).toLocaleString()} to spare.</p>
            : <div>
                <p style={{color:C.rose,fontWeight:600,fontSize:14,margin:"0 0 8px"}}>⚠️ You need ${(total-ub).toLocaleString()} more for this trip.</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[["Required",`$${total.toLocaleString()}`],["You have",`$${ub.toLocaleString()}`],["Shortfall",`$${(total-ub).toLocaleString()}`]].map(([l,v]) => (
                    <div key={l}><p style={{color:C.muted,fontSize:11,margin:0}}>{l}</p><p style={{fontWeight:700,fontSize:13,margin:"2px 0 0"}}>{v}</p></div>
                  ))}
                </div>
              </div>
          }
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   RESERVE FORM
════════════════════════════════════════════ */
function ReserveForm({ trip }) {
  const [f, setF] = useState({ name:"", passport:"", phone:"", email:"", seats:"1" });
  const [done, setDone] = useState(false);
  const [res, setRes] = useState(null);
  const sl = seatsLeft(trip);
  const set = k => v => setF(p => ({...p, [k]:v}));
  const submit = () => {
    if (!f.name||!f.passport||!f.phone||!f.email) { alert("Please fill all required fields."); return; }
    const r = { id:Date.now(), ...f, seats:parseInt(f.seats), trip:trip.destination, total:trip.price*parseInt(f.seats), deadline:new Date(Date.now()+48*3600000).toISOString() };
    setRes(r); setDone(true);
  };
  if (sl === 0) return <div style={{textAlign:"center",padding:24}}><p style={{fontSize:44,margin:"0 0 12px"}}>😔</p><h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:22,color:C.rose,margin:0}}>Fully Booked</h3></div>;
  if (done && res) return (
    <div style={{textAlign:"center"}}>
      <p style={{fontSize:52,margin:"0 0 12px"}}>🎉</p>
      <h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:24,color:C.gold,margin:"0 0 8px"}}>Reservation Confirmed!</h3>
      <p style={{color:C.muted,fontSize:14,margin:"0 0 20px"}}>{res.seats} seat(s) for <strong>{res.trip}</strong></p>
      <div style={{background:C.cream,borderRadius:12,padding:18,textAlign:"left",marginBottom:20,border:`1px solid ${C.border}`}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[["Booking ID",`#${String(res.id).slice(-6)}`],["Total",`$${res.total.toLocaleString()}`],["Name",res.name],["Email",res.email]].map(([l,v]) => (
            <div key={l}><p style={{color:C.muted,fontSize:12,margin:0}}>{l}</p><p style={{fontWeight:600,fontSize:13,margin:"2px 0 0"}}>{v}</p></div>
          ))}
        </div>
      </div>
      <p style={{fontSize:13,color:C.rose,fontWeight:600,margin:"0 0 10px"}}>⏰ Complete payment within:</p>
      <Countdown deadline={res.deadline}/>
    </div>
  );
  return (
    <div style={{display:"grid",gap:14}}>
      <div style={{background:`${C.teal}12`,borderRadius:10,padding:"10px 14px",fontSize:13,color:C.teal,fontWeight:600}}>
        ✈️ {trip.destination} · {fmtDate(trip.startDate)} · {sl} seats left
      </div>
      <Input label="Full Name" value={f.name} onChange={set("name")} required placeholder="As per passport"/>
      <Input label="Passport Number" value={f.passport} onChange={set("passport")} required/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Input label="Phone" value={f.phone} onChange={set("phone")} required/>
        <Input label="Email" value={f.email} onChange={set("email")} type="email" required/>
      </div>
      <Select label="Number of Seats" value={f.seats} onChange={set("seats")}
        options={Array.from({length:Math.min(sl,5)},(_,i) => ({value:String(i+1),label:`${i+1} seat${i>0?"s":""}`}))}/>
      <div style={{background:C.cream,borderRadius:10,padding:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:14,color:C.muted}}>Total Cost</span>
        <span style={{fontSize:22,fontWeight:700,color:C.gold,fontFamily:"Cormorant Garamond,serif"}}>${(trip.price*parseInt(f.seats)).toLocaleString()}</span>
      </div>
      <Btn onClick={submit} fullWidth>Reserve My Seat ✈️</Btn>
      <p style={{fontSize:11,color:C.muted,textAlign:"center",margin:0}}>Payment must be completed within 48 hours or reservation is cancelled.</p>
    </div>
  );
}

/* ════════════════════════════════════════════
   VISA FORM
════════════════════════════════════════════ */
function VisaForm() {
  const [f, setF] = useState({ name:"", email:"", country:"", phone:"" });
  const [done, setDone] = useState(false);
  const set = k => v => setF(p => ({...p, [k]:v}));
  if (done) return <div style={{textAlign:"center",padding:20}}><p style={{fontSize:48,margin:"0 0 12px"}}>📋</p><h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:22,color:C.teal,margin:"0 0 8px"}}>Request Submitted!</h3><p style={{color:C.muted,fontSize:14,margin:0}}>Our visa team will contact you within 24h at {f.email}.</p></div>;
  return (
    <div style={{display:"grid",gap:14}}>
      <Input label="Full Name" value={f.name} onChange={set("name")} required/>
      <Input label="Email" value={f.email} onChange={set("email")} type="email" required/>
      <Input label="Phone" value={f.phone} onChange={set("phone")} required/>
      <Select label="Destination Country" value={f.country} onChange={set("country")}
        options={[{value:"",label:"Select country…"},...COUNTRIES.map(c=>({value:c,label:c}))]}/>
      <div style={{border:`2px dashed ${C.border}`,borderRadius:10,padding:20,textAlign:"center",cursor:"pointer",color:C.muted,fontSize:14}}>
        📎 Click to upload documents<p style={{fontSize:12,marginTop:6,marginBottom:0}}>PDF, JPG, PNG — max 10 MB</p>
      </div>
      <Btn onClick={() => { if(!f.name||!f.email||!f.country){alert("Fill all required fields.");return;} setDone(true); }} variant="teal" fullWidth>Submit Visa Request</Btn>
    </div>
  );
}

/* ════════════════════════════════════════════
   TRIP DETAIL
════════════════════════════════════════════ */
function TripDetail({ trip, onBack }) {
  const [tab, setTab] = useState("itinerary");
  const [showRes, setShowRes] = useState(false);
  const [lb, setLb] = useState(null);
  const imgs = HERO[trip.id] || [];
  const sl = seatsLeft(trip);
  return (
    <div>
      {lb !== null && <Lightbox photos={imgs.map(u=>({url:u,cap:trip.destination}))} start={lb} onClose={()=>setLb(null)}/>}
      <Modal open={showRes} onClose={()=>setShowRes(false)} title="Reserve Your Seat"><ReserveForm trip={trip}/></Modal>
      {/* hero */}
      <div style={{position:"relative",height:"clamp(300px,42vw,460px)",overflow:"hidden",borderRadius:18,marginBottom:22}}>
        <HeroSlider tripId={trip.id} onGallery={()=>setLb(0)}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(26,18,9,0.75) 0%,transparent 55%)",pointerEvents:"none",zIndex:3}}/>
        <button onClick={onBack} style={{position:"absolute",top:16,left:16,zIndex:10,background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:8,padding:"7px 14px",color:"#fff",cursor:"pointer",backdropFilter:"blur(4px)",fontSize:14,fontFamily:"inherit",fontWeight:600}}>← Back</button>
        <div style={{position:"absolute",bottom:62,left:20,pointerEvents:"none",zIndex:5}}>
          <p style={{color:C.gold2,fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",margin:0}}>{trip.country}</p>
          <h1 style={{color:"#fff",fontSize:"clamp(24px,4vw,42px)",fontFamily:"Cormorant Garamond,serif",fontWeight:700,lineHeight:1.1,margin:"4px 0"}}>{trip.destination}</h1>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{trip.tags.map(t => <Badge key={t} color={C.gold2}>{t}</Badge>)}</div>
        </div>
      </div>
      {/* stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:20}}>
        {[["📅","Departure",fmtDate(trip.startDate)],["🏁","Return",fmtDate(trip.endDate)],["🌙","Duration",`${nights(trip.startDate,trip.endDate)} nights`],["🏨","Hotel",trip.hotel],["✈️","Transport",trip.transport.split("+")[0].trim()],["💺","Seats",sl===0?"FULL":`${sl} left`]].map(([ic,l,v]) => (
          <div key={l} style={{background:C.white,borderRadius:12,padding:"11px 14px",border:`1px solid ${C.border}`}}>
            <p style={{fontSize:18,margin:0}}>{ic}</p>
            <p style={{fontSize:11,color:C.muted,margin:"3px 0 1px"}}>{l}</p>
            <p style={{fontSize:13,fontWeight:600,color:l==="Seats"&&sl===0?C.rose:C.ink,margin:0}}>{v}</p>
          </div>
        ))}
      </div>
      {/* price bar */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.dark,borderRadius:14,padding:"18px 22px",marginBottom:20,flexWrap:"wrap",gap:14}}>
        <div>
          <p style={{color:C.gold2,fontSize:11,letterSpacing:1,margin:0}}>PRICE PER PERSON</p>
          <p style={{color:C.gold,fontSize:36,fontFamily:"Cormorant Garamond,serif",fontWeight:700,lineHeight:1,margin:"3px 0"}}>${trip.price.toLocaleString()}</p>
          <p style={{color:C.muted,fontSize:12,margin:0}}>Recommended total: ${(trip.price+trip.budget).toLocaleString()}</p>
        </div>
        <Btn onClick={()=>setShowRes(true)} disabled={sl===0} style={{fontSize:16,padding:"13px 34px"}}>{sl===0?"Fully Booked":"Reserve Now ✈️"}</Btn>
      </div>
      <p style={{fontSize:15,color:C.ink,lineHeight:1.8,marginBottom:20,opacity:.85}}>{trip.description}</p>
      <div style={{marginBottom:20}}><BudgetCalc trip={trip}/></div>
      {/* tabs */}
      <div style={{display:"flex",borderBottom:`2px solid ${C.border}`,marginBottom:18}}>
        {[["itinerary","📋 Itinerary"],["locations","📍 Locations & Photos"],["documents","📄 Documents"]].map(([key,lbl]) => (
          <button key={key} onClick={()=>setTab(key)}
            style={{padding:"9px 18px",background:"none",border:"none",borderBottom:`2px solid ${tab===key?C.gold:"transparent"}`,marginBottom:-2,cursor:"pointer",fontFamily:"inherit",fontWeight:tab===key?700:400,color:tab===key?C.gold:C.muted,fontSize:14,transition:"all .2s"}}>
            {lbl}
          </button>
        ))}
      </div>
      {tab === "itinerary" && (
        <div style={{display:"grid",gap:10}}>
          {trip.itinerary.map(d => (
            <div key={d.day} style={{display:"flex",gap:14,padding:"14px 18px",background:C.white,borderRadius:12,border:`1px solid ${C.border}`}}>
              <div style={{width:42,height:42,borderRadius:10,background:C.gold,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <p style={{fontSize:9,color:C.dark,fontWeight:600,margin:0}}>DAY</p>
                <p style={{fontSize:16,fontWeight:700,color:C.dark,lineHeight:1,margin:0}}>{d.day}</p>
              </div>
              <div>
                <h4 style={{fontSize:15,fontWeight:600,color:C.ink,margin:"0 0 4px"}}>{d.title}</h4>
                <p style={{fontSize:13,color:C.muted,lineHeight:1.6,margin:0}}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "locations" && (
        <div>
          <p style={{fontSize:14,color:C.muted,marginBottom:14,lineHeight:1.6}}>Click any location to expand its photo gallery.</p>
          <LocationsPanel locations={trip.locations}/>
        </div>
      )}
      {tab === "documents" && (
        <div style={{display:"grid",gap:10}}>
          {trip.documents.map((doc,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.white,borderRadius:10,border:`1px solid ${C.border}`}}>
              <span style={{fontSize:18}}>📄</span><span style={{fontSize:14,color:C.ink}}>{doc}</span>
            </div>
          ))}
          <div style={{marginTop:10,background:`${C.rose}12`,borderRadius:10,padding:14,border:`1px solid ${C.rose}44`}}>
            <p style={{fontSize:13,color:C.rose,fontWeight:600,margin:"0 0 4px"}}>⚠️ Important</p>
            <p style={{fontSize:13,color:C.ink,opacity:.8,margin:0}}>All documents must be valid at least 6 months beyond your return date.</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   ADMIN
════════════════════════════════════════════ */
function AdminDash({ trips, onClose }) {
  const [tab, setTab] = useState("overview");
  return (
    <div style={{minHeight:"100vh",background:"#f0ede8",fontFamily:"DM Sans,sans-serif"}}>
      <div style={{background:C.dark,padding:"14px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:C.gold,fontFamily:"Cormorant Garamond,serif",fontSize:20,fontWeight:700}}>⚙️ Admin Dashboard</span>
        <Btn onClick={onClose} variant="outline" small>← Back to Site</Btn>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:28}}>
          {[["💰","Revenue","$0",C.gold],["📋","Bookings","0",C.teal],["✈️","Trips",trips.length,C.rose]].map(([ic,l,v,col]) => (
            <div key={l} style={{background:C.white,borderRadius:14,padding:"16px 20px",border:`1px solid ${C.border}`}}>
              <p style={{fontSize:28,margin:0}}>{ic}</p>
              <p style={{fontSize:26,fontWeight:700,color:col,fontFamily:"Cormorant Garamond,serif",margin:"5px 0 0"}}>{v}</p>
              <p style={{fontSize:13,color:C.muted,margin:"2px 0 0"}}>{l}</p>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {[["overview","📊 Overview"],["trips","✈️ Trips"]].map(([key,lbl]) => (
            <button key={key} onClick={()=>setTab(key)}
              style={{padding:"9px 18px",borderRadius:8,border:"none",background:tab===key?C.gold:C.white,color:tab===key?C.dark:C.muted,fontFamily:"inherit",fontWeight:600,fontSize:13,cursor:"pointer"}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab === "overview" && (
          <div style={{background:C.white,borderRadius:14,padding:22,border:`1px solid ${C.border}`}}>
            <h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:18,margin:"0 0 16px"}}>Trip Occupancy</h3>
            {trips.map(t => {
              const pct = Math.round((t.bookedSeats/t.totalSeats)*100);
              return (
                <div key={t.id} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:13,fontWeight:600}}>{t.destination}</span>
                    <span style={{fontSize:12,color:C.muted}}>{t.bookedSeats}/{t.totalSeats} · {pct}%</span>
                  </div>
                  <div style={{height:8,background:C.border,borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${pct}%`,background:pct===100?C.rose:pct>70?"#f0a020":C.teal,borderRadius:4,transition:"width .5s"}}/>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {tab === "trips" && (
          <div style={{display:"grid",gap:12}}>
            {trips.map(t => (
              <div key={t.id} style={{background:C.white,borderRadius:12,padding:"14px 18px",border:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <img src={HERO[t.id][0]} alt="" style={{width:60,height:44,borderRadius:7,objectFit:"cover"}}/>
                  <div>
                    <h4 style={{fontWeight:600,fontSize:15,margin:0}}>{t.destination}</h4>
                    <p style={{color:C.muted,fontSize:12,margin:"2px 0 0"}}>{fmtDate(t.startDate)} — ${t.price.toLocaleString()}/person</p>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <Badge color={seatsLeft(t)===0?C.rose:C.teal}>{seatsLeft(t)===0?"Full":`${seatsLeft(t)} seats`}</Badge>
                  <Btn small variant="outline">✏️ Edit</Btn>
                  <Btn small variant="danger">🗑</Btn>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [selTrip, setSelTrip] = useState(null);
  const [q, setQ] = useState("");
  const [fCountry, setFCountry] = useState("all");
  const [fMonth, setFMonth] = useState("all");
  const [fPrice, setFPrice] = useState("");
  const [showVisa, setShowVisa] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (p, t = null) => { setPage(p); if(t) setSelTrip(t); window.scrollTo(0,0); };

  const filtered = TRIPS.filter(t =>
    (!q || t.destination.toLowerCase().includes(q.toLowerCase()) || t.country.toLowerCase().includes(q.toLowerCase())) &&
    (fCountry === "all" || t.country === fCountry) &&
    (fMonth === "all" || t.month === fMonth) &&
    (!fPrice || t.price <= parseFloat(fPrice))
  );

  if (page === "admin") return <AdminDash trips={TRIPS} onClose={() => go("home")}/>;

  const onHome = page === "home";
  const navDark = scrollY > 60;

  return (
    <div style={{background:C.cream,minHeight:"100vh",fontFamily:"DM Sans,sans-serif",color:C.ink}}>
      <link href={FONT} rel="stylesheet"/>
      <style>{`
        @keyframes mIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes flt { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        * { box-sizing:border-box; }
        img { display:block; }
        p,h1,h2,h3,h4 { margin:0; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-thumb { background:${C.gold}88; border-radius:3px; }
      `}</style>

      <Modal open={showVisa} onClose={()=>setShowVisa(false)} title="🛂 Visa Assistance"><VisaForm/></Modal>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:500,transition:"all .3s",padding:"0 24px",
        background:navDark?"rgba(250,247,242,0.96)":"transparent",
        backdropFilter:navDark?"blur(12px)":"none",
        borderBottom:navDark?`1px solid ${C.border}`:"none"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",height:66}}>
          <button onClick={()=>go("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:9}}>
            <span style={{fontSize:22}}>✈️</span>
            <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:21,fontWeight:700,color:navDark?C.ink:onHome?"#fff":C.ink}}>Smart Travel</span>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:4}}>
            {[["Destinations",()=>go("trips")],["Visa Services",()=>setShowVisa(true)],["About",()=>go("about")]].map(([l,a]) => (
              <button key={l} onClick={a}
                style={{background:"none",border:"none",cursor:"pointer",padding:"7px 14px",fontSize:14,color:navDark?C.ink:onHome?"rgba(255,255,255,0.9)":C.ink,fontFamily:"inherit",fontWeight:500,borderRadius:7,transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background=`${C.gold}20`}
                onMouseLeave={e=>e.currentTarget.style.background="none"}>
                {l}
              </button>
            ))}
            <Btn onClick={()=>go("admin")} variant="outline" small
              style={{borderColor:navDark?C.gold:"rgba(255,255,255,0.6)",color:navDark?C.gold:"rgba(255,255,255,0.9)"}}>
              Admin
            </Btn>
          </div>
        </div>
      </nav>

      <main style={{paddingTop:onHome?0:66,maxWidth:onHome?"none":1160,margin:"0 auto",padding:onHome?0:"84px 20px 60px"}}>

        {/* ── HOME ── */}
        {page === "home" && (
          <div>
            {/* Hero */}
            <div style={{position:"relative",height:"100vh",minHeight:580,overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,#1a1209,#2d1f0e 30%,#1a3a3b 70%,#0d1a1a)"}}/>
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80" alt=""
                style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.35,transform:`translateY(${scrollY*.3}px)`}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(26,18,9,.1),rgba(26,18,9,.5))"}}/>
              <div style={{position:"absolute",top:"22%",right:"8%",animation:"flt 4s ease-in-out infinite"}}>
                <div style={{background:"rgba(201,151,58,.15)",border:"1px solid rgba(201,151,58,.3)",borderRadius:14,padding:"14px 18px",backdropFilter:"blur(8px)"}}>
                  <p style={{color:C.gold2,fontSize:11,fontWeight:600,letterSpacing:1}}>NEXT DEPARTURE</p>
                  <p style={{color:"#fff",fontSize:16,fontWeight:600,fontFamily:"Cormorant Garamond,serif",marginTop:4}}>Santorini, Greece</p>
                  <p style={{color:C.gold,fontSize:13,marginTop:2}}>Apr 12 · 6 seats left</p>
                </div>
              </div>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"0 20px",animation:"fadeUp .8s ease"}}>
                <p style={{color:C.gold2,letterSpacing:3,fontSize:12,fontWeight:600,textTransform:"uppercase",marginBottom:18}}>✦ Premium Travel Experiences ✦</p>
                <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(40px,7vw,86px)",fontWeight:300,color:"#fff",lineHeight:1.05,marginBottom:18}}>
                  The World<br/><em style={{fontStyle:"italic",color:C.gold}}>Awaits You</em>
                </h1>
                <p style={{fontSize:"clamp(14px,2vw,17px)",color:"rgba(255,255,255,.72)",maxWidth:500,lineHeight:1.7,marginBottom:38}}>
                  Curated international journeys with expert guidance, seamless visa assistance, and memories that last a lifetime.
                </p>
                <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
                  <Btn onClick={()=>go("trips")} style={{fontSize:16,padding:"13px 36px"}}>Explore Destinations</Btn>
                  <Btn onClick={()=>setShowVisa(true)} variant="outline" style={{fontSize:16,padding:"13px 36px",borderColor:"rgba(255,255,255,.5)",color:"#fff"}}>Visa Services</Btn>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{background:C.dark,padding:"26px 20px"}}>
              <div style={{maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,textAlign:"center"}}>
                {[["40+","Countries"],["1,200+","Travellers"],["98%","Satisfaction"],["15+","Years"]].map(([v,l]) => (
                  <div key={l}>
                    <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:34,fontWeight:700,color:C.gold,marginBottom:4}}>{v}</p>
                    <p style={{fontSize:13,color:C.muted}}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured */}
            <div style={{maxWidth:1200,margin:"0 auto",padding:"60px 20px 40px"}}>
              <div style={{textAlign:"center",marginBottom:44}}>
                <p style={{color:C.gold,letterSpacing:2,fontSize:12,fontWeight:600,textTransform:"uppercase",marginBottom:10}}>UPCOMING JOURNEYS</p>
                <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(28px,4vw,50px)",fontWeight:400,color:C.ink}}>Curated Destinations</h2>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:26}}>
                {TRIPS.slice(0,3).map(t => <TripCard key={t.id} trip={t} onSelect={t=>go("detail",t)}/>)}
              </div>
              <div style={{textAlign:"center",marginTop:32}}>
                <Btn onClick={()=>go("trips")} variant="outline" style={{fontSize:15,padding:"11px 38px"}}>View All Trips →</Btn>
              </div>
            </div>

            {/* Photo mosaic — hover state handled via inline onMouseEnter/Leave, NO hooks in map */}
            <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px 60px"}}>
              <div style={{textAlign:"center",marginBottom:32}}>
                <p style={{color:C.gold,letterSpacing:2,fontSize:12,fontWeight:600,textTransform:"uppercase",marginBottom:10}}>DESTINATIONS IN FOCUS</p>
                <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(24px,3.5vw,42px)",fontWeight:400,color:C.ink}}>A World of Wonders</h2>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridTemplateRows:"190px 190px",gap:8}}>
                {[
                  {url:HERO[1][0],label:"Santorini",area:"1/1/3/2"},
                  {url:HERO[2][1],label:"Arashiyama"},
                  {url:HERO[4][1],label:"Positano"},
                  {url:HERO[6][0],label:"Istanbul"},
                  {url:HERO[5][0],label:"Bali",area:"1/3/3/4"},
                  {url:HERO[3][0],label:"Marrakech"},
                  {url:HERO[2][3],label:"Kinkaku-ji"},
                ].map((c,i) => (
                  <div key={i} onClick={()=>go("trips")}
                    style={{position:"relative",overflow:"hidden",borderRadius:11,cursor:"pointer",gridArea:c.area||"auto"}}
                    onMouseEnter={e=>{e.currentTarget.querySelector("img").style.transform="scale(1.07)";e.currentTarget.querySelector("div").style.opacity="1";}}
                    onMouseLeave={e=>{e.currentTarget.querySelector("img").style.transform="scale(1)";e.currentTarget.querySelector("div").style.opacity="0";}}>
                    <img src={c.url} alt={c.label} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .5s"}}/>
                    <div style={{position:"absolute",inset:0,background:"rgba(26,18,9,0.45)",opacity:0,transition:"opacity .3s",display:"flex",alignItems:"flex-end",padding:"12px 14px",pointerEvents:"none"}}>
                      <span style={{color:"#fff",fontFamily:"Cormorant Garamond,serif",fontSize:17,fontWeight:600}}>{c.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div style={{background:C.sand,padding:"60px 20px"}}>
              <div style={{maxWidth:1060,margin:"0 auto"}}>
                <div style={{textAlign:"center",marginBottom:44}}>
                  <p style={{color:C.gold,letterSpacing:2,fontSize:12,fontWeight:600,textTransform:"uppercase",marginBottom:10}}>WHAT WE OFFER</p>
                  <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(26px,4vw,46px)",fontWeight:400,color:C.ink}}>Complete Travel Solutions</h2>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:22}}>
                  {[["✈️","Curated Trips","Expert itineraries to 40+ countries, max 20 travelers.",()=>go("trips")],
                    ["🛂","Visa Assistance","Full application support, document prep, appointments.",()=>setShowVisa(true)],
                    ["💰","Budget Planning","Smart calculator so you know exactly what you need.",()=>go("trips")],
                    ["🏨","Premium Hotels","From boutique riads to 5-star coastal resorts.",()=>go("trips")]
                  ].map(([ic,title,desc,a]) => (
                    <div key={title} onClick={a}
                      style={{background:C.white,borderRadius:15,padding:26,cursor:"pointer",border:`1px solid ${C.border}`,transition:"all .2s"}}
                      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 30px rgba(26,18,9,.1)";}}
                      onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                      <div style={{fontSize:34,marginBottom:13}}>{ic}</div>
                      <h3 style={{fontFamily:"Cormorant Garamond,serif",fontSize:21,fontWeight:600,marginBottom:8}}>{title}</h3>
                      <p style={{fontSize:14,color:C.muted,lineHeight:1.7}}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer style={{background:C.dark,padding:"44px 20px 26px",color:C.muted}}>
              <div style={{maxWidth:1060,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:32,marginBottom:32}}>
                <div>
                  <p style={{fontFamily:"Cormorant Garamond,serif",fontSize:21,color:C.gold,marginBottom:10}}>✈️ Smart Travel</p>
                  <p style={{fontSize:14,lineHeight:1.7}}>Premium travel agency crafting unforgettable journeys since 2010.</p>
                </div>
                {[{t:"Destinations",l:COUNTRIES},{t:"Services",l:["Trip Reservations","Visa Assistance","Budget Planning","Group Travel"]},{t:"Contact",l:["info@smarttravel.com","+1 (555) 123-4567","Mon–Fri 9am–6pm"]}].map(col => (
                  <div key={col.t}>
                    <p style={{color:C.gold2,fontSize:12,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>{col.t}</p>
                    {col.l.map(l => <p key={l} style={{fontSize:14,marginBottom:7,cursor:"pointer"}}>{l}</p>)}
                  </div>
                ))}
              </div>
              <div style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:18,textAlign:"center",fontSize:13}}>
                © 2025 Smart Travel Agency. All rights reserved.
              </div>
            </footer>
          </div>
        )}

        {/* ── TRIPS ── */}
        {page === "trips" && (
          <div>
            <div style={{marginBottom:28}}>
              <p style={{color:C.gold,letterSpacing:2,fontSize:12,fontWeight:600,textTransform:"uppercase",marginBottom:7}}>EXPLORE</p>
              <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(26px,4vw,46px)",fontWeight:400,color:C.ink,marginBottom:5}}>All Destinations</h1>
              <p style={{color:C.muted,fontSize:14}}>{filtered.length} trip{filtered.length!==1?"s":""} found</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12,marginBottom:28,background:C.white,borderRadius:13,padding:18,border:`1px solid ${C.border}`}}>
              <Input label="Search" value={q} onChange={setQ} placeholder="Search…"/>
              <Select label="Country" value={fCountry} onChange={setFCountry} options={[{value:"all",label:"All Countries"},...COUNTRIES.map(c=>({value:c,label:c}))]}/>
              <Select label="Month" value={fMonth} onChange={setFMonth} options={[{value:"all",label:"All Months"},...MONTHS.map(m=>({value:m,label:m}))]}/>
              <Input label="Max Price ($)" value={fPrice} onChange={setFPrice} type="number" placeholder="e.g. 2000"/>
            </div>
            {filtered.length === 0 ? (
              <div style={{textAlign:"center",padding:"56px 20px",color:C.muted}}>
                <p style={{fontSize:44,marginBottom:12}}>🔍</p>
                <p style={{fontSize:18,fontFamily:"Cormorant Garamond,serif"}}>No trips match your filters</p>
                <Btn onClick={()=>{setQ("");setFCountry("all");setFMonth("all");setFPrice("");}} variant="outline" style={{marginTop:14}}>Clear Filters</Btn>
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:26}}>
                {filtered.map(t => <TripCard key={t.id} trip={t} onSelect={t=>go("detail",t)}/>)}
              </div>
            )}
          </div>
        )}

        {/* ── DETAIL ── */}
        {page === "detail" && selTrip && <TripDetail trip={selTrip} onBack={()=>go("trips")}/>}

        {/* ── ABOUT ── */}
        {page === "about" && (
          <div style={{maxWidth:720,margin:"0 auto"}}>
            <p style={{color:C.gold,letterSpacing:2,fontSize:12,fontWeight:600,textTransform:"uppercase",marginBottom:8}}>OUR STORY</p>
            <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:"clamp(30px,4vw,50px)",fontWeight:400,marginBottom:22}}>About Smart Travel</h1>
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" alt=""
              style={{width:"100%",height:300,objectFit:"cover",borderRadius:16,marginBottom:28}}/>
            <p style={{fontSize:16,lineHeight:1.85,opacity:.85,marginBottom:18}}>Smart Travel Agency was founded in 2010 with a single mission: make extraordinary travel accessible. We specialise in small-group journeys — never more than 20 travellers — ensuring personal attention and authentic experiences.</p>
            <p style={{fontSize:16,lineHeight:1.85,opacity:.85,marginBottom:28}}>From the whitewashed cliffs of Santorini to the bamboo groves of Kyoto, our itineraries blend cultural immersion, premium comfort, and responsible travel.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:28}}>
              {[1,2,3,4,5,6].map(id => (
                <div key={id} style={{borderRadius:10,overflow:"hidden",aspectRatio:"4/3"}}>
                  <img src={HERO[id][0]} alt=""
                    style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s"}}
                    onMouseEnter={e=>e.target.style.transform="scale(1.07)"}
                    onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:28}}>
              {[["🌍","40+ Countries","Morocco to Japan and beyond"],["👥","Max 20 Travelers","Intimate small-group experiences"],["🛂","Full Visa Support","End-to-end application help"],["⭐","15+ Years","Trusted by 1,200+ travelers"]].map(([ic,title,desc]) => (
                <div key={title} style={{background:C.white,borderRadius:12,padding:"16px 18px",border:`1px solid ${C.border}`}}>
                  <p style={{fontSize:26,marginBottom:8}}>{ic}</p>
                  <p style={{fontWeight:600,fontSize:15,marginBottom:4}}>{title}</p>
                  <p style={{fontSize:13,color:C.muted}}>{desc}</p>
                </div>
              ))}
            </div>
            <Btn onClick={()=>go("trips")} fullWidth>Explore Our Trips →</Btn>
          </div>
        )}
      </main>
    </div>
  );
}
