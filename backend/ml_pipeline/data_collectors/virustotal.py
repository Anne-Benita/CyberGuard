import os
import requests

VT_API_KEY = os.getenv("VT_API_KEY")
VT_BASE_URL = "https://www.virustotal.com/api/v3"

HEADERS = {
    "x-apikey": VT_API_KEY
}

def scan_ip(ip_address: str) -> dict:
    if not VT_API_KEY:
        raise RuntimeError("VirusTotal API key not configured")

    url = f"{VT_BASE_URL}/ip_addresses/{ip_address}"
    response = requests.get(url, headers=HEADERS, timeout=15)
    response.raise_for_status()

    data = response.json()
    stats = data["data"]["attributes"]["last_analysis_stats"]

    return {
        "source": "VirusTotal",
        "ip": ip_address,
        "malicious": stats.get("malicious", 0),
        "suspicious": stats.get("suspicious", 0),
        "harmless": stats.get("harmless", 0),
        "reputation": data["data"]["attributes"].get("reputation", 0),
        "raw": data
    }
