# api/chart_data.py

# ===== BAR CHART – HIGH IMPACT THREATS =====
HIGH_IMPACT_DATA = [
    {"type": "SQL Injection", "count": 120},
    {"type": "Cross-Site Scripting (XSS)", "count": 95},
    {"type": "Phishing Attacks", "count": 140},
    {"type": "Malware Distribution", "count": 110},
    {"type": "Denial of Service (DoS)", "count": 80},
    {"type": "Privilege Escalation", "count": 70},
    {"type": "Brute Force Attacks", "count": 90},
    {"type": "Man-in-the-Middle (MITM)", "count": 60},
    {"type": "Data Exfiltration", "count": 105},
    {"type": "Zero-Day Exploits", "count": 85},
]

# ===== BAR CHART – VULNERABILITIES VS INCIDENTS =====
REVENUE_CHART_DATA = [
    {"month": "Jan", "vulnerabilities": 120, "incidents": 80},
    {"month": "Feb", "vulnerabilities": 140, "incidents": 95},
    {"month": "Mar", "vulnerabilities": 110, "incidents": 70},
    {"month": "Apr", "vulnerabilities": 160, "incidents": 100},
    {"month": "May", "vulnerabilities": 180, "incidents": 120},
    {"month": "Jun", "vulnerabilities": 150, "incidents": 90},
    {"month": "Jul", "vulnerabilities": 175, "incidents": 110},
    {"month": "Aug", "vulnerabilities": 160, "incidents": 95},
    {"month": "Sep", "vulnerabilities": 155, "incidents": 85},
    {"month": "Oct", "vulnerabilities": 165, "incidents": 100},
    {"month": "Nov", "vulnerabilities": 170, "incidents": 105},
    {"month": "Dec", "vulnerabilities": 180, "incidents": 115},
]

# ===== LINE CHART – HOURLY THREATS =====
HOURLY_THREATS_DATA = [
    {"hour": "00:00", "total": 100, "critical": 5},
    {"hour": "01:00", "total": 95, "critical": 3},
    {"hour": "02:00", "total": 98, "critical": 4},
    {"hour": "03:00", "total": 80, "critical": 2},
    {"hour": "04:00", "total": 75, "critical": 1},
    {"hour": "05:00", "total": 110, "critical": 6},
    {"hour": "06:00", "total": 180, "critical": 15},
    {"hour": "07:00", "total": 250, "critical": 25},
    {"hour": "08:00", "total": 450, "critical": 85},
    {"hour": "09:00", "total": 380, "critical": 55},
    {"hour": "10:00", "total": 310, "critical": 40},
    {"hour": "11:00", "total": 250, "critical": 30},
    {"hour": "12:00", "total": 220, "critical": 20},
    {"hour": "13:00", "total": 205, "critical": 18},
    {"hour": "14:00", "total": 215, "critical": 15},
    {"hour": "15:00", "total": 240, "critical": 22},
    {"hour": "16:00", "total": 290, "critical": 35},
    {"hour": "17:00", "total": 320, "critical": 45},
    {"hour": "18:00", "total": 280, "critical": 30},
    {"hour": "19:00", "total": 210, "critical": 18},
    {"hour": "20:00", "total": 170, "critical": 12},
    {"hour": "21:00", "total": 145, "critical": 9},
    {"hour": "22:00", "total": 120, "critical": 7},
    {"hour": "23:00", "total": 105, "critical": 5},
]

# ===== PIE CHART =====
THREAT_PIE_DATA = [
    {"type": "SQL Injection", "value": 40, "color": "#3b82f6"},
    {"type": "XSS", "value": 30, "color": "#8b5cf6"},
    {"type": "CSRF", "value": 15, "color": "#10b981"},
    {"type": "Other", "value": 15, "color": "#f59e0b"},
]
 
STATS_GRID = [
    {"title": "Total Vulnerabilities", "value": 1245, "change": "+8%", "trend": "up"},
    {"title": "Incidents Reported", "value": 312, "change": "-5%", "trend": "down"},
    {"title": "Active Users", "value": 856, "change": "+12%", "trend": "up"},
    {"title": "Systems Secured", "value": 47, "change": "+3%", "trend": "up"},
]

# -------------------------
# Map Data
# -------------------------
MAP_DATA = [
    {"CVE_ID": "CVE-2025-1123", "Geo_Country": "USA", "Threat_Name": "SQL Injection Attack",
     "Latitude": 37.7749, "Longitude": -122.4194, "Severity_Level": "High"},
    {"CVE_ID": "CVE-2025-2244", "Geo_Country": "China", "Threat_Name": "Brute Force Attack",
     "Latitude": 39.9042, "Longitude": 116.4074, "Severity_Level": "Critical"},
    {"CVE_ID": "CVE-2025-3345", "Geo_Country": "Germany", "Threat_Name": "Phishing Attempt",
     "Latitude": 52.5200, "Longitude": 13.4050, "Severity_Level": "Medium"},
    {"CVE_ID": "CVE-2025-4456", "Geo_Country": "Brazil", "Threat_Name": "Trojan Injection",
     "Latitude": -23.5505, "Longitude": -46.6333, "Severity_Level": "Low"},
    {"CVE_ID": "CVE-2025-5567", "Geo_Country": "India", "Threat_Name": "Malware Download Attempt",
     "Latitude": 28.6139, "Longitude": 77.2090, "Severity_Level": "High"},
]
# -------------------------
# Table Data – Cyber Threats
# -------------------------
CYBER_THREAT_TABLE = [
    {
        "CVE_ID": "CVE-2025-1123",
        "Geo_Country": "USA",
        "Threat_Name": "SQL Injection Attack",
        "Timestamp": "2025-10-10 09:25:45",
        "Severity_Level": "High",
        "Source_IP": "192.168.1.101",
        "Destination_IP": "10.0.0.45",
        "Action_Taken": "Blocked",
        "Protocol": "HTTP",
        "Target_Port": 443,
        "Malware_Family": "None",
    },
    {
        "CVE_ID": "CVE-2025-2244",
        "Geo_Country": "China",
        "Threat_Name": "Brute Force Attack",
        "Timestamp": "2025-10-10 08:50:12",
        "Severity_Level": "Critical",
        "Source_IP": "172.16.0.55",
        "Destination_IP": "10.0.0.20",
        "Action_Taken": "Isolated",
        "Protocol": "SSH",
        "Target_Port": 22,
        "Malware_Family": "Hydra",
    },
    {
        "CVE_ID": "CVE-2025-3345",
        "Geo_Country": "Germany",
        "Threat_Name": "Phishing Attempt",
        "Timestamp": "2025-10-10 08:30:00",
        "Severity_Level": "Medium",
        "Source_IP": "203.0.113.10",
        "Destination_IP": "10.0.0.30",
        "Action_Taken": "Alerted",
        "Protocol": "SMTP",
        "Target_Port": 25,
        "Malware_Family": "Emotet",
    },
    {
        "CVE_ID": "CVE-2025-4456",
        "Geo_Country": "Brazil",
        "Threat_Name": "Trojan Injection",
        "Timestamp": "2025-10-10 08:15:00",
        "Severity_Level": "Low",
        "Source_IP": "192.0.2.5",
        "Destination_IP": "10.0.0.60",
        "Action_Taken": "Monitored",
        "Protocol": "TCP",
        "Target_Port": 8080,
        "Malware_Family": "AgentTesla",
    },
    {
        "CVE_ID": "CVE-2025-5567",
        "Geo_Country": "India",
        "Threat_Name": "Malware Download Attempt",
        "Timestamp": "2025-10-10 07:45:00",
        "Severity_Level": "High",
        "Source_IP": "198.51.100.33",
        "Destination_IP": "10.0.0.70",
        "Action_Taken": "Quarantined",
        "Protocol": "HTTPS",
        "Target_Port": 443,
        "Malware_Family": "TrickBot",
    },
]
