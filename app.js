// ============================================
// DUNETRACK PRO - Full App Engine
// Real Weather | Web Bluetooth | Device Sensors | Auth | PWA
// ============================================

// ---- PWA SERVICE WORKER ----
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}

// ---- MULTI-LANGUAGE TRANSLATIONS ----
const TRANSLATIONS = {
    en: {
        onb_welcome_title: "Welcome to DuneTrack",
        onb_welcome_desc: "The ultimate sandboarding analytics app. Track your rides, measure your speed, and conquer the dunes like a pro.",
        onb_tracking_title: "Real-Time GPS Tracking",
        onb_tracking_desc: "Track your speed, distance, and duration in real-time using your phone's GPS. See your live speed gauge and beat your records.",
        onb_sensors_title: "Smart Sensors",
        onb_sensors_desc: "Connect your sandboard sensor via Bluetooth or use your phone's built-in accelerometer and gyroscope for tilt, airtime, and acceleration data.",
        onb_analytics_title: "Analytics & Achievements",
        onb_analytics_desc: "View detailed ride history, personal records, performance trends, and unlock achievements as you improve.",
        onb_eco_title: "Weather & Eco Tracker",
        onb_eco_desc: "Real-time desert weather conditions, eco-friendly riding score, and environmental zone guides. Ride responsibly and protect our beautiful dunes.",
        onb_feat_speed: "Live Speed", onb_feat_distance: "Distance", onb_feat_duration: "Duration",
        onb_feat_bluetooth: "Bluetooth", onb_feat_tilt: "Tilt Angle", onb_feat_airtime: "Airtime",
        onb_feat_records: "Records", onb_feat_trends: "Trends", onb_feat_achieve: "Achievements",
        onb_feat_weather: "Weather", onb_feat_eco: "Eco Score", onb_feat_zones: "Zones",
        onb_skip: "Skip", onb_next: "Next", onb_getstarted: "Get Started",
        land_badge: "IoT Sandboarding Analytics", land_hero_sub: "Track your speed. Measure your jumps. Conquer the dunes. The ultimate sandboarding companion powered by real-time GPS, smart sensors, and Bluetooth IoT.",
        land_getstarted: "Get Started", land_explore: "Explore Features",
        land_feat_tag: "What's Inside", land_feat_title: "Everything You Need to Ride Like a Pro",
        land_f1_title: "Live Speed Tracking", land_f1_desc: "Real-time GPS speed gauge showing your current speed, max speed, and distance covered on the dunes.",
        land_f2_title: "Bluetooth Sensors", land_f2_desc: "Connect your smart sandboard via Bluetooth to get acceleration, tilt angle, and airtime data.",
        land_f3_title: "Ride Analytics", land_f3_desc: "Full ride history, personal records, weekly trends, and performance charts to track your progress.",
        land_f4_title: "Achievements", land_f4_desc: "Unlock badges like Speed Demon, Sky Rider, and Dune Master as you improve your skills.",
        land_f5_title: "Desert Weather", land_f5_desc: "Real-time UAE desert weather, wind speed, humidity, and UV index before you ride.",
        land_f6_title: "Eco Tracker", land_f6_desc: "Ride responsibly with eco scoring, safe riding zones, and environmental protection guidelines.",
        land_action_tag: "Real-Time Performance", land_action_title: "Track Every Ride in Real-Time", land_action_desc: "See your speed, distance, and duration update live as you carve down the dunes. The speed gauge fills up as you accelerate, and all data is saved automatically.",
        land_board_tag: "IoT Hardware", land_board_title: "Smart Sandboard Sensors", land_board_desc: "Our IoT-enabled sandboard comes with built-in accelerometer, gyroscope, and Bluetooth connectivity. Attach the sensor module to any board and get instant data on your phone.",
        land_spec1_title: "Accelerometer", land_spec1_desc: "Measures G-force and acceleration", land_spec2_title: "Gyroscope", land_spec2_desc: "Tilt angle and board orientation", land_spec3_title: "Bluetooth 5.0", land_spec3_desc: "Low-energy wireless to your phone", land_spec4_title: "Long Battery", land_spec4_desc: "8+ hours of continuous riding",
        land_map_title: "Explore UAE Desert Dunes", land_map_desc: "From Al Badayer to Liwa, discover the best sandboarding locations with live desert weather conditions and riding zone guides.",
        land_mstat1: "Safe Riding Zones", land_mstat2: "Live Weather", land_mstat3: "Route Tracking",
        land_eco_tag: "Protect Our Dunes", land_eco_title: "Ride Responsibly", land_eco_desc: "DuneTrack's Eco Tracker monitors your riding impact and scores your environmental friendliness. Stay on safe zones, protect wildlife habitats, and leave no trace.",
        land_eco1: "Eco Score Rating (0-100)", land_eco2: "Environmental Zone Maps", land_eco3: "Wildlife Protection Alerts", land_eco4: "Leave No Trace Guidelines",
        land_community_title: "Join the Dune Riders Community",
        land_cta_title: "Ready to Ride?", land_cta_desc: "Create your free account and start tracking your sandboarding sessions today.", land_cta_signup: "Sign Up Free", land_cta_signin: "Already have an account? Sign In"
    },
    ar: {
        onb_welcome_title: "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643 \u0641\u064A DuneTrack",
        onb_welcome_desc: "\u062A\u0637\u0628\u064A\u0642 \u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u062A\u0632\u0644\u062C \u0639\u0644\u0649 \u0627\u0644\u0631\u0645\u0627\u0644. \u062A\u062A\u0628\u0639 \u0631\u062D\u0644\u0627\u062A\u0643\u060C \u0642\u0633 \u0633\u0631\u0639\u062A\u0643\u060C \u0648\u0627\u0642\u0647\u0631 \u0627\u0644\u0643\u062B\u0628\u0627\u0646 \u0643\u0627\u0644\u0645\u062D\u062A\u0631\u0641\u064A\u0646.",
        onb_tracking_title: "\u062A\u062A\u0628\u0639 GPS \u0641\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0641\u0639\u0644\u064A",
        onb_tracking_desc: "\u062A\u062A\u0628\u0639 \u0633\u0631\u0639\u062A\u0643 \u0648\u0645\u0633\u0627\u0641\u062A\u0643 \u0648\u0645\u062F\u062A\u0643 \u0641\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0641\u0639\u0644\u064A \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 GPS \u0647\u0627\u062A\u0641\u0643.",
        onb_sensors_title: "\u0623\u062C\u0647\u0632\u0629 \u0627\u0633\u062A\u0634\u0639\u0627\u0631 \u0630\u0643\u064A\u0629",
        onb_sensors_desc: "\u0627\u0631\u0628\u0637 \u0645\u0633\u062A\u0634\u0639\u0631 \u0644\u0648\u062D \u0627\u0644\u062A\u0632\u0644\u062C \u0639\u0628\u0631 \u0627\u0644\u0628\u0644\u0648\u062A\u0648\u062B \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0645 \u0645\u0633\u062A\u0634\u0639\u0631\u0627\u062A \u0647\u0627\u062A\u0641\u0643 \u0644\u0644\u0645\u064A\u0644 \u0648\u0627\u0644\u062A\u0633\u0627\u0631\u0639.",
        onb_analytics_title: "\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0648\u0627\u0644\u0625\u0646\u062C\u0627\u0632\u0627\u062A",
        onb_analytics_desc: "\u0639\u0631\u0636 \u0633\u062C\u0644 \u0627\u0644\u0631\u062D\u0644\u0627\u062A \u0648\u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0642\u064A\u0627\u0633\u064A\u0629 \u0648\u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0648\u0641\u062A\u062D \u0627\u0644\u0625\u0646\u062C\u0627\u0632\u0627\u062A.",
        onb_eco_title: "\u0627\u0644\u0637\u0642\u0633 \u0648\u0627\u0644\u0628\u064A\u0626\u0629",
        onb_eco_desc: "\u0638\u0631\u0648\u0641 \u0627\u0644\u0637\u0642\u0633 \u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A\u0629 \u0648\u0646\u0642\u0627\u0637 \u0627\u0644\u0628\u064A\u0626\u0629 \u0648\u0623\u062F\u0644\u0629 \u0627\u0644\u0645\u0646\u0627\u0637\u0642. \u0627\u0631\u0643\u0628 \u0628\u0645\u0633\u0624\u0648\u0644\u064A\u0629.",
        onb_feat_speed: "\u0627\u0644\u0633\u0631\u0639\u0629", onb_feat_distance: "\u0627\u0644\u0645\u0633\u0627\u0641\u0629", onb_feat_duration: "\u0627\u0644\u0645\u062F\u0629",
        onb_feat_bluetooth: "\u0628\u0644\u0648\u062A\u0648\u062B", onb_feat_tilt: "\u0632\u0627\u0648\u064A\u0629 \u0627\u0644\u0645\u064A\u0644", onb_feat_airtime: "\u0632\u0645\u0646 \u0627\u0644\u0637\u064A\u0631\u0627\u0646",
        onb_feat_records: "\u0623\u0631\u0642\u0627\u0645 \u0642\u064A\u0627\u0633\u064A\u0629", onb_feat_trends: "\u0627\u0644\u0627\u062A\u062C\u0627\u0647\u0627\u062A", onb_feat_achieve: "\u0625\u0646\u062C\u0627\u0632\u0627\u062A",
        onb_feat_weather: "\u0627\u0644\u0637\u0642\u0633", onb_feat_eco: "\u0646\u0642\u0627\u0637 \u0628\u064A\u0626\u064A\u0629", onb_feat_zones: "\u0627\u0644\u0645\u0646\u0627\u0637\u0642",
        onb_skip: "\u062A\u062E\u0637\u064A", onb_next: "\u0627\u0644\u062A\u0627\u0644\u064A", onb_getstarted: "\u0627\u0628\u062F\u0623 \u0627\u0644\u0622\u0646",
        land_badge: "\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u062A\u0632\u0644\u062C \u0639\u0644\u0649 \u0627\u0644\u0631\u0645\u0627\u0644 IoT", land_hero_sub: "\u062A\u062A\u0628\u0639 \u0633\u0631\u0639\u062A\u0643. \u0642\u0633 \u0642\u0641\u0632\u0627\u062A\u0643. \u0627\u0642\u0647\u0631 \u0627\u0644\u0643\u062B\u0628\u0627\u0646. \u0631\u0641\u064A\u0642 \u0627\u0644\u062A\u0632\u0644\u062C \u0627\u0644\u0645\u062B\u0627\u0644\u064A \u0628\u062A\u0642\u0646\u064A\u0629 GPS \u0648\u0627\u0644\u0645\u0633\u062A\u0634\u0639\u0631\u0627\u062A \u0627\u0644\u0630\u0643\u064A\u0629.",
        land_getstarted: "\u0627\u0628\u062F\u0623 \u0627\u0644\u0622\u0646", land_explore: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0645\u064A\u0632\u0627\u062A",
        land_feat_tag: "\u0645\u0627\u0630\u0627 \u0628\u0627\u0644\u062F\u0627\u062E\u0644", land_feat_title: "\u0643\u0644 \u0645\u0627 \u062A\u062D\u062A\u0627\u062C\u0647 \u0644\u0644\u0631\u0643\u0648\u0628 \u0643\u0627\u0644\u0645\u062D\u062A\u0631\u0641\u064A\u0646",
        land_f1_title: "\u062A\u062A\u0628\u0639 \u0627\u0644\u0633\u0631\u0639\u0629 \u0627\u0644\u0645\u0628\u0627\u0634\u0631", land_f1_desc: "\u0645\u0642\u064A\u0627\u0633 \u0633\u0631\u0639\u0629 GPS \u064A\u0639\u0631\u0636 \u0633\u0631\u0639\u062A\u0643 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0648\u0627\u0644\u0642\u0635\u0648\u0649 \u0648\u0627\u0644\u0645\u0633\u0627\u0641\u0629.",
        land_f2_title: "\u0645\u0633\u062A\u0634\u0639\u0631\u0627\u062A \u0628\u0644\u0648\u062A\u0648\u062B", land_f2_desc: "\u0627\u0631\u0628\u0637 \u0644\u0648\u062D \u0627\u0644\u062A\u0632\u0644\u062C \u0627\u0644\u0630\u0643\u064A \u0639\u0628\u0631 \u0627\u0644\u0628\u0644\u0648\u062A\u0648\u062B \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0633\u0627\u0631\u0639 \u0648\u0627\u0644\u0645\u064A\u0644.",
        land_f3_title: "\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0631\u062D\u0644\u0627\u062A", land_f3_desc: "\u0633\u062C\u0644 \u0643\u0627\u0645\u0644 \u0644\u0644\u0631\u062D\u0644\u0627\u062A \u0648\u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0642\u064A\u0627\u0633\u064A\u0629 \u0648\u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621.",
        land_f4_title: "\u0625\u0646\u062C\u0627\u0632\u0627\u062A", land_f4_desc: "\u0627\u0641\u062A\u062D \u0634\u0627\u0631\u0627\u062A \u0645\u062B\u0644 \u0634\u064A\u0637\u0627\u0646 \u0627\u0644\u0633\u0631\u0639\u0629 \u0648\u0633\u064A\u062F \u0627\u0644\u0643\u062B\u0628\u0627\u0646.",
        land_f5_title: "\u0637\u0642\u0633 \u0627\u0644\u0635\u062D\u0631\u0627\u0621", land_f5_desc: "\u0637\u0642\u0633 \u0627\u0644\u0635\u062D\u0631\u0627\u0621 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0648\u0633\u0631\u0639\u0629 \u0627\u0644\u0631\u064A\u0627\u062D \u0648\u0627\u0644\u0631\u0637\u0648\u0628\u0629.",
        land_f6_title: "\u0645\u062A\u062A\u0628\u0639 \u0628\u064A\u0626\u064A", land_f6_desc: "\u0627\u0631\u0643\u0628 \u0628\u0645\u0633\u0624\u0648\u0644\u064A\u0629 \u0645\u0639 \u0646\u0642\u0627\u0637 \u0627\u0644\u0628\u064A\u0626\u0629 \u0648\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0631\u0643\u0648\u0628 \u0627\u0644\u0622\u0645\u0646\u0629.",
        land_action_tag: "\u0623\u062F\u0627\u0621 \u0645\u0628\u0627\u0634\u0631", land_action_title: "\u062A\u062A\u0628\u0639 \u0643\u0644 \u0631\u062D\u0644\u0629 \u0645\u0628\u0627\u0634\u0631\u0629", land_action_desc: "\u0634\u0627\u0647\u062F \u0633\u0631\u0639\u062A\u0643 \u0648\u0645\u0633\u0627\u0641\u062A\u0643 \u062A\u062A\u062D\u062F\u062B \u0645\u0628\u0627\u0634\u0631\u0629 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0632\u0644\u062C.",
        land_board_tag: "\u0623\u062C\u0647\u0632\u0629 IoT", land_board_title: "\u0645\u0633\u062A\u0634\u0639\u0631\u0627\u062A \u0644\u0648\u062D \u0627\u0644\u062A\u0632\u0644\u062C \u0627\u0644\u0630\u0643\u064A", land_board_desc: "\u0644\u0648\u062D \u0627\u0644\u062A\u0632\u0644\u062C \u0627\u0644\u0630\u0643\u064A \u0645\u0639 \u0645\u0642\u064A\u0627\u0633 \u062A\u0633\u0627\u0631\u0639 \u0648\u062C\u064A\u0631\u0648\u0633\u0643\u0648\u0628 \u0648\u0628\u0644\u0648\u062A\u0648\u062B.",
        land_map_title: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0643\u062B\u0628\u0627\u0646 \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A", land_map_desc: "\u0645\u0646 \u0627\u0644\u0628\u062F\u0627\u064A\u0631 \u0625\u0644\u0649 \u0644\u064A\u0648\u0627\u060C \u0627\u0643\u062A\u0634\u0641 \u0623\u0641\u0636\u0644 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062A\u0632\u0644\u062C.",
        land_eco_tag: "\u0627\u062D\u0645\u0650 \u0643\u062B\u0628\u0627\u0646\u0646\u0627", land_eco_title: "\u0627\u0631\u0643\u0628 \u0628\u0645\u0633\u0624\u0648\u0644\u064A\u0629", land_eco_desc: "\u064A\u0631\u0627\u0642\u0628 \u0645\u062A\u062A\u0628\u0639 \u0627\u0644\u0628\u064A\u0626\u0629 \u062A\u0623\u062B\u064A\u0631 \u0631\u0643\u0648\u0628\u0643 \u0648\u064A\u0642\u064A\u0651\u0645 \u0635\u062F\u0627\u0642\u062A\u0643 \u0644\u0644\u0628\u064A\u0626\u0629.",
        land_community_title: "\u0627\u0646\u0636\u0645 \u0644\u0645\u062C\u062A\u0645\u0639 \u0631\u0627\u0643\u0628\u064A \u0627\u0644\u0643\u062B\u0628\u0627\u0646",
        land_cta_title: "\u062C\u0627\u0647\u0632 \u0644\u0644\u0631\u0643\u0648\u0628\u061F", land_cta_desc: "\u0623\u0646\u0634\u0626 \u062D\u0633\u0627\u0628\u0643 \u0627\u0644\u0645\u062C\u0627\u0646\u064A \u0648\u0627\u0628\u062F\u0623 \u062A\u062A\u0628\u0639 \u062C\u0644\u0633\u0627\u062A\u0643 \u0627\u0644\u064A\u0648\u0645.", land_cta_signup: "\u0633\u062C\u0644 \u0645\u062C\u0627\u0646\u0627\u064B", land_cta_signin: "\u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F \u0633\u062C\u0644 \u062F\u062E\u0648\u0644"
    },
    fr: {
        onb_welcome_title: "Bienvenue sur DuneTrack",
        onb_welcome_desc: "L'application ultime d'analyse de sandboard. Suivez vos sessions, mesurez votre vitesse et dominez les dunes comme un pro.",
        onb_tracking_title: "Suivi GPS en Temps R\u00E9el",
        onb_tracking_desc: "Suivez votre vitesse, distance et dur\u00E9e en temps r\u00E9el avec le GPS de votre t\u00E9l\u00E9phone.",
        onb_sensors_title: "Capteurs Intelligents",
        onb_sensors_desc: "Connectez votre capteur de planche via Bluetooth ou utilisez l'acc\u00E9l\u00E9rom\u00E8tre et le gyroscope int\u00E9gr\u00E9s de votre t\u00E9l\u00E9phone.",
        onb_analytics_title: "Analyses et Succ\u00E8s",
        onb_analytics_desc: "Historique d\u00E9taill\u00E9 des sessions, records personnels, tendances de performance et d\u00E9bloquez des succ\u00E8s.",
        onb_eco_title: "M\u00E9t\u00E9o et \u00C9co-Tracker",
        onb_eco_desc: "Conditions m\u00E9t\u00E9o du d\u00E9sert en temps r\u00E9el, score \u00E9cologique et guides des zones environnementales.",
        onb_feat_speed: "Vitesse", onb_feat_distance: "Distance", onb_feat_duration: "Dur\u00E9e",
        onb_feat_bluetooth: "Bluetooth", onb_feat_tilt: "Inclinaison", onb_feat_airtime: "Vol",
        onb_feat_records: "Records", onb_feat_trends: "Tendances", onb_feat_achieve: "Succ\u00E8s",
        onb_feat_weather: "M\u00E9t\u00E9o", onb_feat_eco: "Score \u00C9co", onb_feat_zones: "Zones",
        onb_skip: "Passer", onb_next: "Suivant", onb_getstarted: "Commencer"
    },
    es: {
        onb_welcome_title: "Bienvenido a DuneTrack",
        onb_welcome_desc: "La app definitiva de sandboarding. Rastrea tus sesiones, mide tu velocidad y conquista las dunas como un profesional.",
        onb_tracking_title: "Rastreo GPS en Tiempo Real",
        onb_tracking_desc: "Rastrea tu velocidad, distancia y duraci\u00F3n en tiempo real usando el GPS de tu tel\u00E9fono.",
        onb_sensors_title: "Sensores Inteligentes",
        onb_sensors_desc: "Conecta tu sensor de tabla por Bluetooth o usa el aceler\u00F3metro y giroscopio de tu tel\u00E9fono.",
        onb_analytics_title: "An\u00E1lisis y Logros",
        onb_analytics_desc: "Historial detallado de sesiones, r\u00E9cords personales, tendencias de rendimiento y desbloquea logros.",
        onb_eco_title: "Clima y Eco-Tracker",
        onb_eco_desc: "Condiciones clim\u00E1ticas del desierto en tiempo real, puntuaci\u00F3n ecol\u00F3gica y gu\u00EDas de zonas ambientales.",
        onb_feat_speed: "Velocidad", onb_feat_distance: "Distancia", onb_feat_duration: "Duraci\u00F3n",
        onb_feat_bluetooth: "Bluetooth", onb_feat_tilt: "Inclinaci\u00F3n", onb_feat_airtime: "Vuelo",
        onb_feat_records: "R\u00E9cords", onb_feat_trends: "Tendencias", onb_feat_achieve: "Logros",
        onb_feat_weather: "Clima", onb_feat_eco: "Eco Score", onb_feat_zones: "Zonas",
        onb_skip: "Omitir", onb_next: "Siguiente", onb_getstarted: "Empezar"
    },
    hi: {
        onb_welcome_title: "DuneTrack \u092E\u0947\u0902 \u0938\u094D\u0935\u093E\u0917\u0924 \u0939\u0948",
        onb_welcome_desc: "\u0938\u0948\u0902\u0921\u092C\u094B\u0930\u094D\u0921\u093F\u0902\u0917 \u090F\u0928\u093E\u0932\u093F\u091F\u093F\u0915\u094D\u0938 \u0905\u0928\u0941\u092A\u094D\u0930\u092F\u094B\u0917\u0964 \u0905\u092A\u0928\u0940 \u0930\u093E\u0907\u0921 \u091F\u094D\u0930\u0948\u0915 \u0915\u0930\u0947\u0902, \u0917\u0924\u093F \u092E\u093E\u092A\u0947\u0902 \u0914\u0930 \u091F\u0940\u0932\u094B\u0902 \u092A\u0930 \u0935\u093F\u091C\u092F \u092A\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902\u0964",
        onb_tracking_title: "\u0930\u093F\u092F\u0932-\u091F\u093E\u0907\u092E GPS \u091F\u094D\u0930\u0948\u0915\u093F\u0902\u0917",
        onb_tracking_desc: "\u0905\u092A\u0928\u0947 \u092B\u094B\u0928 \u0915\u0947 GPS \u0938\u0947 \u0930\u093F\u092F\u0932-\u091F\u093E\u0907\u092E \u092E\u0947\u0902 \u0917\u0924\u093F, \u0926\u0942\u0930\u0940 \u0914\u0930 \u0938\u092E\u092F \u091F\u094D\u0930\u0948\u0915 \u0915\u0930\u0947\u0902\u0964",
        onb_sensors_title: "\u0938\u094D\u092E\u093E\u0930\u094D\u091F \u0938\u0947\u0902\u0938\u0930",
        onb_sensors_desc: "\u092C\u094D\u0932\u0942\u091F\u0942\u0925 \u0938\u0947 \u0915\u0928\u0947\u0915\u094D\u091F \u0915\u0930\u0947\u0902 \u092F\u093E \u090F\u0915\u094D\u0938\u0947\u0932\u0947\u0930\u094B\u092E\u0940\u091F\u0930 \u0914\u0930 \u091C\u093E\u092F\u0930\u094B\u0938\u094D\u0915\u094B\u092A \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964",
        onb_analytics_title: "\u090F\u0928\u093E\u0932\u093F\u091F\u093F\u0915\u094D\u0938 \u0914\u0930 \u0909\u092A\u0932\u092C\u094D\u0927\u093F\u092F\u093E\u0901",
        onb_analytics_desc: "\u0935\u093F\u0938\u094D\u0924\u0943\u0924 \u0930\u093E\u0907\u0921 \u0907\u0924\u093F\u0939\u093E\u0938, \u0930\u093F\u0915\u0949\u0930\u094D\u0921, \u0930\u0941\u091D\u093E\u0928 \u0914\u0930 \u0909\u092A\u0932\u092C\u094D\u0927\u093F\u092F\u093E\u0901 \u0905\u0928\u0932\u0949\u0915 \u0915\u0930\u0947\u0902\u0964",
        onb_eco_title: "\u092E\u094C\u0938\u092E \u0914\u0930 \u0908\u0915\u094B \u091F\u094D\u0930\u0948\u0915\u0930",
        onb_eco_desc: "\u0930\u093F\u092F\u0932-\u091F\u093E\u0907\u092E \u0930\u0947\u0917\u093F\u0938\u094D\u0924\u093E\u0928 \u092E\u094C\u0938\u092E, \u0908\u0915\u094B \u0938\u094D\u0915\u094B\u0930 \u0914\u0930 \u092A\u0930\u094D\u092F\u093E\u0935\u0930\u0923 \u091C\u094B\u0928 \u0917\u093E\u0907\u0921\u0964",
        onb_feat_speed: "\u0917\u0924\u093F", onb_feat_distance: "\u0926\u0942\u0930\u0940", onb_feat_duration: "\u0938\u092E\u092F",
        onb_feat_bluetooth: "\u092C\u094D\u0932\u0942\u091F\u0942\u0925", onb_feat_tilt: "\u091D\u0941\u0915\u093E\u0935", onb_feat_airtime: "\u0909\u0921\u093C\u093E\u0928",
        onb_feat_records: "\u0930\u093F\u0915\u0949\u0930\u094D\u0921", onb_feat_trends: "\u0930\u0941\u091D\u093E\u0928", onb_feat_achieve: "\u0909\u092A\u0932\u092C\u094D\u0927\u093F",
        onb_feat_weather: "\u092E\u094C\u0938\u092E", onb_feat_eco: "\u0908\u0915\u094B", onb_feat_zones: "\u091C\u094B\u0928",
        onb_skip: "\u091B\u094B\u0921\u093C\u0947\u0902", onb_next: "\u0905\u0917\u0932\u093E", onb_getstarted: "\u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902"
    }
};

let currentLang = 'en';

function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.land-lang').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.textContent = t[key];
    });
    localStorage.setItem('dunetrack_lang', lang);
}

function skipOnboarding() {
    document.getElementById('landing').classList.remove('active');
    localStorage.setItem('dunetrack_onboarded', '1');
    showAuthScreen();
}

// "Get Started" → goes to Sign UP form (signup shows FIRST, not sign in)
function goToSignup() {
    document.getElementById('landing').classList.remove('active');
    localStorage.setItem('dunetrack_onboarded', '1');
    // Set signup form visible BEFORE showing the screen
    showSignup();
    showAuthScreen();
}

// "Already have an account? Sign In" → goes to Sign IN form
function goToSignin() {
    document.getElementById('landing').classList.remove('active');
    localStorage.setItem('dunetrack_onboarded', '1');
    showLogin();
    showAuthScreen();
}

// Landing page mobile menu
function toggleLandingMenu() {
    const menu = document.getElementById('land-mobile-menu');
    if (menu) menu.classList.toggle('open');
}
function closeLandingMenu() {
    const menu = document.getElementById('land-mobile-menu');
    if (menu) menu.classList.remove('open');
}

function showOnboarding() {
    document.getElementById('landing').classList.add('active');
    const savedLang = localStorage.getItem('dunetrack_lang');
    if (savedLang && TRANSLATIONS[savedLang]) setLang(savedLang);
    tryInitLandingMap();
}

// ---- AUTH STATE ----
let auth = {
    user: null, // { email, name, joinedAt }
};

// Get all registered users from localStorage
function getUsers() {
    try { return JSON.parse(localStorage.getItem('dunetrack_users') || '{}'); }
    catch (e) { return {}; }
}
function saveUsers(users) {
    localStorage.setItem('dunetrack_users', JSON.stringify(users));
}

function checkAuth() {
    const saved = localStorage.getItem('dunetrack_session');
    if (saved) {
        try {
            auth.user = JSON.parse(saved);
            return true;
        } catch (e) { localStorage.removeItem('dunetrack_session'); }
    }
    return false;
}

function showAuthScreen() {
    document.getElementById('auth-screen').classList.add('active');
    // Enter key support
    document.getElementById('auth-email')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') loginUser(); });
    document.getElementById('auth-password')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') loginUser(); });
    document.getElementById('signup-confirm')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') signupUser(); });
}

function hideAuthScreen() {
    document.getElementById('auth-screen').classList.remove('active');
}

function showLogin() {
    document.getElementById('auth-login-form').classList.remove('auth-hidden');
    document.getElementById('auth-signup-form').classList.add('auth-hidden');
    document.getElementById('auth-error').textContent = '';
}

function showSignup() {
    document.getElementById('auth-login-form').classList.add('auth-hidden');
    document.getElementById('auth-signup-form').classList.remove('auth-hidden');
    document.getElementById('signup-error').textContent = '';
}

function loginUser() {
    const email = document.getElementById('auth-email').value.trim().toLowerCase();
    const password = document.getElementById('auth-password').value;
    const errorEl = document.getElementById('auth-error');
    const btn = document.getElementById('auth-login-btn');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorEl.textContent = 'Please enter a valid email address';
        return;
    }
    if (!password || password.length < 4) {
        errorEl.textContent = 'Please enter your password';
        return;
    }
    errorEl.textContent = '';

    const users = getUsers();
    const user = users[email];

    if (!user) {
        errorEl.textContent = 'No account found with this email. Sign up first.';
        return;
    }
    if (user.password !== password) {
        errorEl.textContent = 'Incorrect password. Try again.';
        return;
    }

    // Login success
    btn.disabled = true;
    btn.innerHTML = '<span class="auth-spinner"></span>Signing in...';

    auth.user = { email: user.email, name: user.name, joinedAt: user.joinedAt };
    localStorage.setItem('dunetrack_session', JSON.stringify(auth.user));

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<span id="auth-login-text">Sign In</span>';
        hideAuthScreen();
        enterApp();
    }, 600);
}

function signupUser() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    const errorEl = document.getElementById('signup-error');
    const btn = document.getElementById('auth-signup-btn');

    if (!name || name.length < 2) {
        errorEl.textContent = 'Please enter your name';
        return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorEl.textContent = 'Please enter a valid email address';
        return;
    }
    if (!password || password.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters';
        return;
    }
    if (password !== confirm) {
        errorEl.textContent = 'Passwords do not match';
        return;
    }
    errorEl.textContent = '';

    const users = getUsers();
    if (users[email]) {
        errorEl.textContent = 'An account with this email already exists. Sign in instead.';
        return;
    }

    // Create account
    btn.disabled = true;
    btn.innerHTML = '<span class="auth-spinner"></span>Creating account...';

    users[email] = {
        name: name,
        email: email,
        password: password,
        joinedAt: new Date().toISOString(),
    };
    saveUsers(users);

    // Auto login
    auth.user = { email, name, joinedAt: users[email].joinedAt };
    localStorage.setItem('dunetrack_session', JSON.stringify(auth.user));

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<span id="auth-signup-text">Create Account</span>';
        hideAuthScreen();
        enterApp();
    }, 600);
}

function togglePasswordVisibility() {
    const passInput = document.getElementById('auth-password');
    const eyeBtn = document.getElementById('auth-eye-btn');
    if (passInput.type === 'password') {
        passInput.type = 'text';
        eyeBtn.textContent = '\u{1F441}\u{FE0F}\u200D\u{1F5E8}\u{FE0F}';
    } else {
        passInput.type = 'password';
        eyeBtn.textContent = '\u{1F441}';
    }
}

function logout() {
    localStorage.removeItem('dunetrack_session');
    auth.user = null;
    if (session.active) stopSession();
    document.getElementById('app').classList.remove('visible');
    showAuthScreen();
    // Reset forms
    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';
    document.getElementById('auth-error').textContent = '';
    showLogin();
}

function enterApp() {
    document.getElementById('app').classList.add('visible');
    updateUserProfile();
    populateData();
    fetchWeather();
    initRealSensors();
    detectIOS();
}

function updateUserProfile() {
    if (!auth.user) return;
    const email = auth.user.email;
    const name = auth.user.name || email.split('@')[0];
    const initials = name.slice(0, 2).toUpperCase();

    // Sidebar
    const sideAvatar = document.getElementById('sidebar-avatar');
    const sideUsername = document.getElementById('sidebar-username');
    const sideUsertag = document.getElementById('sidebar-usertag');
    if (sideAvatar) sideAvatar.textContent = initials;
    if (sideUsername) sideUsername.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    if (sideUsertag) sideUsertag.textContent = email;

    // Header avatar
    const headerAvatar = document.querySelector('.header-right .user-avatar');
    if (headerAvatar) headerAvatar.textContent = initials;

    // Hero greeting
    const heroName = document.querySelector('.hero-name');
    if (heroName) heroName.textContent = `Welcome back, ${name.charAt(0).toUpperCase() + name.slice(1)}`;

    // Settings
    const settingsEmail = document.getElementById('settings-email');
    const settingsJoined = document.getElementById('settings-joined');
    if (settingsEmail) settingsEmail.textContent = email;
    if (settingsJoined) {
        const joined = new Date(auth.user.joinedAt);
        settingsJoined.textContent = joined.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
}

// ---- iOS DETECTION & PERMISSION ----
function detectIOS() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const banner = document.getElementById('ios-permission-banner');
    if (isIOS && banner) {
        banner.style.display = 'flex';
    }
}

async function requestIOSPermissions() {
    const banner = document.getElementById('ios-permission-banner');
    try {
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            const motionPerm = await DeviceMotionEvent.requestPermission();
            if (motionPerm === 'granted') {
                window.addEventListener('devicemotion', handleDeviceMotion);
            }
        }
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            const orientPerm = await DeviceOrientationEvent.requestPermission();
            if (orientPerm === 'granted') {
                window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
        }
        if (banner) {
            banner.innerHTML = '<span class="ios-perm-icon">\u2705</span><div class="ios-perm-text"><strong>Sensors Enabled</strong><span>Motion tracking is active on your iPhone</span></div>';
            setTimeout(() => { banner.style.display = 'none'; }, 3000);
        }
    } catch (e) {
        console.warn('iOS sensor permission denied:', e);
        if (banner) {
            banner.innerHTML = '<span class="ios-perm-icon">\u274C</span><div class="ios-perm-text"><strong>Permission Denied</strong><span>Go to Settings > Safari > Motion & Orientation Access</span></div>';
        }
    }
}

// ---- DATA (loaded from localStorage) ----
function getSavedRides() {
    try { return JSON.parse(localStorage.getItem('dunetrack_rides') || '[]'); }
    catch (e) { return []; }
}
function saveRides(rides) {
    localStorage.setItem('dunetrack_rides', JSON.stringify(rides));
}

// ---- SESSION STATE ----
let session = {
    active: false,
    speed: 0,
    maxSpeed: 0,
    distance: 0,
    duration: 0,
    airtime: 0,
    acceleration: 0,
    tilt: 0,
    gps: 0,
    interval: null,
    startTime: null,
    lastGpsPos: null,
    lastGpsTime: null,
    useRealSensors: false,
    watchId: null,
};

// ---- BLUETOOTH STATE ----
let ble = {
    device: null,
    server: null,
    characteristic: null,
    connected: false,
    SERVICE_UUID: '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
    CHAR_UUID: 'beb5483e-36e1-4688-b7f5-ea07361b26a8',
};

// ---- WEATHER STATE ----
let weather = {
    data: null,
    loading: false,
    lastFetch: 0,
};

// ============================================
// SPLASH SCREEN
// ============================================
window.addEventListener('load', () => {
    const splashBar = document.querySelector('.splash-bar');
    let progress = 0;

    const loadInterval = setInterval(() => {
        progress += Math.random() * 20 + 8;
        if (progress > 100) progress = 100;
        splashBar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                document.getElementById('splash').classList.remove('active');

                // Check if user is already logged in
                if (checkAuth()) {
                    // Already logged in - go straight to app
                    enterApp();
                } else {
                    // Not logged in - always show landing page first
                    showOnboarding();
                }
            }, 400);
        }
    }, 200);
});

// ============================================
// REAL-TIME WEATHER (Open-Meteo API - free, no key)
// ============================================
async function fetchWeather() {
    if (weather.loading) return;
    if (Date.now() - weather.lastFetch < 600000) return; // Cache 10 min

    weather.loading = true;

    // Dubai desert coordinates (Al Badayer area)
    const lat = 25.2048;
    const lon = 55.2708;

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,uv_index&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=Asia/Dubai&forecast_days=3`;

        const res = await fetch(url);
        const data = await res.json();

        weather.data = data;
        weather.lastFetch = Date.now();
        weather.loading = false;

        updateWeatherUI(data);
    } catch (err) {
        weather.loading = false;
        console.warn('Weather fetch failed:', err);
        showWeatherFallback();
    }
}

function getWeatherIcon(code) {
    // WMO Weather interpretation codes
    if (code === 0) return { icon: '\u2600\uFE0F', label: 'Clear Sky' };
    if (code === 1) return { icon: '\u{1F324}\uFE0F', label: 'Mainly Clear' };
    if (code === 2) return { icon: '\u26C5', label: 'Partly Cloudy' };
    if (code === 3) return { icon: '\u2601\uFE0F', label: 'Overcast' };
    if (code >= 45 && code <= 48) return { icon: '\u{1F32B}\uFE0F', label: 'Foggy' };
    if (code >= 51 && code <= 55) return { icon: '\u{1F326}\uFE0F', label: 'Drizzle' };
    if (code >= 61 && code <= 65) return { icon: '\u{1F327}\uFE0F', label: 'Rain' };
    if (code >= 80 && code <= 82) return { icon: '\u26C8\uFE0F', label: 'Rain Showers' };
    if (code >= 95) return { icon: '\u26A1', label: 'Thunderstorm' };
    return { icon: '\u2600\uFE0F', label: 'Clear' };
}

function getWindDirection(deg) {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(deg / 45) % 8];
}

function updateWeatherUI(data) {
    const current = data.current;
    const daily = data.daily;
    const w = getWeatherIcon(current.weather_code);

    // Dashboard weather widget
    const dashWeather = document.getElementById('weather-widget');
    if (dashWeather) {
        dashWeather.innerHTML = `
            <div class="weather-current">
                <div class="weather-main">
                    <span class="weather-icon-big">${w.icon}</span>
                    <div class="weather-temp-wrap">
                        <span class="weather-temp">${Math.round(current.temperature_2m)}\u00B0</span>
                        <span class="weather-condition">${w.label}</span>
                    </div>
                </div>
                <div class="weather-details">
                    <div class="weather-detail">
                        <span class="wd-icon">\u{1F4A8}</span>
                        <span class="wd-value">${current.wind_speed_10m} km/h ${getWindDirection(current.wind_direction_10m)}</span>
                        <span class="wd-label">Wind</span>
                    </div>
                    <div class="weather-detail">
                        <span class="wd-icon">\u{1F4A7}</span>
                        <span class="wd-value">${current.relative_humidity_2m}%</span>
                        <span class="wd-label">Humidity</span>
                    </div>
                    <div class="weather-detail">
                        <span class="wd-icon">\u2600\uFE0F</span>
                        <span class="wd-value">${current.uv_index}</span>
                        <span class="wd-label">UV Index</span>
                    </div>
                    <div class="weather-detail">
                        <span class="wd-icon">\u{1F321}\uFE0F</span>
                        <span class="wd-value">${Math.round(daily.temperature_2m_max[0])}\u00B0/${Math.round(daily.temperature_2m_min[0])}\u00B0</span>
                        <span class="wd-label">Hi/Lo</span>
                    </div>
                </div>
            </div>
            <div class="weather-forecast">
                ${daily.time.slice(0, 3).map((date, i) => {
                    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : new Date(date).toLocaleDateString('en', { weekday: 'short' });
                    return `<div class="forecast-day">
                        <span class="fc-day">${dayName}</span>
                        <span class="fc-temp">${Math.round(daily.temperature_2m_max[i])}\u00B0 / ${Math.round(daily.temperature_2m_min[i])}\u00B0</span>
                        <span class="fc-uv">UV ${daily.uv_index_max[i]}</span>
                    </div>`;
                }).join('')}
            </div>
        `;
        dashWeather.classList.add('loaded');
    }

    // Live screen weather bar
    const liveWeather = document.getElementById('live-weather');
    if (liveWeather) {
        const uvLevel = current.uv_index >= 8 ? 'Extreme' : current.uv_index >= 6 ? 'Very High' : current.uv_index >= 3 ? 'Moderate' : 'Low';
        const safetyClass = current.temperature_2m > 45 ? 'danger' : current.temperature_2m > 38 ? 'warn' : 'safe';

        liveWeather.innerHTML = `
            <span class="lw-icon">${w.icon}</span>
            <span class="lw-temp">${Math.round(current.temperature_2m)}\u00B0C</span>
            <span class="lw-divider">|</span>
            <span class="lw-wind">\u{1F4A8} ${current.wind_speed_10m} km/h</span>
            <span class="lw-divider">|</span>
            <span class="lw-uv">UV ${current.uv_index} (${uvLevel})</span>
            <span class="lw-safety ${safetyClass}">${current.temperature_2m > 45 ? '\u26D4 Too Hot' : current.temperature_2m > 38 ? '\u26A0\uFE0F Hot' : '\u2705 Good'}</span>
        `;
    }
}

function showWeatherFallback() {
    const dashWeather = document.getElementById('weather-widget');
    if (dashWeather) {
        dashWeather.innerHTML = `
            <div class="weather-current">
                <div class="weather-main">
                    <span class="weather-icon-big">\u2600\uFE0F</span>
                    <div class="weather-temp-wrap">
                        <span class="weather-temp">--\u00B0</span>
                        <span class="weather-condition">Weather unavailable</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// ============================================
// WEB BLUETOOTH API - Real BLE Connection
// ============================================
async function scanBluetooth() {
    const statusEl = document.getElementById('ble-connection-status');
    const scanBtn = document.getElementById('scan-btn');

    // Check if Web Bluetooth is supported
    if (!navigator.bluetooth) {
        if (statusEl) statusEl.textContent = 'Web Bluetooth not supported in this browser. Use Chrome on Android/Windows/Mac.';
        scanBtn.textContent = '\u274C Not Supported';
        setTimeout(() => { scanBtn.textContent = '\u{1F50D} Scan for Devices'; }, 3000);
        return;
    }

    scanBtn.textContent = '\u{1F50D} Scanning...';
    scanBtn.disabled = true;

    try {
        // Request BLE device - shows browser's native Bluetooth picker
        ble.device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: [ble.SERVICE_UUID, 'battery_service', 'device_information'],
        });

        updateBleStatus('connecting', `Connecting to ${ble.device.name || 'device'}...`);
        scanBtn.textContent = `\u{1F517} Connecting...`;

        // Connect to GATT server
        ble.server = await ble.device.gatt.connect();

        // Try to get the sandboard service
        try {
            const service = await ble.server.getPrimaryService(ble.SERVICE_UUID);
            ble.characteristic = await service.getCharacteristic(ble.CHAR_UUID);

            // Start listening for notifications (sensor data from sandboard)
            await ble.characteristic.startNotifications();
            ble.characteristic.addEventListener('characteristicvaluechanged', handleBleData);
            session.useRealSensors = true;
        } catch (serviceErr) {
            // Device connected but doesn't have our specific service - still show as connected
            console.log('Custom service not found, device connected in basic mode');
        }

        ble.connected = true;
        const name = ble.device.name || 'Unknown Device';
        updateBleStatus('connected', name);
        scanBtn.textContent = `\u2705 ${name} Connected!`;

        // Update settings UI
        const deviceLabel = document.querySelector('.setting-value');
        if (deviceLabel) deviceLabel.textContent = name;

        // Listen for disconnect
        ble.device.addEventListener('gattserverdisconnected', () => {
            ble.connected = false;
            session.useRealSensors = false;
            updateBleStatus('disconnected', 'Disconnected');
            scanBtn.textContent = '\u{1F50D} Scan for Devices';
            scanBtn.disabled = false;
        });

    } catch (err) {
        if (err.name === 'NotFoundError') {
            scanBtn.textContent = '\u274C No device selected';
        } else {
            scanBtn.textContent = '\u274C Connection failed';
            console.error('BLE Error:', err);
        }
        updateBleStatus('disconnected', 'Not connected');
    }

    setTimeout(() => {
        scanBtn.textContent = ble.connected ? `\u2705 ${ble.device?.name || 'Connected'}` : '\u{1F50D} Scan for Devices';
        scanBtn.disabled = false;
    }, 3000);
}

function handleBleData(event) {
    // Parse incoming data from BLE sandboard sensor
    // Expected format: speed(float), accel(float), tilt(float) as DataView
    const value = event.target.value;

    if (value.byteLength >= 12) {
        const speed = value.getFloat32(0, true);
        const accel = value.getFloat32(4, true);
        const tilt = value.getFloat32(8, true);

        if (session.active) {
            session.speed = speed;
            session.acceleration = accel;
            session.tilt = tilt;
            if (speed > session.maxSpeed) session.maxSpeed = speed;
        }
    } else if (value.byteLength >= 4) {
        // Simple format: just speed
        const speed = value.getFloat32(0, true);
        if (session.active) {
            session.speed = speed;
            if (speed > session.maxSpeed) session.maxSpeed = speed;
        }
    }
}

function updateBleStatus(state, label) {
    const bleStatus = document.getElementById('ble-status');
    const bleDot = bleStatus?.querySelector('.ble-dot');
    const bleText = bleStatus?.querySelector('.ble-text');

    if (state === 'connected') {
        bleDot?.classList.add('connected');
        bleDot?.classList.remove('connecting');
        if (bleText) bleText.textContent = label;
        bleStatus?.classList.add('connected');
    } else if (state === 'connecting') {
        bleDot?.classList.add('connecting');
        bleDot?.classList.remove('connected');
        if (bleText) bleText.textContent = label;
    } else {
        bleDot?.classList.remove('connected', 'connecting');
        if (bleText) bleText.textContent = 'No device';
        bleStatus?.classList.remove('connected');
    }

    // Update connection status text in settings
    const statusText = document.getElementById('ble-connection-status');
    if (statusText) {
        statusText.textContent = state === 'connected' ? `\u2705 ${label}` : state === 'connecting' ? `\u{1F504} ${label}` : '\u274C Not connected';
        statusText.className = `ble-conn-status ${state}`;
    }
}

// ============================================
// REAL DEVICE SENSORS
// ============================================
function initRealSensors() {
    // Accelerometer via DeviceMotion API
    if (window.DeviceMotionEvent) {
        // iOS 13+ requires permission
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            // Will request on session start
        } else {
            window.addEventListener('devicemotion', handleDeviceMotion);
        }
    }

    // Gyroscope/Tilt via DeviceOrientation API
    if (window.DeviceOrientationEvent) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            // Will request on session start
        } else {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
    }
}

async function requestSensorPermissions() {
    // iOS 13+ requires explicit permission
    try {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            const motionPerm = await DeviceMotionEvent.requestPermission();
            if (motionPerm === 'granted') {
                window.addEventListener('devicemotion', handleDeviceMotion);
            }
        }
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            const orientPerm = await DeviceOrientationEvent.requestPermission();
            if (orientPerm === 'granted') {
                window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
        }
    } catch (e) {
        console.warn('Sensor permission denied:', e);
    }
}

function handleDeviceMotion(event) {
    if (!session.active) return;

    const acc = event.accelerationIncludingGravity;
    if (acc) {
        // Calculate total acceleration magnitude (subtract gravity ~9.8)
        const totalAcc = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2);
        session.acceleration = Math.abs(totalAcc - 9.8);

        // Detect airtime (freefall = very low acceleration)
        if (totalAcc < 2) {
            session.airtime += 0.02; // ~20ms per event
        }
    }
}

function handleDeviceOrientation(event) {
    if (!session.active) return;

    // Beta = front-back tilt (-180 to 180)
    // Gamma = left-right tilt (-90 to 90)
    if (event.beta !== null) {
        session.tilt = Math.abs(event.beta);
    }
}

// ============================================
// GPS TRACKING (Geolocation API)
// ============================================
function startGpsTracking() {
    if (!navigator.geolocation) {
        session.gps = 0;
        return;
    }

    session.watchId = navigator.geolocation.watchPosition(
        (pos) => {
            const { latitude, longitude, speed, accuracy } = pos.coords;

            // Estimate satellite count from accuracy (rough approximation)
            session.gps = accuracy < 10 ? 12 : accuracy < 30 ? 8 : accuracy < 100 ? 5 : 3;

            // Use GPS speed if available (m/s -> km/h)
            if (speed !== null && speed > 0) {
                session.speed = speed * 3.6;
                if (session.speed > session.maxSpeed) session.maxSpeed = session.speed;
            }

            // Calculate distance from previous position
            if (session.lastGpsPos) {
                const dist = haversineDistance(
                    session.lastGpsPos.lat, session.lastGpsPos.lon,
                    latitude, longitude
                );
                if (dist > 0.001 && dist < 0.5) { // Filter noise, cap at 500m per update
                    session.distance += dist;
                }
            }

            session.lastGpsPos = { lat: latitude, lon: longitude };
            session.lastGpsTime = Date.now();
        },
        (err) => {
            console.warn('GPS error:', err.message);
            session.gps = 0;
        },
        {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 5000,
        }
    );
}

function stopGpsTracking() {
    if (session.watchId !== null) {
        navigator.geolocation.clearWatch(session.watchId);
        session.watchId = null;
    }
}

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ============================================
// TAB NAVIGATION
// ============================================
function switchTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
    if (navItem) navItem.classList.add('active');

    document.querySelectorAll('.mobile-nav-item').forEach(t => t.classList.remove('active'));
    const mobileItem = document.querySelector(`.mobile-nav-item[data-tab="${tabName}"]`);
    if (mobileItem) mobileItem.classList.add('active');

    document.querySelectorAll('.tab-screen').forEach(s => {
        s.classList.remove('active');
        s.style.opacity = '0';
    });

    const screen = document.getElementById(`screen-${tabName}`);
    screen.classList.add('active');
    document.getElementById('screen-container').scrollTop = 0;
    requestAnimationFrame(() => { screen.style.opacity = '1'; });
    closeMobileMenu();

    // Initialize app map when Eco Tracker tab is opened
    if (tabName === 'map') {
        setTimeout(() => {
            initAppMap();
            if (appMap) appMap.invalidateSize();
        }, 200);
    }
}

// ============================================
// MOBILE MENU
// ============================================
function toggleMobileMenu() {
    document.querySelector('.sidebar')?.classList.toggle('open');
    document.querySelector('.sidebar-overlay')?.classList.toggle('active');
}

function closeMobileMenu() {
    document.querySelector('.sidebar')?.classList.remove('open');
    document.querySelector('.sidebar-overlay')?.classList.remove('active');
}

// ============================================
// POPULATE DATA
// ============================================
function populateData() {
    const rides = getSavedRides();
    populateActivity(rides);
    populateHistory(rides);
    updateWeeklyStats(rides);
    updateAllStats(rides);
    updateAchievements(rides);
    initToggles();
    initScanButton();
    animateHeroStats(rides);
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const el = document.getElementById('header-clock');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function populateActivity(rides) {
    const list = document.getElementById('activity-list');
    if (!list) return;
    list.innerHTML = '';

    if (!rides || rides.length === 0) {
        list.innerHTML = '<div class="empty-state"><span class="empty-icon">\u{1F3DC}\uFE0F</span><p class="empty-text">No rides yet</p><p class="empty-sub">Start your first session to see activity here</p></div>';
        return;
    }

    // Show last 5 rides as recent activity
    const recent = rides.slice(0, 5);
    recent.forEach((ride, i) => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.style.animationDelay = `${i * 0.1}s`;
        const distNum = parseFloat(ride.distance) || 0;
        const maxSpd = parseInt(ride.maxSpeed) || 0;
        card.innerHTML = `
            <div class="act-icon">\u{1F3C4}</div>
            <div class="act-info">
                <span class="act-name">${ride.location || 'Ride Session'}</span>
                <span class="act-date">${ride.date}</span>
            </div>
            <div class="act-stats">
                <div class="act-stat">
                    <span class="act-stat-val">${maxSpd}</span>
                    <span class="act-stat-lbl">km/h</span>
                </div>
                <div class="act-stat">
                    <span class="act-stat-val">${distNum.toFixed(1)}</span>
                    <span class="act-stat-lbl">km</span>
                </div>
                <div class="act-stat">
                    <span class="act-stat-val">${ride.duration}</span>
                    <span class="act-stat-lbl">time</span>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

function populateHistory(rides) {
    const list = document.getElementById('ride-list');
    if (!list) return;
    list.innerHTML = '';

    if (!rides || rides.length === 0) {
        list.innerHTML = '<div class="empty-state"><span class="empty-icon">\u{1F4CA}</span><p class="empty-text">No ride history</p><p class="empty-sub">Complete a session to build your ride log</p></div>';
        return;
    }

    // Update history header stats
    const badge = document.getElementById('total-rides-badge');
    if (badge) badge.textContent = `${rides.length} ride${rides.length !== 1 ? 's' : ''}`;

    let totalKm = 0, totalSec = 0, totalSpeed = 0;
    rides.forEach(r => {
        totalKm += parseFloat(r.distance) || 0;
        totalSec += parseDurationToSec(r.duration);
        totalSpeed += parseFloat(r.avgSpeed) || 0;
    });

    const htk = document.getElementById('history-total-km');
    const htt = document.getElementById('history-total-time');
    const has = document.getElementById('history-avg-speed');
    if (htk) htk.textContent = totalKm.toFixed(1);
    if (htt) htt.textContent = formatDuration(totalSec);
    if (has) has.textContent = rides.length > 0 ? (totalSpeed / rides.length).toFixed(1) : '0';

    rides.forEach((ride, i) => {
        const card = document.createElement('div');
        card.className = 'ride-card';
        card.style.animationDelay = `${i * 0.08}s`;
        const dist = parseFloat(ride.distance) || 0;
        card.innerHTML = `
            <div class="ride-header">
                <div class="ride-date-wrap">
                    <span class="ride-date">${ride.date}</span>
                    <span class="ride-location">${ride.location || 'GPS Session'}</span>
                </div>
            </div>
            <div class="ride-stats">
                <div class="ride-stat">
                    <span class="rs-value">${ride.duration}</span>
                    <span class="rs-label">Duration</span>
                </div>
                <div class="ride-stat">
                    <span class="rs-value">${dist.toFixed(1)} km</span>
                    <span class="rs-label">Distance</span>
                </div>
                <div class="ride-stat">
                    <span class="rs-value">${ride.avgSpeed} km/h</span>
                    <span class="rs-label">Avg Speed</span>
                </div>
                <div class="ride-stat">
                    <span class="rs-value">${ride.maxSpeed} km/h</span>
                    <span class="rs-label">Max Speed</span>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

function animateHeroStats(rides) {
    let topSpeed = 0, bestJump = 0;
    if (rides && rides.length > 0) {
        rides.forEach(r => {
            const ms = parseInt(r.maxSpeed) || 0;
            if (ms > topSpeed) topSpeed = ms;
            const air = parseFloat(r.airtime) || 0;
            const jumpCm = Math.round(air * 100); // rough airtime-to-jump estimate
            if (jumpCm > bestJump) bestJump = jumpCm;
        });
    }
    animateNumber('home-top-speed', 0, topSpeed, 1500);
    animateNumber('home-best-jump', 0, bestJump, 1500);
}

function animateNumber(id, start, end, duration) {
    const el = document.getElementById(id);
    if (!el) return;
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(start + (end - start) * eased);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ============================================
// DYNAMIC STATS HELPERS
// ============================================
function parseDurationToSec(dur) {
    if (!dur) return 0;
    const m = dur.match(/(\d+)\s*min/);
    return m ? parseInt(m[1]) * 60 : 0;
}

function formatDuration(totalSec) {
    if (totalSec < 60) return '0m';
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
}

function updateWeeklyStats(rides) {
    // Filter rides from the last 7 days
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekRides = rides.filter(r => {
        try { return new Date(r.date) >= weekAgo; } catch (e) { return false; }
    });

    const wRides = document.getElementById('weekly-rides');
    const wDist = document.getElementById('weekly-distance');
    const wTime = document.getElementById('weekly-time');
    const wAvg = document.getElementById('weekly-avg');
    const wChange = document.getElementById('weekly-change');

    let totalKm = 0, totalSec = 0, totalSpeed = 0;
    weekRides.forEach(r => {
        totalKm += parseFloat(r.distance) || 0;
        totalSec += parseDurationToSec(r.duration);
        totalSpeed += parseFloat(r.avgSpeed) || 0;
    });

    if (wRides) wRides.textContent = weekRides.length;
    if (wDist) wDist.textContent = totalKm.toFixed(1);
    if (wTime) wTime.textContent = formatDuration(totalSec);
    if (wAvg) wAvg.textContent = weekRides.length > 0 ? (totalSpeed / weekRides.length).toFixed(1) : '0';
    if (wChange) wChange.textContent = weekRides.length > 0 ? `${weekRides.length} ride${weekRides.length !== 1 ? 's' : ''}` : '--';
}

function updateAllStats(rides) {
    let totalKm = 0, totalSec = 0, totalSpeed = 0, topSpeed = 0, bestJump = 0, longestDist = 0;

    rides.forEach(r => {
        const dist = parseFloat(r.distance) || 0;
        const ms = parseInt(r.maxSpeed) || 0;
        const air = parseFloat(r.airtime) || 0;
        totalKm += dist;
        totalSec += parseDurationToSec(r.duration);
        totalSpeed += parseFloat(r.avgSpeed) || 0;
        if (ms > topSpeed) topSpeed = ms;
        if (dist > longestDist) longestDist = dist;
        const jumpCm = Math.round(air * 100);
        if (jumpCm > bestJump) bestJump = jumpCm;
    });

    const avgSpeed = rides.length > 0 ? (totalSpeed / rides.length).toFixed(1) : '0';

    // Stats screen - Personal Records
    const rs = document.getElementById('record-speed');
    const rj = document.getElementById('record-jump');
    const rd = document.getElementById('record-distance');
    if (rs) rs.textContent = topSpeed;
    if (rj) rj.textContent = bestJump;
    if (rd) rd.textContent = longestDist.toFixed(1);

    // Stats screen - All-Time grid
    const str = document.getElementById('stats-total-rides');
    const std = document.getElementById('stats-total-distance');
    const stt = document.getElementById('stats-total-time');
    const sta = document.getElementById('stats-avg-speed');
    if (str) str.textContent = rides.length;
    if (std) std.textContent = `${totalKm.toFixed(1)} km`;
    if (stt) stt.textContent = formatDuration(totalSec);
    if (sta) sta.textContent = avgSpeed;

    // Stats screen - Trends (based on actual data)
    const tw = document.getElementById('trend-week');
    const tm = document.getElementById('trend-month');
    const twb = document.getElementById('trend-week-bar');
    const tmb = document.getElementById('trend-month-bar');
    if (tw) tw.textContent = rides.length > 0 ? `${rides.length} rides` : '0%';
    if (tm) tm.textContent = rides.length > 0 ? `${totalKm.toFixed(1)} km` : '0%';
    if (twb) twb.style.width = `${Math.min(100, rides.length * 10)}%`;
    if (tmb) tmb.style.width = `${Math.min(100, totalKm * 5)}%`;
}

function updateAchievements(rides) {
    let totalKm = 0, topSpeed = 0, maxAirtime = 0;
    rides.forEach(r => {
        totalKm += parseFloat(r.distance) || 0;
        const ms = parseInt(r.maxSpeed) || 0;
        if (ms > topSpeed) topSpeed = ms;
        const air = parseFloat(r.airtime) || 0;
        if (air > maxAirtime) maxAirtime = air;
    });

    // Speed Demon: 50+ km/h
    const ach1 = document.getElementById('ach-speed-demon');
    if (ach1) ach1.className = topSpeed >= 50 ? 'achievement unlocked' : 'achievement locked';

    // 10 Rides
    const ach2 = document.getElementById('ach-10-rides');
    if (ach2) ach2.className = rides.length >= 10 ? 'achievement unlocked' : 'achievement locked';

    // Eco Warrior (always locked for now — need real eco scoring)
    // ach-eco-warrior stays locked

    // Dune Master: 100+ km
    const ach4 = document.getElementById('ach-dune-master');
    if (ach4) ach4.className = totalKm >= 100 ? 'achievement unlocked' : 'achievement locked';

    // Sky Rider: 2+ sec airtime
    const ach5 = document.getElementById('ach-sky-rider');
    if (ach5) ach5.className = maxAirtime >= 2 ? 'achievement unlocked' : 'achievement locked';

    // Marathon: 500+ km
    const ach6 = document.getElementById('ach-marathon');
    if (ach6) ach6.className = totalKm >= 500 ? 'achievement unlocked' : 'achievement locked';
}

// ============================================
// LIVE SESSION (Real Sensors + Simulation Fallback)
// ============================================
function toggleSession() {
    if (session.active) {
        stopSession();
    } else {
        showSafetyBriefing();
    }
}

// ---- PRE-RIDE SAFETY BRIEFING ----
function showSafetyBriefing() {
    const overlay = document.getElementById('safety-overlay');
    if (!overlay) { startSession(); return; }

    // Reset checkboxes
    const checkboxes = overlay.querySelectorAll('.safety-checkbox');
    checkboxes.forEach(cb => cb.checked = false);
    updateSafetyProgress();

    // Show weather condition in the safety modal
    updateSafetyWeather();

    overlay.style.display = 'flex';
}

function updateSafetyWeather() {
    const msgEl = document.getElementById('safety-weather-msg');
    const warnEl = document.getElementById('safety-weather-warn');
    if (!msgEl || !warnEl) return;

    if (weather.data && weather.data.current) {
        const temp = Math.round(weather.data.current.temperature_2m);
        const uv = weather.data.current.uv_index;
        const wind = Math.round(weather.data.current.wind_speed_10m);
        const humidity = weather.data.current.relative_humidity_2m;

        if (temp > 45) {
            msgEl.innerHTML = `<strong>EXTREME HEAT WARNING:</strong> Current temperature is ${temp}°C. This is dangerously hot. Consider postponing your ride to early morning or evening.`;
            warnEl.classList.remove('safe');
        } else if (temp > 38) {
            msgEl.innerHTML = `<strong>Heat advisory:</strong> ${temp}°C with UV index ${uv}. Drink water frequently, take breaks in shade, and watch for signs of heat exhaustion.`;
            warnEl.classList.remove('safe');
        } else {
            msgEl.innerHTML = `<strong>Conditions look good:</strong> ${temp}°C, wind ${wind} km/h, humidity ${humidity}%. Stay hydrated and have a great ride!`;
            warnEl.classList.add('safe');
        }
    } else {
        msgEl.textContent = 'Weather data unavailable. Check conditions manually before riding. Stay hydrated regardless of temperature.';
        warnEl.classList.remove('safe');
    }
}

function updateSafetyProgress() {
    const checkboxes = document.querySelectorAll('.safety-checkbox');
    const checked = document.querySelectorAll('.safety-checkbox:checked').length;
    const total = checkboxes.length;

    const fill = document.getElementById('safety-progress-fill');
    const text = document.getElementById('safety-progress-text');
    const btn = document.getElementById('safety-start-btn');

    if (fill) {
        fill.style.width = (checked / total * 100) + '%';
        if (checked === total) fill.classList.add('complete');
        else fill.classList.remove('complete');
    }
    if (text) {
        text.textContent = checked === total
            ? 'All safety checks complete — you are ready to ride!'
            : `Check all ${total} items to continue (${checked}/${total})`;
    }
    if (btn) {
        btn.disabled = checked < total;
    }
}

function closeSafetyBriefing(startRide) {
    const overlay = document.getElementById('safety-overlay');
    if (overlay) overlay.style.display = 'none';
    if (startRide) startSession();
}

async function startSession() {
    session.active = true;
    session.speed = 0;
    session.maxSpeed = 0;
    session.distance = 0;
    session.duration = 0;
    session.airtime = 0;
    session.lastGpsPos = null;
    session.startTime = Date.now();

    // Request sensor permissions on iOS
    await requestSensorPermissions();

    // Start GPS tracking
    startGpsTracking();

    // Update UI
    const btn = document.getElementById('start-btn');
    btn.classList.add('active');
    document.getElementById('start-btn-icon').textContent = '\u23F9';
    document.getElementById('start-btn-text').textContent = 'STOP SESSION';
    document.getElementById('live-status-text').textContent = ble.connected ? 'TRACKING (BLE)' : 'TRACKING';
    document.getElementById('live-dot').classList.add('active');
    document.getElementById('sensor-indicator').classList.add('active');
    document.getElementById('live-hero').classList.add('tracking');

    // Show data source indicator
    const srcEl = document.getElementById('data-source');
    if (srcEl) {
        srcEl.textContent = ble.connected ? 'BLE Sensor' : 'GPS + Sensors';
        srcEl.className = `data-source ${ble.connected ? 'ble' : 'gps'}`;
    }

    // Start update loop (simulation fills gaps when real sensors aren't available)
    session.interval = setInterval(updateSession, 100);
}

function stopSession() {
    session.active = false;
    clearInterval(session.interval);
    stopGpsTracking();

    const btn = document.getElementById('start-btn');
    btn.classList.remove('active');
    document.getElementById('start-btn-icon').textContent = '\u25B6';
    document.getElementById('start-btn-text').textContent = 'START SESSION';
    document.getElementById('live-status-text').textContent = 'STOPPED';
    document.getElementById('live-dot').classList.remove('active');
    document.getElementById('sensor-indicator').classList.remove('active');
    document.getElementById('live-hero').classList.remove('tracking');

    // Save session to history if meaningful
    if (session.duration > 10 && session.distance > 0.01) {
        saveSession();
    }
}

function saveSession() {
    const rides = getSavedRides();
    const newRide = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        location: 'GPS Session',
        duration: `${Math.floor(session.duration / 60)} min`,
        distance: session.distance.toFixed(1),
        avgSpeed: (session.distance / (session.duration / 3600)).toFixed(1),
        maxSpeed: Math.round(session.maxSpeed).toString(),
        airtime: session.airtime.toFixed(1),
    };
    rides.unshift(newRide);
    saveRides(rides);

    // Refresh all data displays
    populateActivity(rides);
    populateHistory(rides);
    updateWeeklyStats(rides);
    updateAllStats(rides);
    updateAchievements(rides);
    animateHeroStats(rides);
}

function updateSession() {
    const time = (Date.now() - session.startTime) / 1000;
    session.duration = time;

    // Only use real data from GPS, BLE, or device sensors
    // If GPS hasn't updated recently, speed decays to 0 (you stopped moving)
    if (!ble.connected && session.lastGpsPos && Date.now() - session.lastGpsTime > 3000) {
        session.speed = 0;
    }

    updateLiveDisplay();
}

function updateLiveDisplay() {
    document.getElementById('speed-value').textContent = Math.round(session.speed);

    const gaugePercent = session.speed / 55;
    const maxDash = 251;
    document.getElementById('gauge-fill').setAttribute('stroke-dashoffset', maxDash - (maxDash * gaugePercent));

    document.getElementById('max-speed').textContent = Math.round(session.maxSpeed);
    document.getElementById('distance').textContent = session.distance.toFixed(2);

    const mins = Math.floor(session.duration / 60);
    const secs = Math.floor(session.duration % 60);
    document.getElementById('duration').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    document.getElementById('airtime').textContent = session.airtime.toFixed(1);

    document.getElementById('accel-value').textContent = `${Math.abs(session.acceleration).toFixed(1)} m/s\u00B2`;
    document.getElementById('accel-bar').style.width = `${Math.min(100, Math.abs(session.acceleration) / 8 * 100)}%`;

    document.getElementById('tilt-value').textContent = `${Math.abs(session.tilt).toFixed(1)}\u00B0`;
    document.getElementById('tilt-bar').style.width = `${Math.min(100, Math.abs(session.tilt) / 30 * 100)}%`;

    document.getElementById('gps-value').textContent = `${session.gps} satellites`;
    document.getElementById('gps-bar').style.width = `${(session.gps / 12) * 100}%`;
}

// ============================================
// SETTINGS
// ============================================
function initToggles() {
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        toggle.addEventListener('click', () => toggle.classList.toggle('active'));
    });
}

function initScanButton() {
    const scanBtn = document.getElementById('scan-btn');
    if (!scanBtn) return;
    scanBtn.addEventListener('click', scanBluetooth);
}

// ============================================
// LEAFLET MAPS
// ============================================
let landingMap = null;
let appMap = null;
let appMapMarker = null;
let appMapWatchId = null;

// UAE sandboarding locations
const UAE_LOCATIONS = [
    { name: 'Al Badayer (Big Red)', lat: 25.1478, lon: 55.8118, level: 'Beginner to Advanced', area: 'Sharjah' },
    { name: 'Liwa Oasis Dunes', lat: 23.1317, lon: 53.7785, level: 'Expert', area: 'Abu Dhabi' },
    { name: 'Fossil Rock', lat: 25.1120, lon: 55.8542, level: 'Intermediate', area: 'Sharjah' },
    { name: 'Mleiha Desert', lat: 25.1333, lon: 55.8833, level: 'All Levels', area: 'Sharjah' },
    { name: 'Lahbab Desert', lat: 24.9200, lon: 55.4150, level: 'Beginner Friendly', area: 'Dubai' },
    { name: 'Al Ain Desert', lat: 24.2075, lon: 55.7447, level: 'Intermediate', area: 'Abu Dhabi' },
];

function initLandingMap() {
    const container = document.getElementById('landing-map');
    if (!container || landingMap) return;
    if (typeof L === 'undefined') return;

    // Center on UAE
    landingMap = L.map('landing-map', {
        center: [24.5, 55.0],
        zoom: 7,
        scrollWheelZoom: false,
        attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
    }).addTo(landingMap);

    // Gold marker icon
    const goldIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div style="width:16px;height:16px;background:linear-gradient(135deg,#FFD700,#FF6B35);border-radius:50%;border:2px solid #fff;box-shadow:0 2px 8px rgba(255,215,0,0.5);"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -10],
    });

    // Add location markers
    UAE_LOCATIONS.forEach(loc => {
        L.marker([loc.lat, loc.lon], { icon: goldIcon })
            .addTo(landingMap)
            .bindPopup(`<strong>${loc.name}</strong><br>${loc.area} &middot; ${loc.level}`);
    });

    // Try to show user's position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const userIcon = L.divIcon({
                    className: 'custom-map-marker',
                    html: '<div style="width:14px;height:14px;background:#00BFFF;border-radius:50%;border:3px solid #fff;box-shadow:0 0 12px rgba(0,191,255,0.6);"></div>',
                    iconSize: [14, 14],
                    iconAnchor: [7, 7],
                    popupAnchor: [0, -10],
                });
                L.marker([pos.coords.latitude, pos.coords.longitude], { icon: userIcon })
                    .addTo(landingMap)
                    .bindPopup('<strong>You are here</strong>');
            },
            () => {} // Fail silently
        );
    }
}

function initAppMap() {
    const container = document.getElementById('app-map');
    if (!container || appMap) return;
    if (typeof L === 'undefined') return;

    // Default to Dubai center
    appMap = L.map('app-map', {
        center: [25.2048, 55.2708],
        zoom: 12,
        scrollWheelZoom: true,
        attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
    }).addTo(appMap);

    const hintEl = document.getElementById('map-hint');

    // Watch user position
    if (navigator.geolocation) {
        appMapWatchId = navigator.geolocation.watchPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const acc = pos.coords.accuracy;

                if (appMapMarker) {
                    appMapMarker.setLatLng([lat, lon]);
                } else {
                    const userIcon = L.divIcon({
                        className: 'custom-map-marker',
                        html: '<div style="width:16px;height:16px;background:#00BFFF;border-radius:50%;border:3px solid #fff;box-shadow:0 0 14px rgba(0,191,255,0.7);animation:blePulse 2s infinite;"></div>',
                        iconSize: [16, 16],
                        iconAnchor: [8, 8],
                    });
                    appMapMarker = L.marker([lat, lon], { icon: userIcon }).addTo(appMap);
                    appMap.setView([lat, lon], 14);
                }

                if (hintEl) {
                    hintEl.textContent = `GPS active — accuracy: ${Math.round(acc)}m`;
                    hintEl.style.color = 'rgba(0,191,255,0.6)';
                }
            },
            (err) => {
                if (hintEl) hintEl.textContent = 'Location unavailable — enable GPS to see your position';
            },
            { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
        );
    }
}

// Initialize landing map when landing page is shown
function tryInitLandingMap() {
    if (document.getElementById('landing')?.classList.contains('active')) {
        setTimeout(initLandingMap, 500);
    }
}
