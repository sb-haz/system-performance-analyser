from dataclasses import dataclass
from dataclasses_json import dataclass_json

@dataclass_json
@dataclass
class SearchRequest:
    array: str
    target: str
    algorithm: str
    language: str
    memorySize: str
    region: str