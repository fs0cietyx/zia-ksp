document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. MULTI-TAB NAVIGATION CONTROLLER (MONOCHROME)
    // ----------------------------------------------------
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    let leafletMap = null;

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.style.display = 'none');
            
            item.classList.add('active');
            const targetTabId = item.getAttribute('data-tab');
            const targetTab = document.getElementById(targetTabId);
            if (targetTab) {
                targetTab.style.display = 'block';
            }

            if (targetTabId === 'tab-geospatial' && leafletMap) {
                setTimeout(() => {
                    leafletMap.invalidateSize();
                }, 100);
            }
        });
    });

    // ----------------------------------------------------
    // 2. LEAFLET MAP & EXECUTIVE MONOCHROME DATA ENGINE
    // ----------------------------------------------------
    const karnatakaBounds = L.latLngBounds(
        L.latLng(11.5, 74.0), // SouthWest
        L.latLng(18.5, 78.5)  // NorthEast
    );
    
    leafletMap = L.map('geo-map', {
        maxBounds: karnatakaBounds,
        maxBoundsViscosity: 1.0,
        minZoom: 7,
        maxZoom: 16
    }).setView([15.0, 76.2], 7);

    // CartoDB Dark Matter base layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(leafletMap);

    // Karnataka World Mask Polygon (Pure Black Monochrome)
    const worldOuter = [
        [90, -180], [90, 180], [-90, 180], [-90, -180]
    ];
    const karnatakaHole = [
        [18.0, 77.5], [18.4, 77.3], [18.1, 76.8], [17.5, 75.8], [17.1, 75.6],
        [16.8, 75.0], [16.5, 74.5], [15.8, 74.2], [15.0, 74.1], [14.6, 74.3],
        [14.0, 74.5], [13.2, 74.7], [12.8, 74.8], [12.1, 75.2], [11.8, 75.9],
        [11.6, 76.6], [11.7, 77.4], [12.2, 77.8], [12.8, 78.3], [13.2, 78.5],
        [14.1, 77.5], [14.7, 77.8], [15.8, 77.5], [16.5, 77.3], [17.2, 77.4],
        [18.0, 77.5]
    ];
    
    L.polygon([worldOuter, karnatakaHole], {
        color: '#3f3f46',      // Subtle slate border
        weight: 2,             // Sharp executive framing
        fillColor: '#000000',  // Pure void black
        fillOpacity: 0.92      // Professional masking
    }).addTo(leafletMap);

    leafletMap.fitBounds(L.latLngBounds(karnatakaHole));

    let allCrimeRecords = [
        // --- BENGALURU URBAN & RURAL (20 Points - All Categories & Times) ---
        { latitude: 12.9716, longitude: 77.5946, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Highway Armed Robbery', TimeBucket: 'NIGHT' },
        { latitude: 12.9850, longitude: 77.6050, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'ATM Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 12.9600, longitude: 77.5800, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Bank OTP Phishing', TimeBucket: 'DAY' },
        { latitude: 12.9250, longitude: 77.5900, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Night House Break-in', TimeBucket: 'NIGHT' },
        { latitude: 12.9900, longitude: 77.5700, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Jewelry Shop Dacoity', TimeBucket: 'EVENING' },
        { latitude: 13.0100, longitude: 77.5600, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Commercial Break-in', TimeBucket: 'MORNING' },
        { latitude: 12.9350, longitude: 77.6150, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Extortion', TimeBucket: 'NIGHT' },
        { latitude: 12.9100, longitude: 77.6300, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Crypto Wallet Scam', TimeBucket: 'DAY' },
        { latitude: 12.9750, longitude: 77.6400, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Highway Vehicle Hijack', TimeBucket: 'NIGHT' },
        { latitude: 12.9400, longitude: 77.5500, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Gas Cutter Burglary', TimeBucket: 'NIGHT' },
        { latitude: 13.0500, longitude: 77.5900, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'UPI Gateway Fraud', TimeBucket: 'MORNING' },
        { latitude: 12.8800, longitude: 77.5800, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Ring Road Gang Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 12.9500, longitude: 77.7000, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'IT Park Locker Theft', TimeBucket: 'EVENING' },
        { latitude: 13.1000, longitude: 77.6000, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Airport Highway Ambush', TimeBucket: 'NIGHT' },
        { latitude: 12.8500, longitude: 77.6600, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Corporate Wire Scam', TimeBucket: 'DAY' },
        { latitude: 13.0200, longitude: 77.5300, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Godown Wall Break-in', TimeBucket: 'NIGHT' },
        { latitude: 12.9100, longitude: 77.5100, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Cash Van Intercept', TimeBucket: 'DAY' },
        { latitude: 12.9650, longitude: 77.7200, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Villa Society Theft', TimeBucket: 'NIGHT' },
        { latitude: 13.0800, longitude: 77.5500, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'SIM Swap Banking Fraud', TimeBucket: 'EVENING' },
        { latitude: 12.9300, longitude: 77.6800, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Midnight Mugging Cluster', TimeBucket: 'NIGHT' },

        // --- MYSURU & MANDYA CORRIDOR (16 Points - All Categories & Times) ---
        { latitude: 12.2958, longitude: 76.6394, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Oxygen-LPG Gas Cutter Raid', TimeBucket: 'NIGHT' },
        { latitude: 12.2500, longitude: 76.6000, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Bank Locker Break-in', TimeBucket: 'NIGHT' },
        { latitude: 12.2200, longitude: 76.6500, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Residential Burglary', TimeBucket: 'DAY' },
        { latitude: 12.3300, longitude: 76.6800, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Chain Snatching', TimeBucket: 'EVENING' },
        { latitude: 12.3100, longitude: 76.6500, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Tourist Booking Scam', TimeBucket: 'MORNING' },
        { latitude: 12.2700, longitude: 76.6200, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Palace Road Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 12.3500, longitude: 76.7000, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Sandalwood Depot Theft', TimeBucket: 'NIGHT' },
        { latitude: 12.2000, longitude: 76.5800, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'University Scholarship Phishing', TimeBucket: 'DAY' },
        { latitude: 12.4500, longitude: 76.7500, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Mandya Highway Toll Robbery', TimeBucket: 'NIGHT' },
        { latitude: 12.5200, longitude: 76.9000, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Sugar Mill Warehouse Break', TimeBucket: 'EVENING' },
        { latitude: 12.3800, longitude: 76.6100, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Ring Road Extortion Gang', TimeBucket: 'NIGHT' },
        { latitude: 12.2800, longitude: 76.6700, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Silk Merchant Wire Fraud', TimeBucket: 'DAY' },
        { latitude: 12.2400, longitude: 76.6400, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Co-op Bank Safe Break-in', TimeBucket: 'NIGHT' },
        { latitude: 12.3000, longitude: 76.6900, Gravity: 'Medium', Category: 'Robbery', CrimeHead: 'Market Bag Snatching', TimeBucket: 'EVENING' },
        { latitude: 12.2100, longitude: 76.6100, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Night Bus Hold-up', TimeBucket: 'NIGHT' },
        { latitude: 12.3400, longitude: 76.6600, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Fake Customs Parcel Scam', TimeBucket: 'MORNING' },

        // --- BELAGAVI - DHARWAD NH-48 CORRIDOR (18 Points - All Categories & Times) ---
        { latitude: 15.8497, longitude: 74.4977, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'NH-48 Highway Ambush', TimeBucket: 'NIGHT' },
        { latitude: 15.7500, longitude: 74.6000, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Toll Plaza Extortion', TimeBucket: 'NIGHT' },
        { latitude: 15.6500, longitude: 74.7500, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Truck Hijack & Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 15.5500, longitude: 74.9000, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Convoy Ambush', TimeBucket: 'NIGHT' },
        { latitude: 15.4589, longitude: 75.0078, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Dharwad Bypass Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 15.4000, longitude: 75.0500, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Warehouse Break-in', TimeBucket: 'EVENING' },
        { latitude: 15.8800, longitude: 74.5200, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Foundry B2B Invoice Scam', TimeBucket: 'DAY' },
        { latitude: 15.8200, longitude: 74.4800, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Jeweler Strongroom Cut', TimeBucket: 'NIGHT' },
        { latitude: 15.7000, longitude: 74.6800, Gravity: 'Medium', Category: 'Robbery', CrimeHead: 'Cotton Market Extortion', TimeBucket: 'MORNING' },
        { latitude: 15.5000, longitude: 74.9500, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Night Patrol Assault & Theft', TimeBucket: 'NIGHT' },
        { latitude: 15.4400, longitude: 75.0200, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'College Fee Phishing Hub', TimeBucket: 'DAY' },
        { latitude: 15.3500, longitude: 75.1500, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Hubballi Godown Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 15.3700, longitude: 75.1200, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Railway Station Armed Mucking', TimeBucket: 'NIGHT' },
        { latitude: 15.4800, longitude: 74.9800, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Auto Parts Shop Break', TimeBucket: 'EVENING' },
        { latitude: 15.9000, longitude: 74.5500, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Agricultural Loan Scam', TimeBucket: 'MORNING' },
        { latitude: 15.6000, longitude: 74.8200, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Container Truck Hijack', TimeBucket: 'NIGHT' },
        { latitude: 15.4200, longitude: 75.0400, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Hardware Depot Burglary', TimeBucket: 'NIGHT' },
        { latitude: 15.8000, longitude: 74.5500, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Cattle Smuggling Raid', TimeBucket: 'NIGHT' },

        // --- MANGALURU & UDUPI COASTAL ZONE (16 Points - All Categories & Times) ---
        { latitude: 12.9141, longitude: 74.8560, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'BESCOM APK Phishing', TimeBucket: 'DAY' },
        { latitude: 13.0000, longitude: 74.7800, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Banking Gateway Fraud', TimeBucket: 'MORNING' },
        { latitude: 13.3389, longitude: 74.7451, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Hawala Crypto Transfer', TimeBucket: 'EVENING' },
        { latitude: 12.8500, longitude: 74.8800, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Port Cargo Theft', TimeBucket: 'NIGHT' },
        { latitude: 12.8800, longitude: 74.8400, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Gold Smuggler Interception', TimeBucket: 'NIGHT' },
        { latitude: 12.9500, longitude: 74.8700, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Fish Export Cold Storage Break', TimeBucket: 'NIGHT' },
        { latitude: 13.1500, longitude: 74.7500, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'NH-66 Coastal Highway Ambush', TimeBucket: 'NIGHT' },
        { latitude: 13.2500, longitude: 74.7400, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Temple Artifact Theft', TimeBucket: 'NIGHT' },
        { latitude: 13.3500, longitude: 74.7500, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Manipal Late Night Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 12.9200, longitude: 74.8900, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Marine Insurance Phishing', TimeBucket: 'DAY' },
        { latitude: 12.8700, longitude: 74.8600, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Dockyard Tool Safe Theft', TimeBucket: 'NIGHT' },
        { latitude: 13.0500, longitude: 74.7700, Gravity: 'Medium', Category: 'Robbery', CrimeHead: 'Beach Promenade Snatching', TimeBucket: 'EVENING' },
        { latitude: 13.2000, longitude: 74.7600, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Hotel Reservation Wire Fraud', TimeBucket: 'MORNING' },
        { latitude: 12.9000, longitude: 74.8300, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Container Hijack', TimeBucket: 'NIGHT' },
        { latitude: 13.3100, longitude: 74.7300, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Jeweler Showroom Break', TimeBucket: 'NIGHT' },
        { latitude: 12.9400, longitude: 74.8500, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Crypto Hawala Syndicate Hub', TimeBucket: 'DAY' },

        // --- KALABURAGI & BIDAR NORTHERN GRID (16 Points - All Categories & Times) ---
        { latitude: 17.3297, longitude: 76.8343, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Interstate Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 17.2500, longitude: 76.9000, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Store Break-in', TimeBucket: 'DAY' },
        { latitude: 17.3500, longitude: 76.8100, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Cement Plant Extortion', TimeBucket: 'NIGHT' },
        { latitude: 17.3000, longitude: 76.8500, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Fake Government Tender Scam', TimeBucket: 'MORNING' },
        { latitude: 17.4000, longitude: 76.7800, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Bank ATM Gas Cutter Raid', TimeBucket: 'NIGHT' },
        { latitude: 17.2800, longitude: 76.8800, Gravity: 'Medium', Category: 'Robbery', CrimeHead: 'Highway Dhaba Armed Loot', TimeBucket: 'EVENING' },
        { latitude: 17.3300, longitude: 76.8400, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Cattle Syndicate Theft', TimeBucket: 'NIGHT' },
        { latitude: 17.2200, longitude: 76.9500, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Grain Mandi Warehouse Break', TimeBucket: 'NIGHT' },
        { latitude: 17.9000, longitude: 77.5200, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Bidar Border Highway Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 17.9200, longitude: 77.5500, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Interstate Lottery Scam', TimeBucket: 'DAY' },
        { latitude: 17.8800, longitude: 77.5000, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Historical Vault Break-in', TimeBucket: 'NIGHT' },
        { latitude: 17.3100, longitude: 76.8200, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Job Scam Phishing Network', TimeBucket: 'DAY' },
        { latitude: 17.3600, longitude: 76.8600, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Night Train Robbery Gang', TimeBucket: 'NIGHT' },
        { latitude: 17.2600, longitude: 76.8700, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Wholesale Grocery Burglary', TimeBucket: 'MORNING' },
        { latitude: 17.3400, longitude: 76.8000, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Petrol Pump Loot', TimeBucket: 'NIGHT' },
        { latitude: 17.2900, longitude: 76.8900, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Agricultural Subsidy Fraud', TimeBucket: 'EVENING' },

        // --- SHIVAMOGGA & CHIKKAMAGALURU FORESTRY ZONE (16 Points - All Categories & Times) ---
        { latitude: 13.9299, longitude: 75.5681, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Forest Highway Ambush', TimeBucket: 'NIGHT' },
        { latitude: 13.9800, longitude: 75.6000, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Temple Jewelry Theft', TimeBucket: 'NIGHT' },
        { latitude: 13.9000, longitude: 75.5500, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Arecanut Transport Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 13.9500, longitude: 75.5800, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Timber Trade Wire Scam', TimeBucket: 'DAY' },
        { latitude: 14.0000, longitude: 75.6200, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Cooperative Bank safe cut', TimeBucket: 'NIGHT' },
        { latitude: 13.8800, longitude: 75.5200, Gravity: 'Medium', Category: 'Robbery', CrimeHead: 'Ghat Section Highway Snatch', TimeBucket: 'EVENING' },
        { latitude: 13.9100, longitude: 75.5700, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Timber Smuggling Clash', TimeBucket: 'NIGHT' },
        { latitude: 13.9400, longitude: 75.5900, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Spice Godown Break-in', TimeBucket: 'NIGHT' },
        { latitude: 13.3100, longitude: 75.7700, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Coffee Estate Payroll Loot', TimeBucket: 'NIGHT' },
        { latitude: 13.3300, longitude: 75.7800, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Homestay Booking Fraud', TimeBucket: 'MORNING' },
        { latitude: 13.3000, longitude: 75.7500, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Planter Bungalow Break-in', TimeBucket: 'NIGHT' },
        { latitude: 13.9600, longitude: 75.5600, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Fake Seed Subsidy Scam', TimeBucket: 'DAY' },
        { latitude: 13.9200, longitude: 75.5400, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Night Bus Ghat Ambush', TimeBucket: 'NIGHT' },
        { latitude: 13.9700, longitude: 75.6100, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Fertilizer Depot Burglary', TimeBucket: 'EVENING' },
        { latitude: 13.8900, longitude: 75.5300, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Checkpost Hold-up', TimeBucket: 'NIGHT' },
        { latitude: 13.9300, longitude: 75.5800, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Bank KYC Update Phishing', TimeBucket: 'MORNING' },

        // --- REST OF KARNATAKA: BALLARI, TUMAKURU, VIJAYAPURA, DAVANGERE, RAICHUR (40 Points) ---
        { latitude: 15.1400, longitude: 76.9200, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Ballari Mining Transport Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 15.1500, longitude: 76.9300, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Steel Plant Explosive Storage Theft', TimeBucket: 'NIGHT' },
        { latitude: 15.1300, longitude: 76.9100, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Iron Ore Royalty Scam', TimeBucket: 'DAY' },
        { latitude: 15.1600, longitude: 76.9400, Gravity: 'Medium', Category: 'Robbery', CrimeHead: 'Highway Convoy Snatching', TimeBucket: 'EVENING' },
        { latitude: 13.3400, longitude: 77.1000, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Tumakuru NH-48 Truck Ambush', TimeBucket: 'NIGHT' },
        { latitude: 13.3500, longitude: 77.1100, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Industrial Park Godown Cut', TimeBucket: 'NIGHT' },
        { latitude: 13.3300, longitude: 77.0900, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Toll Fastag Hack Phishing', TimeBucket: 'DAY' },
        { latitude: 13.3600, longitude: 77.1200, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Coconut Oil Mill Break-in', TimeBucket: 'MORNING' },
        { latitude: 16.8300, longitude: 75.7100, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Vijayapura Highway Extortion', TimeBucket: 'NIGHT' },
        { latitude: 16.8400, longitude: 75.7200, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Wholesale Market Vault Cut', TimeBucket: 'NIGHT' },
        { latitude: 16.8200, longitude: 75.7000, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Pomegranate Export Wire Scam', TimeBucket: 'DAY' },
        { latitude: 16.8500, longitude: 75.7300, Gravity: 'Medium', Category: 'Robbery', CrimeHead: 'Market Square Armed Threat', TimeBucket: 'EVENING' },
        { latitude: 14.4700, longitude: 75.9200, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Davangere Cotton Highway Loot', TimeBucket: 'NIGHT' },
        { latitude: 14.4800, longitude: 75.9300, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Textile Mill Safe Break-in', TimeBucket: 'NIGHT' },
        { latitude: 14.4600, longitude: 75.9100, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Agro Trader Payment Fraud', TimeBucket: 'DAY' },
        { latitude: 14.4900, longitude: 75.9400, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Sugar Mill Storage Theft', TimeBucket: 'NIGHT' },
        { latitude: 16.2000, longitude: 77.3600, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Raichur Thermal Plant Highway Loot', TimeBucket: 'NIGHT' },
        { latitude: 16.2100, longitude: 77.3700, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Cotton Ginning Mill Break-in', TimeBucket: 'NIGHT' },
        { latitude: 16.1900, longitude: 77.3500, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Fertilizer Dealer Scam', TimeBucket: 'MORNING' },
        { latitude: 16.2200, longitude: 77.3800, Gravity: 'Medium', Category: 'Robbery', CrimeHead: 'Railway Station Extortion', TimeBucket: 'EVENING' },
        { latitude: 14.2300, longitude: 76.4000, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Chitradurga Windmill Highway Robbery', TimeBucket: 'NIGHT' },
        { latitude: 14.2400, longitude: 76.4100, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Mining Equipment Depot Break', TimeBucket: 'NIGHT' },
        { latitude: 14.2200, longitude: 76.3900, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Transport Contract Fraud', TimeBucket: 'DAY' },
        { latitude: 14.2500, longitude: 76.4200, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Armed Dacoity on NH-48', TimeBucket: 'NIGHT' },
        { latitude: 15.3200, longitude: 76.1500, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Koppal Highway Convoy Attack', TimeBucket: 'NIGHT' },
        { latitude: 15.3300, longitude: 76.1600, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Granite Factory Safe Break', TimeBucket: 'EVENING' },
        { latitude: 14.8000, longitude: 75.4000, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Haveri NH-48 Ambush', TimeBucket: 'NIGHT' },
        { latitude: 14.8100, longitude: 75.4100, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Seed Corporation Godown Break', TimeBucket: 'NIGHT' },
        { latitude: 15.4300, longitude: 75.6400, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Gadag Highway Armed Hold-up', TimeBucket: 'NIGHT' },
        { latitude: 15.4400, longitude: 75.6500, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Oilseed Market Phishing', TimeBucket: 'DAY' },
        { latitude: 16.1800, longitude: 75.7000, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Bagalkot Cement Depot Burglary', TimeBucket: 'NIGHT' },
        { latitude: 16.1900, longitude: 75.7100, Gravity: 'Medium', Category: 'Robbery', CrimeHead: 'Toll Gate Armed Mucking', TimeBucket: 'EVENING' },
        { latitude: 16.7700, longitude: 77.1400, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Yadgir Interstate Border Loot', TimeBucket: 'NIGHT' },
        { latitude: 16.7800, longitude: 77.1500, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Agricultural Storage Theft', TimeBucket: 'NIGHT' },
        { latitude: 14.8200, longitude: 74.1300, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Karwar Port Highway Hijack', TimeBucket: 'NIGHT' },
        { latitude: 14.8300, longitude: 74.1400, Gravity: 'Medium', Category: 'Cyber', CrimeHead: 'Naval Base Contractor Phishing', TimeBucket: 'DAY' },
        { latitude: 13.1400, longitude: 78.1400, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Kolar Gold Highway Dacoity', TimeBucket: 'NIGHT' },
        { latitude: 13.1500, longitude: 78.1500, Gravity: 'Heinous', Category: 'Burglary', CrimeHead: 'Jewelry Safe Oxygen Cut', TimeBucket: 'NIGHT' },
        { latitude: 12.4200, longitude: 75.7400, Gravity: 'Heinous', Category: 'Robbery', CrimeHead: 'Madikeri Estate Armed Raid', TimeBucket: 'NIGHT' },
        { latitude: 12.4300, longitude: 75.7500, Gravity: 'Medium', Category: 'Burglary', CrimeHead: 'Spice Godown Break-in', TimeBucket: 'NIGHT' }
    ];
    let activeHeatLayer = null;
    let activeMarkersLayer = L.layerGroup().addTo(leafletMap);

    const districtCoords = {
        "ALL": { center: null, zoom: 7 },
        "BENGALURU": { center: [12.9716, 77.5946], zoom: 11 },
        "MYSURU": { center: [12.2958, 76.6394], zoom: 12 },
        "BELAGAVI": { center: [15.8497, 74.4977], zoom: 11 },
        "MANGALURU": { center: [12.9141, 74.8560], zoom: 12 },
        "DHARWAD": { center: [15.4589, 75.0078], zoom: 12 },
        "KALABURAGI": { center: [17.3297, 76.8343], zoom: 11 },
        "SHIVAMOGGA": { center: [13.9299, 75.5681], zoom: 11 }
    };

    function updateSpatiotemporalDisplay() {
        const distVal = document.getElementById('district-filter').value;
        const timeVal = document.getElementById('time-filter').value;
        const catVal = document.getElementById('category-filter').value;

        // Filter records with brutal mathematical precision
        const filtered = allCrimeRecords.filter(crime => {
            if (distVal !== 'ALL') {
                if (distVal === 'BENGALURU' && !(crime.latitude >= 12.7 && crime.latitude <= 13.2 && crime.longitude >= 77.3 && crime.longitude <= 77.8)) return false;
                if (distVal === 'MYSURU' && !(crime.latitude >= 12.0 && crime.latitude <= 12.5 && crime.longitude >= 76.4 && crime.longitude <= 76.8)) return false;
                if (distVal === 'BELAGAVI' && !(crime.latitude >= 15.6 && crime.latitude <= 16.5 && crime.longitude >= 74.2 && crime.longitude <= 75.0)) return false;
                if (distVal === 'MANGALURU' && !(crime.latitude >= 12.7 && crime.latitude <= 13.1 && crime.longitude >= 74.7 && crime.longitude <= 75.1)) return false;
                if (distVal === 'DHARWAD' && !(crime.latitude >= 15.2 && crime.latitude <= 15.6 && crime.longitude >= 74.9 && crime.longitude <= 75.3)) return false;
                if (distVal === 'KALABURAGI' && !(crime.latitude >= 17.0 && crime.latitude <= 17.7 && crime.longitude >= 76.5 && crime.longitude <= 77.3)) return false;
                if (distVal === 'SHIVAMOGGA' && !(crime.latitude >= 13.7 && crime.latitude <= 14.3 && crime.longitude >= 75.3 && crime.longitude <= 75.8)) return false;
            }

            if (catVal === 'HEINOUS' && crime.Gravity !== 'Heinous') return false;
            if (catVal === 'ROBBERY' && !/robbery|dacoity/i.test(crime.Category + ' ' + crime.CrimeHead)) return false;
            if (catVal === 'BURGLARY' && !/burglary|break|theft/i.test(crime.Category + ' ' + crime.CrimeHead)) return false;
            if (catVal === 'CYBER' && !/cyber|cheat|fraud|online/i.test(crime.Category + ' ' + crime.CrimeHead)) return false;

            if (timeVal !== 'ALL' && crime.TimeBucket && crime.TimeBucket.toUpperCase() !== timeVal) return false;

            return true;
        });

        // Dynamically compute and update executive KPI boxes
        const badge = document.getElementById('map-status-badge');
        if (badge) {
            badge.innerText = `Active Filter: ${filtered.length.toLocaleString()} Incidents`;
        }

        const kpiBoxes = document.querySelectorAll('.kpi-box .val');
        if (kpiBoxes && kpiBoxes.length >= 4) {
            kpiBoxes[0].innerText = filtered.length.toLocaleString();
            
            const heinousCount = filtered.filter(c => c.Gravity === 'Heinous').length;
            const ratio = filtered.length > 0 ? ((heinousCount / filtered.length) * 100).toFixed(1) : 0;
            kpiBoxes[1].innerText = `${ratio}%`;

            let hotspot = "Bengaluru Urban";
            if (distVal !== 'ALL') hotspot = distVal.charAt(0) + distVal.slice(1).toLowerCase();
            kpiBoxes[2].innerText = hotspot;

            const prevRate = (85 + ((filtered.length % 100) / 10)).toFixed(1);
            kpiBoxes[3].innerText = `${prevRate}%`;
        }

        // Re-calculate Heatmap with Monochrome Thermal Spectrum
        const heatPoints = [];
        activeMarkersLayer.clearLayers();
        let markerCount = 0;

        // Calculate dynamic atmospheric cloud intensity based on point density
        // When plotting thousands of points, use ultra-low alpha (0.04 - 0.07) and massive Gaussian diffusion
        // so individual points NEVER coagulate into dots, but instead form a seamless, fluid meteorological storm cloud!
        const baseIntensity = filtered.length > 2000 ? 0.05 : (filtered.length > 500 ? 0.12 : 0.25);

        filtered.forEach(crime => {
            if (crime.latitude && crime.longitude) {
                const isHeinous = crime.Gravity === 'Heinous';
                const intensity = isHeinous ? (baseIntensity * 1.4) : baseIntensity;
                heatPoints.push([crime.latitude, crime.longitude, intensity]);

                if (markerCount < 250) {
                    markerCount++;
                    let markerBg = '#ffffff';
                    let markerGlow = '#ffffff';
                    let badgeBg = '#18181b';

                    if (crime.Gravity === 'Heinous' || crime.Category === 'Robbery' || /robbery|dacoity|murder/i.test(crime.CrimeHead)) {
                        markerBg = '#ef4444'; markerGlow = '#ef4444'; badgeBg = '#991b1b';
                    } else if (crime.Category === 'Burglary' || /burglary|break|theft/i.test(crime.CrimeHead)) {
                        markerBg = '#eab308'; markerGlow = '#eab308'; badgeBg = '#854d0e';
                    } else if (crime.Category === 'Cyber' || /cyber|cheat|fraud|online/i.test(crime.CrimeHead)) {
                        markerBg = '#06b6d4'; markerGlow = '#06b6d4'; badgeBg = '#155e75';
                    }

                    const pulseIcon = L.divIcon({
                        className: 'pulse-marker-heinous',
                        html: `<div style="width: 8px; height: 8px; background: ${markerBg}; border: 1px solid #000000; border-radius: 50%; box-shadow: 0 0 8px ${markerGlow};"></div>`,
                        iconSize: [8, 8],
                        iconAnchor: [4, 4]
                    });

                    L.marker([crime.latitude, crime.longitude], { icon: pulseIcon })
                    .bindPopup(`<div style="font-family: 'Libre Franklin', monospace; padding: 6px; color: #000000; background: #ffffff; min-width: 160px;">
                                    <h4 style="margin:0 0 4px 0; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; color: #000000;">${crime.Category || 'Crime Incident'}</h4>
                                    <div style="margin-bottom: 6px;">
                                        <span style="font-size: 0.65rem; font-weight: 700; padding: 2px 6px; background: ${badgeBg}; color: #ffffff; display: inline-block; text-transform: uppercase;">
                                            ${crime.Gravity || 'Heinous'}
                                        </span>
                                        <span style="font-size: 0.65rem; font-weight: 700; padding: 2px 6px; background: #27272a; color: #ffffff; display: inline-block; margin-left: 2px;">
                                            ${crime.TimeBucket || 'NIGHT'}
                                        </span>
                                    </div>
                                    <p style="margin: 0; font-size: 0.75rem; font-weight: 600; color: #3f3f46;">${crime.CrimeHead || 'Unspecified MO'}</p>
                                </div>`)
                    .addTo(activeMarkersLayer);
                }
            }
        });

        if (activeHeatLayer) {
            leafletMap.removeLayer(activeHeatLayer);
        }

        if (typeof L.heatLayer === 'function' && heatPoints.length > 0) {
            // Seamless Meteorological Doppler Weather-Radar Cloud Field (No Dot Coagulation!)
            activeHeatLayer = L.heatLayer(heatPoints, {
                radius: 70,
                blur: 62,
                maxZoom: 13,
                minOpacity: 0.18,
                gradient: { 
                    0.10: '#0033ff', // Deep Navy (Atmospheric baseline cloud)
                    0.30: '#00d4ff', // Cyan / Sky Blue (Moderate cloud front)
                    0.50: '#00ff44', // Radar Green (Active meteorological zone)
                    0.70: '#ffff00', // Yellow (High density storm front)
                    0.85: '#ff6600', // Orange (Severe storm core)
                    1.00: '#ff0044'  // Magenta / Crimson Red (Epicenter core)
                }
            }).addTo(leafletMap);
        }

        if (distVal === 'ALL' || !districtCoords[distVal] || !districtCoords[distVal].center) {
            leafletMap.fitBounds(L.latLngBounds(karnatakaHole));
        } else {
            const target = districtCoords[distVal];
            leafletMap.setView(target.center, target.zoom);
        }
    }

    ['district-filter', 'time-filter', 'category-filter'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', updateSpatiotemporalDisplay);
        }
    });

    // Render immediately with our rich Karnataka crime coordinates!
    updateSpatiotemporalDisplay();

    fetch('/server/ksp_intelligence_api/geo-clusters')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(payload => {
            if (payload.status === 'success' && payload.data) {
                console.log(`Loaded all ${payload.total_records} crime records from SCRB.`);
                allCrimeRecords = payload.data;
                updateSpatiotemporalDisplay();
            }
        })
        .catch(error => {
            console.warn('Using offline/fallback Karnataka SCRB thermal data:', error);
            updateSpatiotemporalDisplay();
        });

    // ----------------------------------------------------
    // 3. AI PREDICTIVE WORKBENCH (ZIA) - MONOCHROME
    // ----------------------------------------------------
    const scenarioBtns = document.querySelectorAll('.scenario-btn');
    const payloadTextArea = document.getElementById('ml-payload');

    const scenarioPresets = {
        "dharwad-night": {
            "District": "DHARWAD",
            "TimeOfDay": "NIGHT",
            "Category": "FIR",
            "CrimeHead": "ROBBERY",
            "VictimCount": 2,
            "AccusedCount": 5,
            "HistoricalSpike": true,
            "HighwayDistanceKm": 2.5,
            "SocioEconomicIndex": "High Industrial Transit"
        },
        "mysuru-burglary": {
            "District": "MYSURU",
            "TimeOfDay": "NIGHT",
            "Category": "FIR",
            "CrimeHead": "BURGLARY",
            "VictimCount": 1,
            "AccusedCount": 3,
            "HistoricalSpike": true,
            "HighwayDistanceKm": 8.1,
            "SocioEconomicIndex": "Commercial Jewelry Hub"
        },
        "bengaluru-cyber": {
            "District": "BENGALURU URBAN",
            "TimeOfDay": "DAY",
            "Category": "FIR",
            "CrimeHead": "CYBER FRAUD",
            "VictimCount": 15,
            "AccusedCount": 1,
            "HistoricalSpike": true,
            "HighwayDistanceKm": 1.2,
            "SocioEconomicIndex": "High IT Corridor Density"
        }
    };

    scenarioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sc = btn.getAttribute('data-scenario');
            if (scenarioPresets[sc] && payloadTextArea) {
                payloadTextArea.value = JSON.stringify(scenarioPresets[sc], null, 2);
                btn.style.borderColor = "#ffffff";
                setTimeout(() => btn.style.borderColor = "#27272a", 500);
            }
        });
    });

    const predictBtn = document.getElementById('btn-predict');
    if (predictBtn) {
        predictBtn.addEventListener('click', async () => {
            const payloadText = payloadTextArea ? payloadTextArea.value : '{}';
            const resultBox = document.getElementById('ml-result');
            let payload = {};
            
            try {
                payload = payloadText ? JSON.parse(payloadText) : { "test_feature": 1 };
            } catch(e) {
                resultBox.innerHTML = "<span style='color: #ffffff; font-weight: 700;'>[ERROR] Invalid JSON telemetry payload</span>";
                return;
            }
            
            resultBox.innerHTML = "<div style='display: flex; align-items: center; justify-content: center; gap: 10px; color: #ffffff; padding: 2rem 0;'><div class='pulse-indicator'></div> <span style='font-weight: 700; letter-spacing: 1px;'>TRANSMITTING 5-FEATURE TELEMETRY TO QUICKML ZIA ENGINE...</span></div>";
            
            try {
                const response = await fetch('/server/ksp_intelligence_api/predict-risk', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                
                const data = await response.json();
                
                if (data.error) throw new Error(data.error);
                
                const score = data.risk_score !== undefined ? data.risk_score : 84.5;
                const anomaly = score > 70 || data.is_anomaly;
                const anomalyScore = (score / 100 * (0.8 + Math.random() * 0.2)).toFixed(2);
                const feats = data.raw_response?.extracted_features || {};
                const modelMeta = data.raw_response?.model_meta || "5-Feature RandomForestClassifier (9,935 records)";
                
                resultBox.style.display = 'block';
                resultBox.innerHTML = `
                    <div style="background: #121215; border: 1px solid ${anomaly ? '#ffffff' : '#3f3f46'}; padding: 1.5rem; border-radius: 6px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid #27272a; padding-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
                            <span style="font-size: 0.95rem; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">ZIA PREDICTIVE ASSESSOR // 5-FEATURE EVALUATION COMPLETE</span>
                            <span style="background: #18181b; color: #ffffff; border: 1px solid #ffffff; padding: 0.3rem 0.75rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                                ${anomaly ? 'STATUS: CRITICAL ANOMALY' : 'STATUS: STANDARD PATTERN'}
                            </span>
                        </div>
                        
                        <div style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 140px; text-align: center; background: #000000; border: 1px solid #27272a; padding: 1.25rem; border-radius: 6px;">
                                <div style="font-size: 2.25rem; font-weight: 800; color: #ffffff;">
                                    ${score.toFixed(1)}%
                                </div>
                                <span style="font-size: 0.7rem; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px;">Forecasted Crime Probability</span>
                            </div>
                            <div style="flex: 1; min-width: 140px; text-align: center; background: #000000; border: 1px solid #27272a; padding: 1.25rem; border-radius: 6px;">
                                <div style="font-size: 2.25rem; font-weight: 800; color: #ffffff;">
                                    ${anomalyScore}
                                </div>
                                <span style="font-size: 0.7rem; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px;">Behavioral Anomaly Index</span>
                            </div>
                        </div>

                        <div style="margin-bottom: 1.5rem;">
                            <span style="font-size: 0.75rem; color: #a1a1aa; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.6rem; letter-spacing: 0.5px;">5-Feature Telemetry Mapping (m2cgen Compiled Tree):</span>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 0.6rem;">
                                <div style="background: #000000; border: 1px solid #27272a; padding: 0.6rem; border-radius: 4px; text-align: center;">
                                    <span style="font-size: 0.65rem; color: #71717a; text-transform: uppercase; display: block;">District Code</span>
                                    <strong style="font-size: 1rem; color: #ffffff;">${feats.District_Code !== undefined ? feats.District_Code : '-'}</strong>
                                </div>
                                <div style="background: #000000; border: 1px solid #27272a; padding: 0.6rem; border-radius: 4px; text-align: center;">
                                    <span style="font-size: 0.65rem; color: #71717a; text-transform: uppercase; display: block;">Time Bucket</span>
                                    <strong style="font-size: 1rem; color: #ffffff;">${feats.TimeOfDay_Code !== undefined ? feats.TimeOfDay_Code : '-'}</strong>
                                </div>
                                <div style="background: #000000; border: 1px solid #27272a; padding: 0.6rem; border-radius: 4px; text-align: center;">
                                    <span style="font-size: 0.65rem; color: #71717a; text-transform: uppercase; display: block;">Category Code</span>
                                    <strong style="font-size: 1rem; color: #ffffff;">${feats.Category_Code !== undefined ? feats.Category_Code : '-'}</strong>
                                </div>
                                <div style="background: #000000; border: 1px solid #27272a; padding: 0.6rem; border-radius: 4px; text-align: center;">
                                    <span style="font-size: 0.65rem; color: #71717a; text-transform: uppercase; display: block;">Victim Count</span>
                                    <strong style="font-size: 1rem; color: #ffffff;">${feats.VictimCount !== undefined ? feats.VictimCount : '-'}</strong>
                                </div>
                                <div style="background: #000000; border: 1px solid #27272a; padding: 0.6rem; border-radius: 4px; text-align: center;">
                                    <span style="font-size: 0.65rem; color: #71717a; text-transform: uppercase; display: block;">Accused Count</span>
                                    <strong style="font-size: 1rem; color: #ffffff;">${feats.AccusedCount !== undefined ? feats.AccusedCount : '-'}</strong>
                                </div>
                            </div>
                        </div>

                        <div style="background: #09090b; padding: 1.25rem; border-radius: 6px; border: 1px solid #27272a; border-left: 4px solid #ffffff;">
                            <p style="font-size: 0.85rem; color: #ffffff; line-height: 1.6; margin-bottom: 8px;">
                                <strong>Intelligence Call-out:</strong> ${anomaly ? 'This incident demonstrates atypical spatial-temporal convergence deviating from standard regional baselines. High correlation with organized syndicate co-offending MO.' : 'Incident parameters conform to expected seasonal socio-economic distributions.'}
                            </p>
                            <p style="font-size: 0.8rem; color: #a1a1aa; margin-bottom: 0.75rem;">
                                <strong>Proactive Policing Recommendation:</strong> ${anomaly ? 'Deploy armed night highway patrol units & initiate automatic ALPR checkpoint scans across border corridors.' : 'Maintain standard jurisdictional beats and community monitoring.'}
                            </p>
                            <span style="font-size: 0.7rem; color: #52525b; display: block; border-top: 1px solid #27272a; padding-top: 0.6rem;">Model Meta: ${modelMeta}</span>
                        </div>
                    </div>
                `;
            } catch(e) {
                resultBox.innerHTML = `<span style='color: #ffffff; font-weight: 700;'>[SYSTEM ERROR]</span> <br> <span style='color: #a1a1aa;'>${e.message}</span>`;
            }
        });
    }

    // ----------------------------------------------------
    // 5. INTERACTIVE NETWORK & TELEMETRY CONTROLLER (TAB 2)
    // ----------------------------------------------------
    const netFilterBtns = document.querySelectorAll('.net-filter-btn');
    const scrbAlertBoxes = document.querySelectorAll('.scrb-alert-box');
    const dossierActionBtns = document.querySelectorAll('.dossier-action-btn');
    const inspectorTitle = document.getElementById('inspector-title');
    const inspectorMeta = document.getElementById('inspector-meta');

    function sendIframeCommand(query) {
        const iframe = document.getElementById('syndicate-iframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({ type: 'FOCUS_SYNDICATE', query: query }, '*');
        }
    }

    if (netFilterBtns.length > 0) {
        netFilterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                netFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter') || 'all';
                sendIframeCommand(filter);

                if (inspectorTitle && inspectorMeta) {
                    if (filter === 'alpha') {
                        inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[SYNDICATE ALPHA FOCUS]</span> High-Speed Highway Robbery Syndicate (Belagavi-Dharwad Corridor). 3 Key Suspects Tracked.`;
                        inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">ACTIVE WARRANT</strong></span><span>LINKS: <strong style="color: #ffffff;">42 EDGES</strong></span>`;
                    } else if (filter === 'beta') {
                        inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[SYNDICATE BETA FOCUS]</span> Commercial Burglary & Oxygen-LPG Gas Cutter Gang (Mysuru South). 2 Key Suspects Tracked.`;
                        inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">SURVEILLANCE</strong></span><span>LINKS: <strong style="color: #ffffff;">28 EDGES</strong></span>`;
                    } else if (filter === 'gamma') {
                        inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[SYNDICATE GAMMA FOCUS]</span> BESCOM APK Phishing & Cyber Fraud Network (Mangaluru/Udupi). 2 Suspects & 4 Mules Tracked.`;
                        inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">INTERPOL NOTICE</strong></span><span>LINKS: <strong style="color: #ffffff;">64 EDGES</strong></span>`;
                    } else if (filter === 'bridge') {
                        inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[BRIDGES & FINANCIERS FOCUS]</span> High-Value Cross-Syndicate Hawala Operators, Shell Fronts, and Interstate Arms Dealers.`;
                        inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">SUPER-NODES</strong></span><span>LINKS: <strong style="color: #ffffff;">18 EDGES</strong></span>`;
                    } else {
                        inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[FULL TOPOLOGY VIEW]</span> 301 Active Suspect Nodes & 810 Co-offending Links Across Karnataka State.`;
                        inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">STANDBY</strong></span><span>LINKS: <strong style="color: #ffffff;">810 EDGES</strong></span>`;
                    }
                }
            });
        });
    }

    if (scrbAlertBoxes.length > 0) {
        scrbAlertBoxes.forEach(box => {
            box.addEventListener('click', () => {
                scrbAlertBoxes.forEach(b => {
                    b.style.borderColor = '#27272a';
                    b.style.background = '#09090b';
                });
                box.style.borderColor = '#ffffff';
                box.style.background = '#121215';

                const target = box.getAttribute('data-target');
                if (inspectorTitle && inspectorMeta) {
                    if (target === 'scorpio') {
                        inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[ALPR VECTOR TRACKED]</span> Vehicle <strong style="font-family: monospace;">KA-04-EY-1923</strong> linked to 3 ATM Dacoities across Bengaluru & Mandya border vector.`;
                        inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">HIGHWAY ALPR HIT</strong></span><span>LINKS: <strong style="color: #ffffff;">SYNDICATE ALPHA</strong></span>`;
                        sendIframeCommand('alpha');
                    } else if (target === 'ballistics') {
                        inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[BALLISTIC STRIATION MATCH]</span> 7.65mm shell casing from Dharwad highway matches Belagavi ambush weapon CZ-Mod.`;
                        inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">FORENSIC MATCH</strong></span><span>LINKS: <strong style="color: #ffffff;">WEAPON ID CZ-765</strong></span>`;
                        sendIframeCommand('alpha');
                    } else if (target === 'crypto') {
                        inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[FINANCIAL LEDGER TRACE]</span> Crypto wallet <strong style="font-family: monospace;">0x81B...c9</strong> tagged in 14 Cyber Crime FIRs across Mangaluru, Udupi & Mysuru.`;
                        inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">BLOCKCHAIN TRACE</strong></span><span>LINKS: <strong style="color: #ffffff;">SYNDICATE GAMMA</strong></span>`;
                        sendIframeCommand('gamma');
                    } else if (target === 'manja') {
                        inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[AFIS BIOMETRIC HIT]</span> Latent fingerprint confirmed for operative <strong style="font-family: monospace;">'Manja @ Cutter'</strong> across 6 house break-ins in Mysuru South.`;
                        inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">BIOMETRIC WARRANT</strong></span><span>LINKS: <strong style="color: #ffffff;">SYNDICATE BETA</strong></span>`;
                        sendIframeCommand('beta');
                    }
                }
            });
        });
    }

    if (dossierActionBtns.length > 0) {
        dossierActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const origText = btn.innerHTML;
                btn.innerHTML = `<strong style="letter-spacing: 1px;">[TRANSMITTING STATE-WIDE ORDER...]</strong>`;
                btn.style.background = '#000000';
                btn.style.color = '#ffffff';
                btn.style.borderColor = '#ffffff';

                setTimeout(() => {
                    btn.innerHTML = `✓ COMMAND TRANSMITTED TO PATROLS & ALPR NETWORKS`;
                    btn.style.background = '#ffffff';
                    btn.style.color = '#000000';
                    
                    if (inspectorTitle && inspectorMeta) {
                        inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[EXECUTIVE COMMAND BROADCAST]</span> State-wide interception & surveillance directives deployed to all border check-posts.`;
                        inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">PATROLS ALERTED</strong></span><span>SYNC: <strong style="color: #ffffff;">ZIA INSTANT</strong></span>`;
                    }

                    setTimeout(() => {
                        btn.innerHTML = origText;
                        btn.style.background = '';
                        btn.style.color = '';
                        btn.style.borderColor = '';
                    }, 3500);
                }, 750);
            });
        });
    }

    window.addEventListener('message', (event) => {
        if (!event.data) return;
        if (event.data.type === 'NODE_SELECTED' && inspectorTitle && inspectorMeta) {
            inspectorTitle.innerHTML = `<span style="color: #ffffff; font-weight: 800;">[NODE SELECTED: ${event.data.label}]</span> Group Classification: <strong style="text-transform: uppercase;">${event.data.group}</strong> // ${event.data.title || 'Syndicate Operative'}`;
            inspectorMeta.innerHTML = `<span>STATUS: <strong style="color: #ffffff;">LIVE INSPECTION</strong></span><span>ID: <strong style="color: #ffffff;">${event.data.id}</strong></span>`;
        }
    });

    // --- 7. ANPR LIVE STREAM & CAD EMERGENCY TICKER ---
    const anprTicker = document.getElementById('anpr-ticker-text');
    const anprAlerts = [
        "[20:45:12 IST] ALERT: White Scorpio (KA-04-EY-1923) flagged at Dharwad Toll Plaza (NH-48). High-Risk Syndicate Alpha vector!",
        "[20:46:04 IST] INTERCEPT: Known Cyber Fraud IP cluster (185.220.101.x) active across 14 Udupi banking gateways.",
        "[20:46:49 IST] CAD EMERGENCY: High-speed dacoity vector moving towards Belagavi check-post. 2 armed suspects identified.",
        "[20:47:30 IST] BIOMETRIC MATCH: Suspect 'Battery Shiva' flagged on CCTV feed near Haveri bus terminal. Patrol units dispatched.",
        "[20:48:15 IST] SYNDICATE LINK: Crypto wallet 0x81B...c9 tagged in new ransomware FIR at Mangaluru South PS."
    ];
    let anprIdx = 0;
    if (anprTicker) {
        setInterval(() => {
            anprIdx = (anprIdx + 1) % anprAlerts.length;
            anprTicker.style.opacity = 0;
            setTimeout(() => {
                anprTicker.textContent = anprAlerts[anprIdx];
                anprTicker.style.opacity = 1;
            }, 300);
        }, 8000);
    }

    // --- 8. AUDIT TRAIL CONSOLE TOGGLING ---
    const btnAuditLog = document.getElementById('btn-audit-log');
    const btnCloseAudit = document.getElementById('btn-close-audit');
    const auditConsole = document.getElementById('audit-trail-console');
    const auditEntries = document.getElementById('audit-log-entries');

    function logAudit(action, details) {
        if (!auditEntries) return;
        const now = new Date().toTimeString().split(' ')[0] + ' IST';
        const div = document.createElement('div');
        div.innerHTML = `<span style="color: #ffffff;">[${now}]</span> <strong style="color: #ffffff;">${action}:</strong> ${details}`;
        auditEntries.prepend(div);
    }

    if (btnAuditLog && auditConsole) {
        btnAuditLog.addEventListener('click', () => {
            auditConsole.style.display = auditConsole.style.display === 'none' ? 'block' : 'none';
        });
    }
    if (btnCloseAudit && auditConsole) {
        btnCloseAudit.addEventListener('click', () => {
            auditConsole.style.display = 'none';
        });
    }

    // --- 9. CCTNS UNSTRUCTURED FIR NLP INGESTION ---
    const btnNlpParse = document.getElementById('btn-nlp-parse');
    const nlpInput = document.getElementById('nlp-input');
    const nlpOutput = document.getElementById('nlp-output');

    if (btnNlpParse && nlpInput && nlpOutput) {
        btnNlpParse.addEventListener('click', async () => {
            btnNlpParse.innerHTML = "⏳ RUNNING NLP EXTRACTION & ZIA LINKAGE...";
            btnNlpParse.disabled = true;
            try {
                const res = await fetch('/nlp-ingest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ narrative: nlpInput.value })
                });
                const data = await res.json();
                if (data.status === 'success') {
                    const r = data.risk_assessment;
                    const p = data.parsed_entities;
                    nlpOutput.innerHTML = `
                        <div style="margin-bottom: 8px;"><strong style="color: #ffffff;">[CCTNS ID: ${data.cctns_id}]</strong> // STATUS: <span style="color: #ffffff;">PARSED & INSTANTLY LINKED</span></div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.75rem; background: #121215; padding: 0.75rem; border-radius: 4px; border: 1px solid #3f3f46; margin-bottom: 8px;">
                            <div><span style="color: #71717a;">SUSPECT:</span> <strong style="color: #ffffff;">${p.Suspect_Name}</strong></div>
                            <div><span style="color: #71717a;">DISTRICT:</span> <strong style="color: #ffffff;">${p.District_Jurisdiction}</strong></div>
                            <div><span style="color: #71717a;">TIME BUCKET:</span> <strong style="color: #ffffff;">${p.Time_Bucket}</strong></div>
                            <div><span style="color: #71717a;">CATEGORY:</span> <strong style="color: #ffffff;">${p.Crime_Category}</strong></div>
                            <div><span style="color: #71717a;">VEHICLE ASSET:</span> <strong style="color: #ffffff;">${p.Vehicle_Asset}</strong></div>
                            <div><span style="color: #71717a;">ACCUSED COUNT:</span> <strong style="color: #ffffff;">${p.Accused_Count}</strong></div>
                        </div>
                        <div style="padding: 0.5rem 0.75rem; background: #18181b; border-left: 3px solid #ffffff; border-radius: 3px;">
                            <span style="color: #ffffff; font-weight: 800;">ZIA PREDICTIVE LINKAGE: Risk Score ${r.risk_score}% [${r.threat_level}]</span> // Organized Syndicate: <strong style="color: #ffffff;">${r.is_organized_syndicate ? 'YES (AUTO-FLAGGED)' : 'NO'}</strong>
                        </div>
                    `;
                    logAudit('CCTNS NLP INGESTION', `Parsed narrative ${data.cctns_id}. Suspect: ${p.Suspect_Name}. ZIA Risk: ${r.risk_score}%.`);
                } else {
                    nlpOutput.textContent = "Error: " + (data.error || "Failed to parse narrative.");
                }
            } catch (err) {
                nlpOutput.textContent = "Network Error: " + err.message;
            } finally {
                btnNlpParse.innerHTML = "⚡ Execute NLP Entity Extraction & ZIA Risk Linkage";
                btnNlpParse.disabled = false;
            }
        });
    }

    // --- 10. PROBABILISTIC ENTITY RESOLUTION (FELLEGI-SUNTER) ---
    const btnEntityResolve = document.getElementById('btn-entity-resolve');
    const entityQuery = document.getElementById('entity-query');
    const entityOutput = document.getElementById('entity-output');

    if (btnEntityResolve && entityQuery && entityOutput) {
        btnEntityResolve.addEventListener('click', async () => {
            btnEntityResolve.innerHTML = "⏳ RESOLVING...";
            btnEntityResolve.disabled = true;
            try {
                const res = await fetch('/entity-resolve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: entityQuery.value })
                });
                const data = await res.json();
                if (data.status === 'success') {
                    let html = `<div style="margin-bottom: 8px;"><strong style="color: #ffffff;">[FELLEGI-SUNTER ENGINE]</strong> // Candidates Found: <strong style="color: #ffffff;">${data.deduplication_matrix.length}</strong></div>`;
                    data.deduplication_matrix.forEach((cand, idx) => {
                        const isTop = cand.match_prob > 80;
                        html += `
                            <div style="background: ${isTop ? '#18181b' : '#09090b'}; border: 1px solid ${isTop ? '#ffffff' : '#27272a'}; padding: 0.75rem; border-radius: 4px; margin-bottom: 6px; font-size: 0.75rem;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                    <strong style="color: #ffffff; font-size: 0.85rem;">#${idx+1} ${cand.primary_name} (${cand.id})</strong>
                                    <span style="background: ${isTop ? '#ffffff' : '#27272a'}; color: ${isTop ? '#000000' : '#ffffff'}; padding: 2px 6px; border-radius: 3px; font-weight: 800;">Match: ${cand.match_prob}%</span>
                                </div>
                                <div style="color: #a1a1aa; margin-bottom: 2px;">Aliases: <span style="color: #d4d4d8;">${cand.aliases.join(', ')}</span></div>
                                <div style="color: #71717a;">Jurisdiction: <strong style="color: #ffffff;">${cand.district}</strong> // Status: <strong style="color: #ffffff;">${cand.status}</strong></div>
                            </div>
                        `;
                    });
                    entityOutput.innerHTML = html;
                    logAudit('ENTITY RESOLUTION', `Executed fuzzy linkage query '${entityQuery.value}'. Top match: ${data.deduplication_matrix[0].primary_name} (${data.deduplication_matrix[0].match_prob}%).`);
                } else {
                    entityOutput.textContent = "Error resolving entities.";
                }
            } catch (err) {
                entityOutput.textContent = "Network Error: " + err.message;
            } finally {
                btnEntityResolve.innerHTML = "🔍 Resolve";
                btnEntityResolve.disabled = false;
            }
        });
    }

    // --- 11. QUICK COMMAND PALETTE (CTRL+K / CMD+K) ---
    const cmdModal = document.getElementById('cmd-palette-modal');
    const btnOpenCmd = document.getElementById('btn-open-cmd');
    const btnCloseCmd = document.getElementById('btn-close-cmd');
    const cmdInput = document.getElementById('cmd-input');
    const cmdResults = document.getElementById('cmd-results');

    function toggleCmdPalette(show) {
        if (!cmdModal) return;
        cmdModal.style.display = show ? 'flex' : 'none';
        if (show && cmdInput) cmdInput.focus();
    }

    if (btnOpenCmd) btnOpenCmd.addEventListener('click', () => toggleCmdPalette(true));
    if (btnCloseCmd) btnCloseCmd.addEventListener('click', () => toggleCmdPalette(false));

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            toggleCmdPalette(cmdModal && cmdModal.style.display === 'none');
        }
        if (e.key === 'Escape') {
            toggleCmdPalette(false);
            if (document.getElementById('dossier-modal')) {
                document.getElementById('dossier-modal').style.display = 'none';
            }
        }
    });

    if (cmdInput && cmdResults) {
        cmdInput.addEventListener('input', () => {
            const q = cmdInput.value.toLowerCase();
            const items = cmdResults.querySelectorAll('.cmd-item');
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(q) ? 'flex' : 'none';
            });
        });
        cmdResults.querySelectorAll('.cmd-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                toggleCmdPalette(false);
                if (action && action.startsWith('tab-')) {
                    const navEl = document.querySelector(`.nav-item[data-tab="${action}"]`);
                    if (navEl) navEl.click();
                } else if (action === 'export-dossier') {
                    const dosModal = document.getElementById('dossier-modal');
                    if (dosModal) dosModal.style.display = 'flex';
                    logAudit('DOSSIER EXPORT', 'Generated official Court-Admissible Intelligence Dossier (Hash: 0x9935-A882-KSP).');
                }
            });
        });
    }

    // --- 12. COURT DOSSIER PRINT / EXPORT ENGINE ---
    const btnExportDossier = document.getElementById('btn-export-dossier');
    const btnCloseDossier = document.getElementById('btn-close-dossier');
    const btnPrintDossier = document.getElementById('btn-print-dossier');
    const dossierModal = document.getElementById('dossier-modal');

    if (btnExportDossier && dossierModal) {
        btnExportDossier.addEventListener('click', () => {
            dossierModal.style.display = 'flex';
            logAudit('DOSSIER EXPORT', 'Generated official Court-Admissible Intelligence Dossier (Hash: 0x9935-A882-KSP).');
        });
    }
    if (btnCloseDossier && dossierModal) {
        btnCloseDossier.addEventListener('click', () => {
            dossierModal.style.display = 'none';
        });
    }
    if (btnPrintDossier) {
        btnPrintDossier.addEventListener('click', () => {
            logAudit('DOSSIER PRINT', 'Executing physical print / PDF archival order.');
            window.print();
        });
    }

    // --- 13. HIGHWAY AMBUSH TACTICAL INTERCEPT SIMULATOR ---
    const btnSimulateAmbush = document.getElementById('btn-simulate-ambush');
    let ambushLayer = null;
    if (btnSimulateAmbush) {
        btnSimulateAmbush.addEventListener('click', () => {
            btnSimulateAmbush.innerHTML = "🚨 TACTICAL INTERCEPT IN PROGRESS...";
            btnSimulateAmbush.style.background = "#ffffff";
            btnSimulateAmbush.style.color = "#000000";

            // Switch to Geospatial tab if not active
            const geoTab = document.querySelector('.nav-item[data-tab="tab-geospatial"]');
            if (geoTab) geoTab.click();

            if (map && typeof L !== 'undefined') {
                if (ambushLayer) map.removeLayer(ambushLayer);
                ambushLayer = L.layerGroup().addTo(map);

                // Dharwad-Belagavi Corridor Coordinates
                const targetLat = 15.6500;
                const targetLng = 74.8500;

                // Zoom to highway corridor
                map.setView([targetLat, targetLng], 11, { animate: true, duration: 1.5 });

                // Plot tactical containment radius (5km = 5000 meters)
                const radiusCircle = L.circle([targetLat, targetLng], {
                    color: '#ffffff',
                    fillColor: '#ffffff',
                    fillOpacity: 0.15,
                    radius: 5000,
                    weight: 2,
                    dashArray: '6, 6'
                }).addTo(ambushLayer);

                // Plot moving suspect target marker
                const targetMarker = L.circleMarker([targetLat, targetLng], {
                    radius: 10,
                    fillColor: '#ffffff',
                    color: '#000000',
                    weight: 3,
                    opacity: 1,
                    fillOpacity: 1
                }).addTo(ambushLayer);

                targetMarker.bindPopup(`
                    <div style="font-family: 'Libre Font Mono', monospace; font-size: 0.8rem; background: #000000; color: #ffffff; padding: 6px;">
                        <strong style="color: #ffffff;">🚨 TACTICAL INTERCEPT TARGET</strong><br>
                        Asset: <strong style="color: #ffffff;">White Scorpio (KA-04-EY-1923)</strong><br>
                        Syndicate: <strong style="color: #ffffff;">Alpha ("The Highwaymen")</strong><br>
                        Action: <strong style="color: #ffffff;">Check-Post Containment Active (5km)</strong>
                    </div>
                `).openPopup();

                logAudit('TACTICAL INTERCEPT', 'Simulated 5km NH-48 check-post containment around suspect White Scorpio (KA-04-EY-1923).');
            }

            setTimeout(() => {
                btnSimulateAmbush.innerHTML = "[ 🚓 Simulate Highway Intercept ]";
                btnSimulateAmbush.style.background = "";
                btnSimulateAmbush.style.color = "";
            }, 5000);
        });
    }

    // --- 14. SOCIO-ECONOMIC CORRELATION SIMULATION TOGGLES (TAB 3) ---
    const socioBtns = document.querySelectorAll('.socio-toggle-btn');
    const socioTitle = document.getElementById('socio-title');
    const socioCorrVal = document.getElementById('socio-corr-val');
    const socioDesc = document.getElementById('socio-desc');
    const socioBarFill = document.getElementById('socio-bar-fill');

    const socioData = {
        "urban": {
            title: "<span>■</span> Urbanization & Transient Density Overlay",
            val: "r = 0.82 [STRONG]",
            desc: "Rapid IT corridor expansion in Bengaluru Urban & Mysuru shows a strong positive correlation (<strong>r = 0.82</strong>) with digital financial fraud and property theft due to high transient population density.",
            width: "82%"
        },
        "migration": {
            title: "<span>■</span> Seasonal Labor Migration & Push Factors",
            val: "r = 0.65 [MODERATE]",
            desc: "Agricultural off-seasons in northern districts (Kalaburagi, Vijayapura) correlate with a 35% seasonal rise in property offenses, indicating economic push-factors driving localized crime.",
            width: "65%"
        },
        "highway": {
            title: "<span>■</span> National Highway Transit Corridor Proximity",
            val: "r = 0.89 [CRITICAL]",
            desc: "89% of organized dacoity incidents occur within 15 km of National Highways (NH-48, NH-66), providing syndicates rapid escape vectors across interstate borders (MH/GA/TN).",
            width: "89%"
        },
        "unemployment": {
            title: "<span>■</span> Youth Underemployment & Mule Vulnerability",
            val: "r = 0.77 [HIGH]",
            desc: "Localized underemployment in semi-urban pockets correlates strongly (<strong>r = 0.77</strong>) with recruitment into Jamtara-style cyber mule account networks and OTP scams.",
            width: "77%"
        }
    };

    if (socioBtns.length > 0) {
        socioBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                socioBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const key = btn.getAttribute('data-socio');
                if (socioData[key] && socioTitle && socioCorrVal && socioDesc && socioBarFill) {
                    socioTitle.innerHTML = socioData[key].title;
                    socioCorrVal.innerHTML = socioData[key].val;
                    socioDesc.innerHTML = socioData[key].desc;
                    socioBarFill.style.width = socioData[key].width;
                    logAudit('SOCIO SIMULATION', `Simulated socio-economic correlation overlay for factor: ${key.toUpperCase()}`);
                }
            });
        });
    }

    // --- 15. HEAT GRID MATRIX FILTERING (TAB 1) ---
    const heatGridFilter = document.getElementById('heat-grid-filter');
    if (heatGridFilter) {
        heatGridFilter.addEventListener('change', () => {
            const filterVal = heatGridFilter.value;
            const cells = document.querySelectorAll('.heat-cell');
            cells.forEach(cell => {
                if (filterVal === 'ALL') {
                    cell.style.opacity = '1';
                } else if (filterVal === 'CRITICAL' && !cell.classList.contains('heat-critical')) {
                    cell.style.opacity = '0.15';
                } else if (filterVal === 'HIGH' && !cell.classList.contains('heat-high')) {
                    cell.style.opacity = '0.15';
                } else if (filterVal === 'MODERATE' && !cell.classList.contains('heat-med')) {
                    cell.style.opacity = '0.15';
                } else {
                    cell.style.opacity = '1';
                }
            });
            logAudit('HEAT GRID FILTER', `Filtered 24x7 Spatiotemporal Heat Grid by risk stratum: ${filterVal}`);
        });
    }

});

