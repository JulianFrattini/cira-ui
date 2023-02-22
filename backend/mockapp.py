import json
from os import listdir
from os.path import join

import uvicorn
from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# setup app
app = FastAPI(
    title="Causality in Requirements Artifacts - Mock Pipeline",
    version='v0.m'
)

# add CORS middleware allowing all requests from the same localhost
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex='http://localhost:.*',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# setup request objects
class SentenceRequest(BaseModel):
    sentence: str
    language: str = "en"
    labels: list[dict] = []
    graph: dict = None


class ClassificationResponse(BaseModel):
    causal: bool
    confidence: float


class LabelingResponse(BaseModel):
    labels: list[dict]


class GraphResponse(BaseModel):
    graph: dict


class TestsuiteResponse(BaseModel):
    suite: dict

# load mock sentences
sentences = {}
mock_sentence_location = '../static/sentences/'
for filename in listdir(mock_sentence_location):
    with open(join(mock_sentence_location, filename)) as file:
        sentence = json.load(file)
        sentences[sentence['sentence']] = sentence

PREFIX = "/api"

@app.get(PREFIX + "/")
def root(req: Request):
    url_list = [
        {"path": route.path, "name": route.name} for route in req.app.routes
    ]
    return url_list


@app.get(PREFIX + "/health")
def health():
    return {
        "status": "up",
        "cira-version": 'v0.m'
    }


@app.put(PREFIX + '/classify', response_model=ClassificationResponse, tags=['classify'])
async def create_classification(req: SentenceRequest):
    if req.sentence in sentences:
        return ClassificationResponse(causal=True, confidence=0.98)
    return ClassificationResponse(causal=False, confidence=0.5)


@app.put(PREFIX + '/label', response_model=LabelingResponse, tags=['label'])
async def create_labels(req: SentenceRequest):
    if req.sentence in sentences:
        return LabelingResponse(labels=sentences[req.sentence]['labels'])
    return LabelingResponse(labels=[])


@app.put(PREFIX + '/graph', response_model=GraphResponse, tags=['graph'])
async def create_graph(req: SentenceRequest):
    if req.sentence in sentences:
        return GraphResponse(graph=sentences[req.sentence]['graph'])
    return GraphResponse(graph={})


@app.put(PREFIX + '/testsuite', response_model=TestsuiteResponse, tags=['testsuite'])
async def create_testsuite(req: SentenceRequest):
    if req.sentence in sentences:
        return TestsuiteResponse(suite=sentences[req.sentence]['testsuite'])
    return TestsuiteResponse(suite={})


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0')
