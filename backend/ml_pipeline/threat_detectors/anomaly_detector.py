def detect_anomaly(features: dict) -> bool:
    """
    Simple rule-based anomaly detection.
    Replace with IsolationForest later.
    """
    score = 0

    if features.get("abuse_confidence", 0) > 50:
        score += 1
    if features.get("malicious", 0) > 0:
        score += 1
    if len(features.get("vulns", [])) > 0:
        score += 1

    return score >= 2
