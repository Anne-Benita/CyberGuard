import os
import requests

SHODAN_API_KEY = os.getenv("SHODAN_API_KEY")
BASE_URL = "https://api.shodan.io"

def scan_ip(ip_address: str) -> dict:
    if not SHODAN_API_KEY:
        raise RuntimeError("Shodan API key not configured")

    url = f"{BASE_URL}/shodan/host/{ip_address}?key={SHODAN_API_KEY}"
    response = requests.get(url, timeout=15)

    if response.status_code == 404:
        return {"source": "Shodan", "ip": ip_address, "found": False}

    response.raise_for_status()
    data = response.json()

    return {
        "source": "Shodan",
        "ip": ip_address,
        "country": data.get("country_name"),
        "org": data.get("org"),
        "ports": data.get("ports", []),
        "vulns": list(data.get("vulns", [])),
        "raw": data
    }
