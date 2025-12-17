from ml_pipelines.services.ingest_service import ingest_ip

def run_ip_ingestion(ip_list: list[str]):
    results = []
    for ip in ip_list:
        try:
            event = ingest_ip(ip)
            results.append(event.id)
        except Exception as e:
            print(f"[ERROR] {ip}: {e}")
    return results
