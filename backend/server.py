from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class SubscribeCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "letter_of_marque"


class Subscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    source: str = "letter_of_marque"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Devil on the Hudson — API alive."}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/subscribe")
async def subscribe(payload: SubscribeCreate):
    email_lower = payload.email.lower().strip()

    existing = await db.subscribers.find_one({"email": email_lower}, {"_id": 0})
    if existing:
        return {
            "ok": True,
            "already_subscribed": True,
            "message": "Your name is already inscribed in the ship's log.",
        }

    sub = Subscriber(email=email_lower, source=payload.source or "letter_of_marque")
    doc = sub.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.subscribers.insert_one(doc)

    return {
        "ok": True,
        "already_subscribed": False,
        "message": "Welcome aboard. The fleet sails at dawn.",
        "id": sub.id,
    }


@api_router.get("/subscribers/count")
async def subscriber_count():
    count = await db.subscribers.count_documents({})
    return {"count": count}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
