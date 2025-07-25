import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_acheteur_purchase_and_list():
    # Simulate acheteur login and get token (assume acheteur user exists)
    login_resp = client.post(
        "/auth/token",
        data={"username": "acheteur@example.com", "password": "acheteur"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert login_resp.status_code == 200
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # List products (assume at least one exists)
    products_resp = client.get("/acheteur/products", headers=headers)
    assert products_resp.status_code == 200
    products = products_resp.json()
    if not products:
        pytest.skip("No products to purchase")
    product_id = products[0]["id"]

    # Make a purchase
    buy_resp = client.post(f"/acheteur/buy/{product_id}", headers=headers)
    assert buy_resp.status_code == 200
    purchase = buy_resp.json()
    assert purchase["product_id"] == product_id

    # Try to buy the same product again (should fail)
    buy_resp2 = client.post(f"/acheteur/buy/{product_id}", headers=headers)
    assert buy_resp2.status_code == 400
    assert "already purchased" in buy_resp2.json()["detail"]

    # List purchases (should only see own)
    purchases_resp = client.get("/acheteur/purchases", headers=headers)
    assert purchases_resp.status_code == 200
    purchases = purchases_resp.json()
    assert all(p["user_id"] == 3 for p in purchases)  # Only own purchases 