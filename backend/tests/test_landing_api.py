"""Backend API tests for Devil on the Hudson landing page."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://devil-on-hudson.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def unique_email():
    return f"TEST_sailor_{uuid.uuid4().hex[:8]}@example.com"


# ---------------- Root ----------------
class TestRoot:
    def test_root_returns_welcome(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Devil on the Hudson" in data["message"]


# ---------------- Subscribe ----------------
class TestSubscribe:
    def test_subscribe_valid_email(self, session, unique_email):
        r = session.post(f"{API}/subscribe", json={"email": unique_email})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True
        assert data["already_subscribed"] is False
        assert "id" in data
        assert "_id" not in data

    def test_subscribe_duplicate_email(self, session, unique_email):
        # First call already done above; call again
        r = session.post(f"{API}/subscribe", json={"email": unique_email})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["ok"] is True
        assert data["already_subscribed"] is True
        assert "_id" not in data

    def test_subscribe_case_insensitive_duplicate(self, session, unique_email):
        r = session.post(f"{API}/subscribe", json={"email": unique_email.upper()})
        assert r.status_code == 200
        assert r.json()["already_subscribed"] is True

    def test_subscribe_invalid_email(self, session):
        r = session.post(f"{API}/subscribe", json={"email": "not-an-email"})
        assert r.status_code == 422

    def test_subscribe_missing_email(self, session):
        r = session.post(f"{API}/subscribe", json={})
        assert r.status_code == 422

    def test_subscribe_with_source(self, session):
        email = f"TEST_source_{uuid.uuid4().hex[:8]}@example.com"
        r = session.post(f"{API}/subscribe", json={"email": email, "source": "hero_cta"})
        assert r.status_code == 200
        assert r.json()["already_subscribed"] is False


# ---------------- Count ----------------
class TestSubscriberCount:
    def test_count_returns_int(self, session, unique_email):
        # Ensure at least one subscriber exists
        session.post(f"{API}/subscribe", json={"email": unique_email})
        r = session.get(f"{API}/subscribers/count")
        assert r.status_code == 200
        data = r.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        assert data["count"] >= 1
