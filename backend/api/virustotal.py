import requests
from django.conf import settings
from .models import SecurityEvent

VT_API_KEY = "YOUR_API_KEY_HERE"

def fetch_vt_data(ip_or_domain):
    url = f"https://www.virustotal.com/api/v3/ip_addresses/{ip_or_domain}"
    
    headers = {
        "x-apikey": VT_API_KEY
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return None

    data = response.json()

    # Extract useful fields
    threat_name = data["data"]["attributes"]["last_analysis_results"]
    country = data["data"]["attributes"].get("country", "Unknown")

    # Severity logic (simple)
    total_malicious = data["data"]["attributes"]["last_analysis_stats"]["malicious"]
    severity = (
        "critical" if total_malicious > 5 else
        "high" if total_malicious > 3 else
        "medium" if total_malicious > 0 else
        "low"
    )

    SecurityEvent.objects.create(
        threat_name="VirusTotal Threat",
        severity_level=severity,
        geo_country=country,
        source_ip=ip_or_domain
    )

    return True
