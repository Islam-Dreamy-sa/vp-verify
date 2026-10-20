import os
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
@app.get("/health")
def health():
    return {"ok": "python", "uid": os.getuid(), "dontwritebytecode": os.environ.get("PYTHONDONTWRITEBYTECODE")}
