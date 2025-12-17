def predict_severity(features: dict) -> str:
    abuse = features.get("abuse_confidence", 0)
    malicious = features.get("malicious", 0)

    if malicious > 5 or abuse > 80:
        return "critical"
    if malicious > 0 or abuse > 40:
        return "high"
    if abuse > 10:
        return "medium"

    return "low"
