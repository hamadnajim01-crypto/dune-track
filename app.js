// ============================================
// DUNETRACK PRO - Full App Engine
// Real Weather | Web Bluetooth | Device Sensors | Auth | PWA
// ============================================

// ---- PWA SERVICE WORKER ----
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
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
                    // Not logged in - show auth screen
                    showAuthScreen();
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
        startSession();
    }
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
