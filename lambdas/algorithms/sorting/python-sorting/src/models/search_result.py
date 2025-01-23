from dataclasses import dataclass
from dataclasses_json import dataclass_json

@dataclass_json
@dataclass
class SearchResult:
    timestamp: str
    timestampRaw: int
    array: str
    target: str
    algorithm: str
    language: str
    memorySize: str
    region: str
    iterations: int
    comparisons: int
    timeTaken: float
    cost: float
    executionStatus: str
    searchStatus: str
    foundIndex: int