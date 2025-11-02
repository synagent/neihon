from datetime import datetime, timezone
from uuid import uuid4

from httpx import AsyncClient


async def test_task_crud_flow(client: AsyncClient) -> None:
    user_id = uuid4()
    create_payload = {
        "user_id": str(user_id),
        "title": "Morning workout",
        "note": "30 minutes of cardio",
        "energy": "high",
        "duration_minutes": 45,
        "due_at": datetime(2024, 1, 1, 7, 0, tzinfo=timezone.utc).isoformat(),
        "priority": "high",
        "context": "wellness",
        "status": "pending",
    }

    create_response = await client.post("/tasks/", json=create_payload)
    assert create_response.status_code == 201
    created_task = create_response.json()

    task_id = created_task["id"]
    assert created_task["title"] == create_payload["title"]

    list_response = await client.get("/tasks/", params={"user_id": str(user_id)})
    assert list_response.status_code == 200
    tasks = list_response.json()
    assert len(tasks) == 1
    assert tasks[0]["id"] == task_id

    update_response = await client.put(
        f"/tasks/{task_id}",
        json={"status": "completed", "title": "Completed workout"},
    )
    assert update_response.status_code == 200
    updated = update_response.json()
    assert updated["status"] == "completed"
    assert updated["title"] == "Completed workout"

    get_response = await client.get(f"/tasks/{task_id}")
    assert get_response.status_code == 200
    fetched = get_response.json()
    assert fetched["id"] == task_id

    delete_response = await client.delete(f"/tasks/{task_id}")
    assert delete_response.status_code == 204

    missing_response = await client.get(f"/tasks/{task_id}")
    assert missing_response.status_code == 404
