import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_product_price_validation():
    # Simulate vendeur login and get token (assume vendeur user exists)
    login_resp = client.post(
        "/auth/token",
        data={"username": "vendeur@example.com", "password": "vendeur"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert login_resp.status_code == 200
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Try to create a product with invalid price
    resp = client.post(
        "/vendeur/products",
        json={"name": "Invalid Product", "price": -10, "vendeur_id": 2},
        headers=headers
    )
    assert resp.status_code == 422  # Unprocessable Entity due to price validation

    # Create a valid product
    resp = client.post(
        "/vendeur/products",
        json={"name": "Valid Product", "price": 20, "vendeur_id": 2},
        headers=headers
    )
    assert resp.status_code == 200
    product_id = resp.json()["id"]

    # Simulate another vendeur
    login_resp2 = client.post(
        "/auth/token",
        data={"username": "vendeur2@example.com", "password": "vendeur2"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert login_resp2.status_code == 200
    token2 = login_resp2.json()["access_token"]
    headers2 = {"Authorization": f"Bearer {token2}"}

    # Try to update/delete the product as another vendeur
    resp_update = client.put(
        f"/vendeur/products/{product_id}",
        json={"name": "Hacked Product", "price": 30, "vendeur_id": 99},
        headers=headers2
    )
    assert resp_update.status_code == 403
    assert "another vendeur" in resp_update.json()["detail"]

    resp_delete = client.delete(f"/vendeur/products/{product_id}", headers=headers2)
    assert resp_delete.status_code == 403
    assert "another vendeur" in resp_delete.json()["detail"] 