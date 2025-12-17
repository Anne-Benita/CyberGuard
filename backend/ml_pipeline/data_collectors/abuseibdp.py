import os
import requests

ABUSEIPDB_KEY = os.getenv("ABUSEIPDB_API_KEY")
BASE_URL = "https://api.abuseipdb.com/api/v2/check"

HEADERS = {
    "Accept": "application/json",
    "Key": ABUSEIPDB_KEY
}

def scan_ip(ip_address: str) -> dict:
    if not ABUSEIPDB_KEY:
        raise RuntimeError("AbuseIPDB API key not configured")

    params = {"ipAddress": ip_address, "maxAgeInDays": 90}
    response = requests.get(BASE_URL, headers=HEADERS, params=params, timeout=15)
    response.raise_for_status()

    data = response.json()["data"]

    return {
        "source": "AbuseIPDB",
        "ip": ip_address,
        "abuse_confidence": data.get("abuseConfidenceScore"),
        "country": data.get("countryCode"),
        "isp": data.get("isp"),
        "total_reports": data.get("totalReports"),
        "raw": data
    }
